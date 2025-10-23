import { Link } from "expo-router";
import React, { useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

// 🎨 CHANGE THESE VALUES TO TEST CODEPUSH UPDATES! 🎨
const CONFIG = {
  emoji: "🚀", // Try: 🎉 🔥 💎 ⚡ 🌟 🎯 🎪 🦄
  title: "Playground Time!",
  subtitle: "Tap the emoji to score points!",
  backgroundColor: "bg-purple-500", // Try: bg-blue-500, bg-green-500, bg-pink-500, bg-orange-500
  buttonColor: "bg-yellow-400", // Try: bg-red-400, bg-blue-400, bg-green-400
  textColor: "text-white",
  scoreMultiplier: 1, // Try: 2, 5, 10 for more fun!
  version: "v1.0", // Update this to track your changes!
};

export default function Playground() {
  const [score, setScore] = useState(0);
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePress = () => {
    setScore((prev) => prev + CONFIG.scoreMultiplier);

    // Fun bounce animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const reset = () => {
    setScore(0);
  };

  return (
    <View className={`flex-1 ${CONFIG.backgroundColor}`}>
      <View className="flex-1 items-center justify-center px-6">
        {/* Version Badge */}
        <View className="absolute top-12 right-4 bg-black/30 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">{CONFIG.version}</Text>
        </View>

        {/* Back Button */}
        <Link href="/" asChild>
          <Pressable className="absolute top-12 left-4 bg-black/30 px-4 py-2 rounded-full">
            <Text className="text-white font-bold">← Back</Text>
          </Pressable>
        </Link>

        {/* Title */}
        <Text className={`text-4xl font-bold ${CONFIG.textColor} mb-2 text-center`}>
          {CONFIG.title}
        </Text>
        <Text className={`text-lg ${CONFIG.textColor} mb-8 text-center opacity-80`}>
          {CONFIG.subtitle}
        </Text>

        {/* Score Display */}
        <View className="mb-8 bg-white/20 px-8 py-4 rounded-2xl">
          <Text className={`text-2xl ${CONFIG.textColor} text-center`}>
            Score: <Text className="font-bold text-3xl">{score}</Text>
          </Text>
        </View>

        {/* Tappable Emoji */}
        <Pressable onPress={handlePress} className="mb-8">
          <Animated.Text
            style={{
              fontSize: 120,
              transform: [{ scale: scaleValue }],
            }}
          >
            {CONFIG.emoji}
          </Animated.Text>
        </Pressable>

        {/* Action Buttons */}
        <View className="gap-3 w-full max-w-xs">
          <Pressable
            className={`${CONFIG.buttonColor} py-4 rounded-xl items-center shadow-lg`}
            onPress={handlePress}
          >
            <Text className="text-black font-bold text-lg">
              +{CONFIG.scoreMultiplier} Point{CONFIG.scoreMultiplier > 1 ? "s" : ""}
            </Text>
          </Pressable>

          <Pressable
            className="bg-white/20 py-3 rounded-xl items-center"
            onPress={reset}
          >
            <Text className={`${CONFIG.textColor} font-semibold`}>Reset Score</Text>
          </Pressable>
        </View>

        {/* Fun Stats */}
        <View className="mt-8 bg-black/20 px-6 py-3 rounded-xl">
          <Text className={`${CONFIG.textColor} text-xs text-center`}>
            {score > 0
              ? `You've tapped ${Math.floor(score / CONFIG.scoreMultiplier)} times!`
              : "Start tapping to play!"}
          </Text>
        </View>
      </View>
    </View>
  );
}

