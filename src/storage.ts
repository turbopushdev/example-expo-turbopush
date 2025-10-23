import CodePush from "@turbopush/react-native-code-push";
import { MMKV } from "react-native-mmkv";

const mmkv = new MMKV();

const restartApp = () => {
  setTimeout(() => {
    CodePush.restartApp(false);
  }, 1000);
};

const getDeploymentKey = () => {
  return mmkv.getString("deploymentKey");
};

const setDeploymentKey = (deploymentKey: string) => {
  mmkv.set("deploymentKey", deploymentKey);
  CodePush.clearUpdates()
  restartApp();
};

const clearDeploymentKey = () => {
  mmkv.delete("deploymentKey");
  restartApp();
};

export const storage = {
  getDeploymentKey,
  setDeploymentKey,
  clearDeploymentKey,
};
