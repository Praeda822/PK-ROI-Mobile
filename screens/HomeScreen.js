import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  IconButton,
  FAB,
  Snackbar,
  TextInput,
  Dialog,
  Portal,
  Button,
  Text,
  Surface,
  Pressable,
  Divider,
  Searchbar,
  useTheme,
} from "react-native-paper";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { TextParagraph } from "../components/StyledText";

export default function HomeScreen(props) {
  const [isLogoColour, setIsLogoColour] = React.useState(true);

  function showPeopleView() {
    props.navigation.navigate("PeopleView");
  }

  function toggleLogo() {
    setIsLogoColour(!isLogoColour);
  }

  function showHelpScreen() {
    props.navigation.navigate("Help");
  }

  return (
    <Surface style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Hi, John
      </Text>
      <Image
        source={
          isLogoColour
            ? require("../assets/images/roi-logo.jpg")
            : require("../assets/images/roi-logo-monochrome.jpg")
        }
        style={styles.homelogo}
      />
      <Text variant="displaySmall" style={styles.title}>
        ROI HR System
      </Text>

      <Button mode="contained" onPress={showPeopleView} style={styles.button}>
        View People
      </Button>
      <Button mode="contained" onPress={showHelpScreen} style={styles.button}>
        Help
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,

    title: {},

    homeLogo: {
      width: 200,
      height: 200,
      margin: 10,
    },
  },
});
