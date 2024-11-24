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
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchPersonById } from "../utils/api";

export default function PersonViewScreen(props) {
  const theme = useTheme();
  // jh-us
  // useState() returns an array with two elements:
  // 1. the current state
  // 2. a function to update it

  const [person, setPerson] = useState(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  // Read id of record from the route...
  const { id } = props.route.params;

  // jh-uef
  // useEffect() takes two arguments:
  // 1. A function that contains the side effect code
  // 2. An array of dependencies that the side effect depends on
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPersonById(id);
        setPerson(data);
      } catch (err) {
        console.error(err);
        setOffline(true);
        setError("Unable to fetch data, offline mode");
      }
    };

    fetchData();
  }, [id]);

  // Error handling to display a message if the data cannot be fetched
  if (!person) {
    return (
      <Surface style={styles.container}>
        <Text>Loading person data...</Text>
      </Surface>
    );
  }

  // Returns user to previous screen
  function goBack() {
    props.navigation.goBack();
  }

  function goHome() {
    props.navigation.navigate("Home");
  }

  return (
    // IT WORKS!!!!!
    <Surface style={styles.container}>
      <Text variant="headlineLarge">{person.name}</Text>
      <View style={styles.form}>
        <Text variant="bodyMedium">Phone: {person.phone}</Text>
        <Text variant="bodyMedium">Street: {person.street}</Text>
        <Text variant="bodyMedium">City: {person.city}</Text>
        <Text variant="bodyMedium">State: {person.state}</Text>
        <Text variant="bodyMedium">Zip: {person.zip}</Text>
        <Text variant="bodyMedium">Country: {person.country}</Text>
        <Text variant="bodyMedium">Department: {person.Department.name}</Text>
      </View>
      <Button mode="contained" onPress={goBack} style={styles.button}>
        Go Back
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  form: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
});
