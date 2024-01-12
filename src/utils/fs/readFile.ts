import * as vscode from "vscode";

export const readFile = async (pathToFile: string) => {
  try {
    const result = await vscode.workspace.findFiles(pathToFile);
    const esLAFile = result[0];

    const file = await vscode.workspace.fs.readFile(esLAFile);
    const buffer = Buffer.from(file);

    return Promise.resolve(buffer.toString());
  } catch (error: any) {
    return Promise.reject(error);
  }
};
