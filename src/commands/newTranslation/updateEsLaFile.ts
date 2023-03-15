import * as vscode from "vscode";
import escodegen from "escodegen";
import { TextEncoder } from "util";

const PATH_TO_ES_LA = "src/i18n/lang/es-LA.ts";
const DISABLE_ESLINT_RULE_LINE = {
  type: "ExpressionStatement",
  value: " eslint-disable import/newline-after-import ",
};

export const updateEsLaFile = async (
  ast: any,
  selectedGroup: string,
  translationName: string,
  translationText: string
) => {
  try {
    const groupIndex =
      ast.body[2].declaration.declarations[0].init.properties.findIndex(
        (property: any) =>
          property.key.type === "Identifier" &&
          property.key.name === selectedGroup
      );

    if (groupIndex === -1) {
      const newGroup = {
        type: "Property",
        kink: "init",
        key: {
          type: "Identifier",
          name: selectedGroup,
        },
        value: {
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              kind: "init",
              key: {
                type: "Identifier",
                name: translationName,
              },
              value: {
                type: "Literal",
                value: translationText,
                raw: translationText,
              },
            },
          ],
        },
      };

      ast.body[2].declaration.declarations[0].init.properties.push(newGroup);
    }

    if (groupIndex !== -1) {
      const translationNameIndex =
        ast.body[2].declaration.declarations[0].init.properties[
          groupIndex
        ].value.properties.findIndex(
          (property: any) =>
            property.key.type === "Identifier" &&
            property.key.name === translationName
        );

      if (translationNameIndex !== -1) {
        ast.body[2].declaration.declarations[0].init.properties[
          groupIndex
        ].value.properties[translationNameIndex].value.value = translationText;
      } else {
        const newValue = {
          type: "Property",
          kind: "init",
          key: {
            type: "Identifier",
            name: translationName,
          },
          value: {
            type: "Literal",
            value: translationText,
            raw: translationText,
          },
        };

        ast.body[2].declaration.declarations[0].init.properties[
          groupIndex
        ].value.properties.push(newValue);
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

    const result = await vscode.workspace.findFiles(PATH_TO_ES_LA);
    const esLAFile = result[0];

    await vscode.workspace.fs.writeFile(
      esLAFile,
      new TextEncoder().encode(modifiedCode)
    );

    return Promise.resolve(PATH_TO_ES_LA);
  } catch (error) {
    return Promise.reject(error);
  }
};
