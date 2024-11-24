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
import { DropDown } from "react-native-paper-dropdown";

// Forgot my imports again...
import {
  fetchDepartments,
  fetchPersonById,
  addPerson,
  updatePerson,
} from "../utils/api";
import { MaterialIcons } from "@expo/vector-icons";

export default function PersonEditScreen(props) {
  const theme = useTheme();
  console.log("DropDown:", DropDown);
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
  const [showDropDown, setShowDropDown] = useState(false);
  const [value, setValue] = useState(null);
  //Define the dropdownlist..
  const dropDownList = [
    { label: "General", value: 1 },
    { label: "Information Communications Technology", value: 2 },
    { label: "Finance", value: 3 },
    { label: "Marketing", value: 4 },
    { label: "Human Resources", value: 5 },
  ];

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
  async function handleSubmit() {
    try {
      const updatedPerson = { ...person, departmentId: selectedDepartment };
      if (id === -1) {
        await addPerson(updatedPerson);
      } else {
        await updatePerson(id, updatedPerson);
      }
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  }

  if (!departments || departments.length === 0) {
    return <Text>No departments available.</Text>; // Or handle accordingly
  }

  function goBack() {
    props.navigation.goBack();
  }

  function goHome() {
    props.navigation.navigate("Home");
  }

  return (
    <Surface style={styles.container}>
      <Text variant="headlineLarge">
        {id === -1 ? "New Person" : person.name}
      </Text>
      <TextInput
        label="Name"
        value={person.name}
        onChangeText={(text) => setPerson({ ...person, name: text })}
        style={styles.input}
      />
      <TextInput
        label="Phone"
        value={person.phone}
        onChangeText={(text) => setPerson({ ...person, phone: text })}
        style={styles.input}
      />
      <TextInput
        label="Street"
        value={person.street}
        onChangeText={(text) => setPerson({ ...person, street: text })}
        style={styles.input}
      />
      <TextInput
        label="City"
        value={person.city}
        onChangeText={(text) => setPerson({ ...person, city: text })}
        style={styles.input}
      />
      <TextInput
        label="State"
        value={person.state}
        onChangeText={(text) => setPerson({ ...person, state: text })}
        style={styles.input}
      />
      <TextInput
        label="Zip"
        value={person.zip}
        onChangeText={(text) => setPerson({ ...person, zip: text })}
        style={styles.input}
      />
      <TextInput
        label="Country"
        value={person.country}
        onChangeText={(text) => setPerson({ ...person, country: text })}
        style={styles.input}
      />
      <DropDown
        label="Department"
        mode="outlined"
        value={selectedDepartment}
        setValue={setSelectedDepartment}
        list={dropDownList}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => props.navigation.goBack()}
          style={styles.button}
          icon={() => (
            <MaterialIcons name="arrow-back" size={26} color="white" />
          )}
        >
          Cancel
        </Button>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
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
    padding: 16,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 9,
    marginHorizontal: 8,
  },
});
