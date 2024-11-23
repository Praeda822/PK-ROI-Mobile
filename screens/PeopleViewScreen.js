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
  Stylesheet,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";

export default function PeopleViewScreen(props) {
  function showAddPerson() {
    props.navigation.navigate("PersonEdit", { id: -1 });
  }

  function showEditPerson(id) {
    props.navigation.navigate("PersonEdit", { id: id });
  }

  function showViewPerson(id) {
    props.navigation.navigate("PersonView", { id: id });
  }

  function showPeopleView() {
    props.navigation.navigate("PeopleView");
  }
  return (
    // "Title" is a custom component that formats text as a title, comes from React
    // "Mode" is a custom component that formats text as a button, comes from React Native Paper
    // I want to be using mode="" for my buttons
    <Surface style={styles.container}>
      <Text variant="displaySmall">PeopleViewScreen</Text>
      <Button mode="Contained" title="Add Person" onPress={showAddPerson} />
      Add Person
      <Button title="Edit Person" onPress={() => showEditPerson(1)} />
      Edit Person
      <Button title="View Person" onPress={() => showViewPerson(1)} />
      View Person
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
