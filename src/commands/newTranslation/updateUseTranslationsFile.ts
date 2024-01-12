import * as vscode from "vscode";
import { parse } from "acorn";
import escodegen from "escodegen";
import { convertToCamelCase } from "../../utils/constantCaseToCamelCase";
import { readFile } from "../../utils/fs/readFile";
import { TextEncoder } from "util";
import {
  DISABLE_ESLINT_RULE_LINE,
  DISABLE_FORMAT_COMMENT,
} from "../../constants";
import { getFileUri } from "../../utils/fs/getFileUri";

export const updateUseTranslationsHook = async (
  selectedGroup: string,
  translationName: string,
  pathToFile: string
) => {
  try {
    const file = await readFile(pathToFile);
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

    ast.body[0].leadingComments = [
      DISABLE_ESLINT_RULE_LINE,
      DISABLE_FORMAT_COMMENT,
    ];

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

    const hookFile = getFileUri(pathToFile);

    await vscode.workspace.fs.writeFile(
      hookFile,
      new TextEncoder().encode(modifiedCode)
    );

    return Promise.resolve(pathToFile);
  } catch (error) {
    return Promise.reject(error);
  }
};
