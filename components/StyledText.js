import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import Settings from "../constants/Settings";

export const loadFonts = async () => {
  await Font.loadAsync({
    "TrebuchetMS-Regular": require("../assets/fonts/trebuc.ttf"),
    "TrebuchetMS-Bold": require("../assets/fonts/trebucbd.ttf"),
  });
};

// Change my fontSize and lineHeight based on the global fontSizeModifier
function changeFontSize(styles) {
  // Flatten the styles ensuring nested styles merge into one object
  let styleObject = StyleSheet.flatten(styles);
  // Init two empty objects to hold my new fontSize and lineHeight
  let newFontSize = {};
  let newLineHeight = {};

  // Update font size
  // Checks if the styleObject has a fontSize property and if it does
  // It creates a new fontSize object with the OG fontSize multiplied by the global Settings.fontSizeModifier — Voila, global font-size scaling!
  if (styleObject.fontSize) {
    newFontSize = {
      fontSize: styleObject.fontSize * Settings.fontSizeModifier,
    };

    // Update line height
    if (styleObject.lineHeight) {
      newLineHeight = {
        lineHeight: styleObject.lineHeight * Settings.fontSizeModifier,
      };
    }
  }

  // Return modified style
  return [styleObject, newFontSize, newLineHeight];
}
