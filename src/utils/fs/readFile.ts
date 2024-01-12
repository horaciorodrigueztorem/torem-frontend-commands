import * as path from "path";
import * as vscode from "vscode";
import { getFileUri } from "./getFileUri";

export const readFile = async (relativePathToFile: string) => {
  try {
    const uri = getFileUri(relativePathToFile);

    const file = await vscode.workspace.fs.readFile(uri);

    const buffer = Buffer.from(file);

    return Promise.resolve(buffer.toString());
  } catch (error: any) {
    return Promise.reject(error);
  }
};
