import * as vscode from "vscode";

export const formatFile = async (pathToFile: string) => {
  try {
    const uri = vscode.Uri.file(pathToFile);

    await vscode.commands.executeCommand("editor.action.formatDocument", uri);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
