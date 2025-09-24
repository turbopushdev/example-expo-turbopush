import { ExpoConfig } from "expo/config";

import * as pkg from "./package.json";

const config: ExpoConfig = {
  slug: "test-codepush",
  owner: "test-codepush",
  android: {
    package: "com.test.codepush",
    versionCode: 1,
    version: pkg.version,
  },
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  ios: {
    buildNumber: "1",
    supportsTablet: true,
    bundleIdentifier: "com.test.codepush",
    version: pkg.version,
  },
  updates: {
    enabled: false,
    fallbackToCacheTimeout: 0,
  },
  name: "Codepush plugin Demo",
  orientation: "portrait",
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          buildToolsVersion: '34.0.0',
          compileSdkVersion: 35,
          targetSdkVersion: 34,
        },
        ios: {
          deploymentTarget: "15.5",
          hermes: true,
          privacyManifestAggregationEnabled: true,
          useFrameworks: 'static',
        },
      },
    ],
    [
      "@turbopush/turbopush-expo-plugin",
      {
        android: {
          CodePushDeploymentKey: process.env.EXPO_PUBLIC_CODE_PUSH_KEY_ANDROID ?? "EMPTY_KEY",
        },
        ios: {
          CodePushDeploymentKey: process.env.EXPO_PUBLIC_CODE_PUSH_KEY_IOS ?? "EMPTY_KEY",
        },
      },
    ],
    "expo-router",
  ],
  scheme: "com.test.codepush",
  userInterfaceStyle: "automatic",
  version: pkg.version,
};

export default config;
