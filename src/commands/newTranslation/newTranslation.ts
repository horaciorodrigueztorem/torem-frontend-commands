import { parse } from "acorn";
import { readFile } from "../../utils/fs/readFile";
import { formatFile } from "../../utils/fs/FormatFile";
import { getSelectedGroup } from "./getSelectedGroup";
import { getSelectedTranslationName } from "./getSelectedTranslationName";
import { getTranslationText } from "./getTranslationText";
import { updateEsLaFile } from "./updateEsLaFile";
import { updateUseTranslationsHook } from "./updateUseTranslationsFile";
import { saveAll } from "../../utils/fs/saveAll";
import * as vscode from "vscode";
import selectAppName from "../shared/selectAppName";
import getConfigurationProperty from "../../utils/config/getConfigurationProperty";
import { ConfigProperty } from "../../types/config.interface";

export const handleNewTranslation = async () => {
  try {
    const application = await selectAppName();

    const appsConfig = getConfigurationProperty(ConfigProperty.appsConfig);

    const config = appsConfig[application];

    console.log(config);

    const file = await readFile(config.esLaPath);

    const esLaAST = parse(file, {
      sourceType: "module",
      ecmaVersion: "latest",
    });

    console.log(esLaAST);

    const selectedGroup = await getSelectedGroup(esLaAST);
    const name = await getSelectedTranslationName(esLaAST, selectedGroup);
    const text = await getTranslationText();

    await updateEsLaFile(esLaAST, selectedGroup, name, text, config.esLaPath);

    await updateUseTranslationsHook(
      selectedGroup,
      name,
      config.useTranslationsPath
    );

    return Promise.resolve("Files were succesfully updated");
  } catch (error) {
    return Promise.reject(error);
  }
};
