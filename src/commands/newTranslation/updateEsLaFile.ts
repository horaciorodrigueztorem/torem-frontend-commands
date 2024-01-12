import * as vscode from "vscode";
import escodegen from "escodegen";
import { TextEncoder } from "util";
import getASTbody from "../shared/getASTbody";
import {
  DISABLE_ESLINT_RULE_LINE,
  DISABLE_FORMAT_COMMENT,
} from "../../constants";
import { getFileUri } from "../../utils/fs/getFileUri";

export const updateEsLaFile = async (
  ast: any,
  selectedGroup: string,
  translationName: string,
  translationText: string,
  pathToFile: string
) => {
  try {
    const body = getASTbody(ast);

    const groupIndex = body.init.properties.findIndex(
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

      body.init.properties.push(newGroup);
    }

    if (groupIndex !== -1) {
      const translationNameIndex = body.init.properties[
        groupIndex
      ].value.properties.findIndex(
        (property: any) =>
          property.key.type === "Identifier" &&
          property.key.name === translationName
      );

      if (translationNameIndex !== -1) {
        body.init.properties[groupIndex].value.properties[
          translationNameIndex
        ].value.value = translationText;
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

        body.init.properties[groupIndex].value.properties.push(newValue);
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

    const esLAFile = getFileUri(pathToFile);

    await vscode.workspace.fs.writeFile(
      esLAFile,
      new TextEncoder().encode(modifiedCode)
    );

    return Promise.resolve(pathToFile);
  } catch (error) {
    return Promise.reject(error);
  }
};
