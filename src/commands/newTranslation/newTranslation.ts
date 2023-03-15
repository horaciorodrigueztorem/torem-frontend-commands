import { parse } from "acorn";
import { readFile } from "../../utils/readFile";
import { formatFile } from "../../utils/FormatFile";
import { getSelectedGroup } from "./getSelectedGroup";
import { getSelectedTranslationName } from "./getSelectedTranslationName";
import { getTranslationText } from "./getTranslationText";
import { updateEsLaFile } from "./updateEsLaFile";
import { updateUseTranslationsHook } from "./updateUseTranslationsFile";
import { saveAll } from "../../utils/saveAll";

const PATH_TO_ES_LA = "src/i18n/lang/es-LA.ts";

export const handleNewTranslation = async () => {
  try {
    const file = await readFile(PATH_TO_ES_LA);

    const esLaAST = parse(file, {
      sourceType: "module",
      ecmaVersion: "latest",
    }) as any;

    const selectedGroup = await getSelectedGroup(esLaAST);
    const name = await getSelectedTranslationName(esLaAST, selectedGroup);
    const text = await getTranslationText();

    await updateEsLaFile(esLaAST, selectedGroup, name, text).then(formatFile);
    await updateUseTranslationsHook(selectedGroup, name).then(formatFile);

    await saveAll();

    return Promise.resolve("Files were succesfully updated");
  } catch (error) {
    return Promise.reject(error);
  }
};
