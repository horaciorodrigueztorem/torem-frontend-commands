import * as vscode from "vscode";
import { handleNewTranslation } from "./commands/newTranslation/newTranslation";
import { showErrorTextNotification } from "./utils/showErrorTextNotification";
import { showTextNotification } from "./utils/showTextNotification";
import { handleAddNewToremApp } from "./commands/addNewApp/addNewToremApp";
import removeApp from "./commands/removeApp/removeApp";

export function activate(context: vscode.ExtensionContext) {
  const newTranslation = vscode.commands.registerCommand(
    "torem-frontend-commands.newTranslation",
    () =>
      handleNewTranslation()
        .then(showTextNotification)
        .catch((e) => showErrorTextNotification(e.message))
  );

  const newApplication = vscode.commands.registerCommand(
    "torem-frontend-commands.newApplication",
    () =>
      handleAddNewToremApp()
        .then(showTextNotification)
        .catch((e) => showErrorTextNotification(e.message))
  );

  const removeApplication = vscode.commands.registerCommand(
    "torem-frontend-commands.removeApplication",
    () =>
      removeApp()
        .then(showTextNotification)
        .catch((e) => showErrorTextNotification(e.message))
  );

  context.subscriptions.push(newTranslation, newApplication, removeApplication);
}

// This method is called when your extension is deactivated
export function deactivate() {}
