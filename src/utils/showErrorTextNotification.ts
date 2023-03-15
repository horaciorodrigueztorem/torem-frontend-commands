import * as vscode from "vscode";

export const showErrorTextNotification = (text: string) => {
  vscode.window.showErrorMessage(text);
};
