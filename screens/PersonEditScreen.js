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
// Forgot my imports again...
import { fetchDepartments, fetchPersonById } from "../utils/api";

export default function PersonEditScreen(props) {
  // jh-us
  // useState() returns an array with two elements:
  // 1. the current state
  // 2. a function to update it

  const [person, setPerson] = useState(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setselectedDepartment] = useState(null);

  // jh-uef
  // useEffect() takes two arguments:
  // 1. A function that contains the side effect code
  // 2. An array of dependencies that the side effect depends on
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await [fetchDepartments(), fetchPersonById(id)];

        setPerson(data);
        setDepartments(departmentsData);
      } catch (err) {
        console.error(err);
        setOffline(true);
        setError("Unable to fetch data, offline mode");
      }
    };

    fetchData();
  }, [fetchDepartments, id]);

  function goBack() {
    props.navigation.goBack();
  }

  function goHome() {
    props.navigation.navigate("Home");
  }

  return (
    <Surface style={styles.container}>
      <Text variant="displaySmall">PersonEditScreen</Text>
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
