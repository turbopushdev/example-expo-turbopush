import { ExpoConfig } from "expo/config";
import {buildDiskCacheProvider} from 'expo-build-disk-cache'

import * as pkg from "./package.json";

const config: ExpoConfig = {
  slug: "turbopush-expo-demo",
  owner: "turbopush-expo-demo",
  android: {
    package: "com.turbopush.expodemo",
    versionCode: 1,
    version: pkg.version,
  },
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
    buildCacheProvider: buildDiskCacheProvider({
      cacheDir: 'node_modules/.expo-build-disk-cache',
      cacheGcTimeDays: 14,
    }),
  },
  ios: {
    buildNumber: "1",
    supportsTablet: true,
    bundleIdentifier: "com.turbopush.expodemo",
    version: pkg.version,
  },
  updates: {
    enabled: false,
    fallbackToCacheTimeout: 0,
  },
  name: "Turbopush Demo",
  orientation: "portrait",
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "15.5",
        },
      },
    ],
    [
      "@turbopush/turbopush-expo-plugin",
      {
        android: {
          CodePushDeploymentKey:
            process.env.EXPO_PUBLIC_CODE_PUSH_KEY_ANDROID ?? "EMPTY_KEY",
        },
        ios: {
          CodePushDeploymentKey:
            process.env.EXPO_PUBLIC_CODE_PUSH_KEY_IOS ?? "EMPTY_KEY",
        },
      },
    ],
    "expo-router",
  ],
  scheme: "turbopush-demo",
  userInterfaceStyle: "automatic",
  version: pkg.version,
};

export default config;
