export interface AppConfig {
  esLaPath: string;

  useTranslationsPath: string;
}

export default interface ExtensionConfig {
  apps: string[];

  appsConfig: {
    [key: string]: AppConfig;
  };
}

/**
 * Enums
 */

export enum ConfigProperty {
  apps = "apps",

  appsConfig = "appsConfig",
}
