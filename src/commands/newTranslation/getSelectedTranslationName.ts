import * as vscode from "vscode";
import getASTbody from "../shared/getASTbody";

const NEW_OPTION_TEXT = "Add a New Translation";
const TRANSLATION_NAME_PLACEHOLDER = "Insert the new translation name:";

export const getSelectedTranslationName = async (
  ast: any,
  group: string
): Promise<string> => {
  try {
    const body = getASTbody(ast);

    const groupIndex = body.init.properties.findIndex(
      (property: any) =>
        property.key.type === "Identifier" && property.key.name === group
    );

    let translationName;

    if (groupIndex === -1) {
      const newTranslationName = await vscode.window.showInputBox({
        placeHolder: TRANSLATION_NAME_PLACEHOLDER,
        prompt: TRANSLATION_NAME_PLACEHOLDER,
      });

      translationName = newTranslationName;
    }

    if (groupIndex !== -1) {
      const translations = body.init.properties[
        groupIndex
      ].value.properties.map((property: any) => property.key.name);

      const selectedTranslation = await vscode.window.showQuickPick(
        [NEW_OPTION_TEXT, ...translations],
        {
          placeHolder: TRANSLATION_NAME_PLACEHOLDER,
          title: TRANSLATION_NAME_PLACEHOLDER,
        }
      );

      if (selectedTranslation === NEW_OPTION_TEXT) {
        const newTranslationName = await vscode.window.showInputBox({
          placeHolder: TRANSLATION_NAME_PLACEHOLDER,
          prompt: TRANSLATION_NAME_PLACEHOLDER,
        });

        translationName = newTranslationName;
      } else {
        translationName = selectedTranslation;
      }
    }

    if (translationName === undefined) {
      return Promise.reject("name: aborted");
    }

    return Promise.resolve(translationName);
  } catch (error) {
    return Promise.reject(error);
  }
};
