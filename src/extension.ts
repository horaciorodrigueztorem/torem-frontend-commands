import * as vscode from "vscode";
import { handleNewTranslation } from "./commands/newTranslation/newTranslation";
import { showErrorTextNotification } from "./utils/showErrorTextNotification";
import { showTextNotification } from "./utils/showTextNotification";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "torem-frontend-commands.newTranslation",
    () =>
      handleNewTranslation()
        .then(showTextNotification)
        .catch((e) => showErrorTextNotification(e.message))
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
