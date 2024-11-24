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
import { MaterialIcons } from "@expo/vector-icons";

export default function PersonEditScreen(props) {
  // jh-us
  // useState() returns an array with two elements:
  // 1. the current state
  // 2. a function to update it

  // Set default state of person object
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
  // Handles state of the title for the PersonEditScreen
  const [title, setTitle] = useState(null);

  // Read id of record from the route...
  // pull mode from route params
  const { id, mode } = props.route.params;

  // jh-uef
  // useEffect() takes two arguments:
  // 1. A function that contains the side effect code
  // 2. An array of dependencies that the side effect depends on
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching departments data..");
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
        console.log("Departments data:", departmentsData);

        if (mode === "edit") {
          console.log("Fetching person data for person with id:", id);
          const personData = await fetchPersonById(id);
          setPerson(personData);
          setSelectedDepartment(personData.departmentId);
          setTitle(personData.name);
          console.log("Person data:", personData);
        } else {
          setTitle("New Record");
        }
      } catch (err) {
        console.error(err);
        setOffline(true);
        setError("Unable to fetch data, offline mode");
      }
    };

    fetchData();
  }, [mode, id]);

  // Check if the departments data is ready yet
  if (!departments || !departments.length) {
    return (
      <Surface style={styles.container}>
        <Text>Loading data...</Text>
      </Surface>
    );
  }

  // jh-hs
  async function handleSubmit() {
    try {
      if ("mode" === "add") {
        await addPerson(person);
      } else {
        await updatePerson(id, person);
      }
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  }

  function goBack() {
    props.navigation.goBack();
  }

  function goHome() {
    props.navigation.navigate("Home");
  }

  return (
    <Surface style={styles.container}>
      <Text variant="displaySmall">{title}</Text>
      <TextInput
        label="Name"
        value={person.name}
        onChangeText={(text) => setPerson({ ...person, name: text })}
      />
      <TextInput
        label="Phone"
        value={person.phone}
        onChangeText={(text) => setPerson({ ...person, phone: text })}
      />
      <TextInput
        label="Street"
        value={person.street}
        onChangeText={(text) => setPerson({ ...person, street: text })}
      />
      <TextInput
        label="City"
        value={person.city}
        onChangeText={(text) => setPerson({ ...person, city: text })}
      />
      <TextInput
        label="State"
        value={person.state}
        onChangeText={(text) => setPerson({ ...person, state: text })}
      />
      <TextInput
        label="Zip"
        value={person.zip}
        onChangeText={(text) => setPerson({ ...person, zip: text })}
      />
      <TextInput
        label="Country"
        value={person.country}
        onChangeText={(text) => setPerson({ ...person, country: text })}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={goBack}
          style={styles.button}
          icon={() => (
            <MaterialIcons name="arrow-back" size={26} color="white" />
          )}
        >
          Cancel
        </Button>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Ok
        </Button>
      </View>
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
  },

  button: {
    marginTop: 9,
    marginHorizontal: 8,
  },
});
