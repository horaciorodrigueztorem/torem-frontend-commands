import { ConfigProperty } from "../../types/config.interface";
import getConfigurationProperty from "../../utils/config/getConfigurationProperty";
import setConfigurationProperty from "../../utils/config/setConfigurationProperty";
import selectAppName from "../shared/selectAppName";

export default async function removeApp() {
  try {
    const selectedApp = await selectAppName();

    const apps = getConfigurationProperty(ConfigProperty.apps);

    const newApps = apps.filter((app) => app !== selectedApp);

    setConfigurationProperty(ConfigProperty.apps, newApps);

    const appsConfig = getConfigurationProperty(ConfigProperty.appsConfig);

    delete appsConfig[selectedApp];

    setConfigurationProperty(ConfigProperty.appsConfig, appsConfig);

    return Promise.resolve("App removed successfully");
  } catch (error) {
    return Promise.reject(error);
  }
}
