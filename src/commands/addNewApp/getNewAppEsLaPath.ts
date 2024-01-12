import * as vscode from "vscode";
import validateIfFileExists from "../../utils/fs/validateIfFileExists";

export default async function getNewAppEsLaPath() {
  try {
    const newAppEsLaPath = await vscode.window.showInputBox({
      title: "Enter the path of the es-LA file of the new app",
      placeHolder: "Example: /apps/mobile/src/intl/lang/es-LA.ts",
    });

    if (newAppEsLaPath === undefined) {
      return Promise.reject("newAppEsLaPath: aborted");
    }

    if (newAppEsLaPath.trim().length === 0) {
      return Promise.reject("newAppEsLaPath: empty");
    }

    return Promise.resolve(newAppEsLaPath);
  } catch (error) {
    return Promise.reject(error);
  }
}
