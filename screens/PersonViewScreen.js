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

export default function PersonViewScreen(props) {
  function showPeopleView() {
    props.navigation.navigate("PeopleView");
  }
  // Returns user to previous screen
  function goBack() {
    props.navigation.goBack();
  }

  function goHome() {
    props.navigation.navigate("Home");
  }

  return (
    <Surface style={styles.container}>
      <Text variant="displaySmall">PersonViewScreen</Text>
      <Button mode="contained" onPress={showPeopleView} style={styles.button}>
        Go to People View
      </Button>
      <Button mode="contained" onPress={goBack} style={styles.button}>
        Go Back
      </Button>
      <Button mode="contained" onPress={goHome} style={styles.button}>
        Go Home
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  button: {
    marginTop: 9,
  },
});
