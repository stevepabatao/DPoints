// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PointsProvider } from "@/context/PointsContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <PointsProvider>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="scan" />
          <Stack.Screen name="reward/[id]" />
        </Stack>
      </SafeAreaProvider>
    </PointsProvider>
  );
}




