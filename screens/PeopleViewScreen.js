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
    props.navigation.navigate("EditPerson", { id: -1 });
  }

  function showEditPerson(id) {
    props.navigation.navigate("EditPerson", { id: id });
  }

  function showViewPerson(id) {
    props.navigation.navigate("ViewPerson", { id: id });
  }

  function showPeopleView() {
    props.navigation.navigate("PeopleView");
  }
  return (
    <Surface style={styles.container}>
      <Text variant="displaySmall">PeopleViewScreen</Text>
      <Button title="Add Person" onPress={showAddPerson} />
      <Button title="Edit Person" onPress={() => showEditPerson(1)} />
      <Button title="View Person" onPress={() => showViewPerson(1)} />
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
