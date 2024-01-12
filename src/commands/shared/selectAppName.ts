import * as vscode from "vscode";
import { ConfigProperty } from "../../types/config.interface";
import getConfigurationProperty from "../../utils/config/getConfigurationProperty";

export default async function selectAppName() {
  const apps = getConfigurationProperty(ConfigProperty.apps);

  const selectedAppName = await vscode.window.showQuickPick(apps);

  if (!selectedAppName) {
    return Promise.reject("No app selected");
  }

  return Promise.resolve(selectedAppName);
}
