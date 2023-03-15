import * as vscode from "vscode";
import { parse } from "acorn";
import escodegen from "escodegen";
import { convertToCamelCase } from "../../utils/constantCaseToCamelCase";
import { readFile } from "../../utils/readFile";
import { TextEncoder } from "util";

const PATH_TO_HOOK = "src/hooks/useTranslations.ts";
const DISABLE_ESLINT_RULE_LINE = {
  type: "ExpressionStatement",
  value: " eslint-disable import/newline-after-import ",
};

export const updateUseTranslationsHook = async (
  selectedGroup: string,
  translationName: string
) => {
  try {
    const file = await readFile(PATH_TO_HOOK);
    const ast = parse(file, {
      sourceType: "module",
      ecmaVersion: "latest",
    }) as any;

    console.log(ast);

    const adaptedGroup = convertToCamelCase(selectedGroup);
    const adaptedTranslationName = convertToCamelCase(translationName);
    console.log(adaptedGroup);
    const groupIndex =
      ast.body[1].declaration.declarations[0].init.body.properties.findIndex(
        (property: any) =>
          property.key.type === "Identifier" &&
          property.key.name === adaptedGroup
      );

    console.log(groupIndex);

    if (groupIndex === -1) {
      const newGroup = {
        kind: "init",
        type: "Property",
        key: {
          type: "Identifier",
          name: adaptedGroup,
        },
        value: {
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              kind: "init",
              key: { type: "Identifier", name: adaptedTranslationName },
              value: {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "useTranslate",
                },
                arguments: [
                  {
                    type: "Literal",
                    value: `${selectedGroup}.${translationName}`,
                  },
                ],
              },
            },
          ],
        },
      };

      ast.body[1].declaration.declarations[0].init.body.properties.push(
        newGroup
      );
    }

    if (groupIndex !== -1) {
      const translationIndex =
        ast.body[1].declaration.declarations[0].init.body.properties[
          groupIndex
        ].value.properties.findIndex(
          (property: any) =>
            property.value.arguments[0].value.split(".")[1] === translationName
        );

      if (translationIndex === -1) {
        const newTranslation = {
          type: "Property",
          kind: "init",
          key: {
            type: "Identifier",
            name: adaptedTranslationName,
          },
          value: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "useTranslate",
            },
            arguments: [
              {
                type: "Literal",
                value: `${selectedGroup}.${translationName}`,
              },
            ],
          },
        };

        ast.body[1].declaration.declarations[0].init.body.properties[
          groupIndex
        ].value.properties.push(newTranslation);
      }
    }

    ast.body[0].leadingComments = [DISABLE_ESLINT_RULE_LINE];

    const modifiedCode = escodegen.generate(ast, {
      format: {
        escapeless: true,
        preserveBlankLines: true,
        indent: {
          style: "  ",
          adjustMultilineComment: true,
        },
      },
      comment: true,
    });

    const result = await vscode.workspace.findFiles(PATH_TO_HOOK);
    const hookFile = result[0];

    await vscode.workspace.fs.writeFile(
      hookFile,
      new TextEncoder().encode(modifiedCode)
    );

    return Promise.resolve(PATH_TO_HOOK);
  } catch (error) {
    return Promise.reject(error);
  }
};
