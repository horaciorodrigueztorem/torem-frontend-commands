import * as vscode from "vscode";

export const saveAll = async (): Promise<void> => {
  try {
    await vscode.workspace.saveAll();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
