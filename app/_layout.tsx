import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useThemeContext";
import { ThemeProvider } from "@/hooks/useThemeContext";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <NavigationThemeProvider
      value={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === "dark" ? "#46f3fc" : "#FCA5A5",
          },
          headerTitleStyle: {
            color: theme === "dark" ? "#fff" : "#000",
            fontWeight: "bold",
          },
          // Add animation for smooth transitions
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Users",
            headerShadowVisible: false,
            headerRight: () => (
              <Pressable
                onPress={toggleTheme}
                className="mr-4 p-2 active:opacity-70"
              >
                <IconSymbol
                  size={24}
                  name={theme === "dark" ? "sun.max.fill" : "moon.fill"}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: "User Details",
            headerShadowVisible: false,
            headerBackTitle: "Back",
            headerRight: () => (
              <Pressable
                onPress={toggleTheme}
                className="mr-4 p-2 active:opacity-70"
              >
                <IconSymbol
                  size={24}
                  name={theme === "dark" ? "sun.max.fill" : "moon.fill"}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}
