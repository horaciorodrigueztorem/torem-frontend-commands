import * as vscode from "vscode";
export const getFileUri = (relativePathToFile: string): vscode.Uri => {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    throw new Error("No workspace folder found");
  }
  const absolutePathToFile = vscode.Uri.joinPath(
    workspaceFolder.uri,
    relativePathToFile
  );
  return absolutePathToFile;
};
