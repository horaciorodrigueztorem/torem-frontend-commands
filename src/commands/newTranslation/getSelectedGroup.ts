import * as vscode from "vscode";

const NEW_OPTION_TEXT = "Add a New Group";
const GROUP_PLACEHOLDER = "Insert the new translations group name:";

export const getSelectedGroup = async (ast: any): Promise<string> => {
  try {
    const groups = ast.body[2].declaration.declarations[0].init.properties.map(
      (property: any) => property.key.name
    );

    let group;

    const selectedGroup = await vscode.window.showQuickPick(
      [NEW_OPTION_TEXT, ...groups],
      {
        placeHolder: GROUP_PLACEHOLDER,
        title: GROUP_PLACEHOLDER,
      }
    );

    if (selectedGroup === NEW_OPTION_TEXT) {
      const newGroup = await vscode.window.showInputBox({
        placeHolder: GROUP_PLACEHOLDER,
        prompt: GROUP_PLACEHOLDER,
      });

      group = newGroup;
    } else {
      group = selectedGroup;
    }

    console.log(group);

    if (group === undefined) {
      return Promise.reject("group: aborted");
    }

    return Promise.resolve(group);
  } catch (error) {
    return Promise.reject(error);
  }
};
