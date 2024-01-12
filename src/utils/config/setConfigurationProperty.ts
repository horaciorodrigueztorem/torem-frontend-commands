import * as vscode from "vscode";
import ExtensionConfig from "../../types/config.interface";

export default function setConfigurationProperty<
  T extends keyof ExtensionConfig
>(property: T, value: ExtensionConfig[T]) {
  return vscode.workspace.getConfiguration().update(property, value, true);
}
