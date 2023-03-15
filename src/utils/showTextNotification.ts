import * as vscode from "vscode";

export const showTextNotification = (text: string) => {
  vscode.window.showInformationMessage(text);
};
