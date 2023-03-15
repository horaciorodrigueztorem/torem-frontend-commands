import * as vscode from "vscode";

export const getTranslationText = async (): Promise<string> => {
  try {
    const text = await vscode.window.showInputBox({
      placeHolder: "Insert Translation Text:",
      prompt: "Insert Translation Text:",
    });

    if (text === undefined) {
      return Promise.reject("text: aborted");
    }

    return Promise.resolve(text);
  } catch (error) {
    return Promise.reject(error);
  }
};
