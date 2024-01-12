import * as vscode from "vscode";
import { APPLICATION_NAME_REGEX } from "../../constants/application.constants";

export default async function getAppName(): Promise<string> {
  try {
    const name = await vscode.window.showInputBox({
      title: "Enter the name of the new app",
      placeHolder: "Example: mobile",
      validateInput(value: string) {
        if (!APPLICATION_NAME_REGEX.test(value)) {
          return "Only alphanumeric characters are allowed";
        }

        return null;
      },
    });

    if (name === undefined) {
      return Promise.reject("name: aborted");
    } else if (name === "") {
      return Promise.reject("name: empty");
    } else {
      return Promise.resolve(name);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
