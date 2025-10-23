import { Logger } from "@/components/logger";
import CodePush from "@turbopush/react-native-code-push";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { storage } from "../storage";
import { useCodepush } from "../useCodepush";

type SetDeploymentKeyParams = {
  deploymentKey: string;
};

export default function Page() {
  const { deploymentKey } = useLocalSearchParams<SetDeploymentKeyParams>();
  const {
    syncCodePush,
    progress,
    status,
    version,
    turbopushKey,
    clearUpdates,
  } = useCodepush();

  useEffect(() => {
    // Set deployment key over deep link
    // Example: turbopush-demo://?deploymentKey=dk_cbfb0...
    const currentKey = storage.getDeploymentKey();
    if (deploymentKey && deploymentKey !== currentKey) {
      console.log(`Set Deployment Key: ${deploymentKey}`);
      storage.setDeploymentKey(deploymentKey);
    }
  }, [deploymentKey]);

  return (
    <View className="flex flex-1">
      <View className="h-full bg-white">
        <View className="py-12 md:py-24 lg:py-32 xl:py-48">
          <View className="px-4 md:px-6 gap-4">
            <View className="flex flex-col items-center gap-4 text-center">
              {/* <Image source={require("./logo-black.png")} resizeMode="contain" className="w-30 h-10" /> */}
              <Text
                role="heading"
                className="text-black text-xl text-center font-bold tracking-tighter"
              >
                Update from turbopush
              </Text>
              <Text
                role="heading"
                className="text-black text-xl text-center font-bold tracking-tighter"
              >
                {`Progress: ${progress}\nStatus: ${status}\nVersion: ${version}\n Current Key: ${turbopushKey}`}
              </Text>
              <View className="gap-4">
                <Pressable
                  className="flex h-9 items-center justify-center bg-blue-500 rounded-md px-4 py-2"
                  onPress={syncCodePush}
                >
                  <Text className="text-white">Sync</Text>
                </Pressable>
                <Pressable
                  className="flex h-9 items-center justify-center bg-blue-500 rounded-md px-4 py-2"
                  onPress={() => {
                    console.log("Trying to restartApp");
                    CodePush.restartApp(false);
                  }}
                >
                  <Text className="text-white">Reload App</Text>
                </Pressable>
                <Pressable
                  className="flex h-9 items-center justify-center bg-blue-500 rounded-md px-4 py-2"
                  onPress={() => clearUpdates()}
                >
                  <Text className="text-white">Clear Updates</Text>
                </Pressable>
                <Pressable
                  className="flex h-9 items-center justify-center bg-blue-500 rounded-md px-4 py-2"
                  onPress={() => storage.clearDeploymentKey()}
                >
                  <Text className="text-white">
                    Clear Persisted Deployment Key
                  </Text>
                </Pressable>
                <Link href="/playground" asChild>
                  <Pressable className="flex h-9 items-center justify-center bg-purple-500 rounded-md px-4 py-2">
                    <Text className="text-white">🎮 Playground</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
            <Logger />
          </View>
        </View>
      </View>
    </View>
  );
}
