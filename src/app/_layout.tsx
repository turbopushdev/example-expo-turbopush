import { ErrorBoundary } from "@/ErrorBoundary";
import CodePush from "@turbopush/react-native-code-push";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

function RootLayout() {
  return (
    <ErrorBoundary>
      <SafeAreaView className="flex-1">
        <Slot />
      </SafeAreaView>
    </ErrorBoundary>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
})(RootLayout);
