import * as vscode from "vscode";

export default function validateIfFileExists(path: string) {
  return new Promise((resolve) => {
    vscode.workspace.fs.stat(vscode.Uri.file(path)).then(
      () => resolve(true),
      () => resolve(false)
    );
  });
}
