// jh-rnan to spawn the boilerplate

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
// DON'T FORGET TO IMPORT DefaultTheme FROM react-native-paper!!!!!!!! -->|| PK v1
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import RootNavigator from "./navigation/RootNavigator";
// For TrebuchetMS font
import { loadFonts } from "./components/StyledText";
/*
// Originally my attempt to import the "custom" TrebuchetMS.ttc font
// Alas... it did not work lol... but i'll leave it here so I can remember my first time learning how to use useEffect and useState
// You never forget your first time..

// https://github.com/Praeda822/PK-ROI-Mobile/commit/51d9dacf225e6d69f633673e718e777d6761e059
// import * as Font from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// -->|| PK v2
*/

/*
// Generated from:
// https://callstack.github.io/react-native-paper/docs/guides/theming/#creating-dynamic-theme-colors
// Primary: #941A1D
// Secondary (custom): #C64C38
// Tertiary (custom): #CB6D4F
// Copy the light-theme and PASTE IT IN THE THEME OBJECT
// REST operator to declare the default theme and copy it into the custom ROI theme
// Then explicitly define the custom ROI theme's colours as the default theme's colours
// -->|| PK v2
*/

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(118, 0, 12)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 218, 214)",
    onPrimaryContainer: "rgb(65, 0, 3)",
    secondary: "rgb(156, 65, 60)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 176, 169)",
    onSecondaryContainer: "rgb(65, 0, 3)",
    tertiary: "rgb(134, 83, 0)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 221, 185)",
    onTertiaryContainer: "rgb(43, 23, 0)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 25)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 25)",
    // Change background colour of text inputs
    surfaceVariant: "rgb(255,255,255)",
    onSurfaceVariant: "rgb(83, 67, 66)",
    outline: "rgb(133, 115, 113)",
    outlineVariant: "rgb(216, 194, 191)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 46)",
    inverseOnSurface: "rgb(251, 238, 236)",
    inversePrimary: "rgb(255, 179, 173)",
    elevation: {
      level0: "transparent",
      level1: "rgb(252, 248, 248)",
      level2: "rgb(241, 237, 236)",
      level3: "rgb(246, 229, 232)",
      level4: "rgb(245, 226, 230)",
      level5: "rgb(244, 222, 226)",
    },
    surfaceDisabled: "rgba(32, 26, 25, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 25, 0.38)",
    backdrop: "rgba(59, 45, 44, 0.4)",
  },
  // Global font settings so I DON"T have to use the "fontFamily" prop on every single text component.. -->|| PK v1
  // I just changed font to text and it magically works so i'm not touching it again lol -->|| PK v2
  text: {
    regular: {
      fontFamily: "TrebuchetMS-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "TrebuchetMS-Bold",
      fontWeight: "bold",
    },
    light: {
      fontFamily: "TrebuchetMS-Regular",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "TrebuchetMS-Regular",
      fontWeight: "100",
    },
  },
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAsyncFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsyncFonts();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  regularText: {
    fontFamily: "TrebuchetMS-Regular",
    fontSize: 18,
  },
  boldText: {
    fontFamily: "TrebuchetMS-Bold",
    fontSize: 18,
    fontWeight: "bold",
  },
});
