import * as vscode from "vscode";
import validateIfFileExists from "../../utils/fs/validateIfFileExists";

export default async function getNewAppUseTranslationsPath() {
  try {
    const useTranslationsPath = await vscode.window.showInputBox({
      title: "Enter the path of the useTranslations file of the new app",
      placeHolder: "Example: /apps/mobile/src/hooks/useTranslations.ts",
    });

    if (useTranslationsPath === undefined) {
      return Promise.reject("useTranslationsPath: aborted");
    }

    if (useTranslationsPath.trim().length === 0) {
      return Promise.reject("useTranslationsPath: empty");
    }

    return Promise.resolve(useTranslationsPath);
  } catch (error) {
    return Promise.reject(error);
  }
}
