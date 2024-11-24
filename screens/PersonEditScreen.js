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
import {
  fetchDepartments,
  fetchPersonById,
  addPerson,
  updatePerson,
} from "../utils/api";

export default function PersonEditScreen(props) {
  const theme = useTheme();
  // jh-us
  // useState() returns an array with two elements:
  // 1. the current state
  // 2. a function to update it

  // Define default state for person
  const [person, setPerson] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    departmentId: null,
  });
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { id } = props.route.params;

  // jh-uef
  // useEffect() takes two arguments:
  // 1. A function that contains the side effect code
  // 2. An array of dependencies that the side effect depends on
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching departments...");
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
        console.log("Departments data:", departmentsData);

        if (id !== -1) {
          console.log(`Fetching person data for Id: ${id}`);
          const personData = await fetchPersonById(id);
          setPerson(personData);
          setSelectedDepartment(personData.departmentId);
          console.log("Person data:", personData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setOffline(true);
        setError("Unable to fetch data, offline mode");
      }
    };

    fetchData();
  }, [id]);

  //jh-hs
  const handleSubmit = async () => {
    try {
      if (id === -1) {
        await addPerson({ ...person, departmentId: selectedDepartment });
      } else {
        await updatePerson(id, { ...person, departmentId: selectedDepartment });
      }
      props.navigation.goBack();
    } catch (err) {
      console.error("Failed to save data:", err);
      setError("Failed to save data");
    }
  };

  // Render a loading message until data is ready
  if (!departments || !departments.length) {
    return (
      <Surface style={styles.container}>
        <Text>Loading data...</Text>
      </Surface>
    );
  }

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
    padding: 16,
  },
  button: {
    marginTop: 9,
  },
});
