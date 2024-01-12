import * as vscode from "vscode";
import ExtensionConfig from "../../types/config.interface";

export default function getConfigurationProperty<
  T extends keyof ExtensionConfig
>(property: T): ExtensionConfig[T] {
  return vscode.workspace
    .getConfiguration()
    .get(property) as ExtensionConfig[T];
}
