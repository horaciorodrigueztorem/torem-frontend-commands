import * as vscode from "vscode";

import getAppName from "./getAppName";
import getNewAppEsLaPath from "./getNewAppEsLaPath";
import getNewAppUseTranslationsPath from "./getNewAppUseTranslationsPath";
import getConfigurationProperty from "../../utils/config/getConfigurationProperty";
import { ConfigProperty } from "../../types/config.interface";
import setConfigurationProperty from "../../utils/config/setConfigurationProperty";

export async function handleAddNewToremApp() {
  try {
    const newAppName = await getAppName();
    const esLaPath = await getNewAppEsLaPath();
    const useTranslationsPath = await getNewAppUseTranslationsPath();

    const apps = getConfigurationProperty(ConfigProperty.apps);

    const newApps = [...apps, newAppName];

    console.log(newApps);

    setConfigurationProperty(ConfigProperty.apps, newApps);

    const appsConfig = getConfigurationProperty(ConfigProperty.appsConfig);

    const newAppsConfig = {
      ...appsConfig,
      [newAppName]: {
        esLaPath,
        useTranslationsPath,
      },
    };

    setConfigurationProperty(ConfigProperty.appsConfig, newAppsConfig);

    return Promise.resolve("App added successfully");
  } catch (error) {
    return Promise.reject(error);
  }
}
