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
// For resetting the menu state when the screen is focused
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { fetchPeople, deletePerson } from "../utils/api";
import { Dropdown } from "react-native-paper-dropdown";

export default function PeopleViewScreen(props) {
  // jh-us
  // useState() returns an array with two elements:
  // 1. the current state
  // 2. a function to update it
  const [people, setPeople] = useState([]);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedPersonName, setSelectedPersonName] = useState("");

  const isFocused = useIsFocused();

  // jh-uef
  const fetchData = async () => {
    try {
      const data = await fetchPeople();
      setPeople(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused]);

  // jh-hd
  const handleDelete = async () => {
    if (selectedPersonId !== null) {
      try {
        const success = await deletePerson(selectedPersonId);
        if (success) {
          fetchData();
          hideDialog();
        } else {
          setError("Failed to delete. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setOffline(true);
        setError("Failed to delete. Check your connection.");
        hideDialog();
      }
    }
  };

  // jh-sdlg
  const showDialog = (id, name) => {
    setSelectedPersonId(id);
    setSelectedPersonName(name);
    setVisible(true);
  };

  // jh-hdlg
  const hideDialog = () => {
    setVisible(false);
    setSelectedPersonId(null);
  };

  function showAddPerson() {
    props.navigation.navigate("PersonEdit", { id: -1 });
  }

  function showEditPerson(id) {
    props.navigation.navigate("PersonEdit", { id: id });
  }

  function showViewPerson(id) {
    props.navigation.navigate("PersonView", { id: id });
  }

  return (
    // the map function is to iterate over the people array and for every person, it will render a CARD component with the person's name
    // the key prop is used to uniquely identify each item in the list so that React can efficiently update the list when it changes.
    // As per instructions, I'll want three views: Avatar, main content, and buttons.
    <Surface style={styles.container}>
      <Text variant="headlineLarge">Staff Directory</Text>
      <ScrollView style={{ flex: 1 }}>
        {people.map((person) => (
          <Card key={person.id} style={styles.card}>
            <View style={styles.cardAvatar}>
              <TouchableOpacity onPress={() => showViewPerson(person.id)}>
                <Avatar.Icon size={48} icon="account" />
              </TouchableOpacity>
              <View style={styles.cardMainContent}>
                <Text>{person.name}</Text>
                <Text>{person.Department.name}</Text>
                <Text>{person.phone}</Text>
              </View>
              <View style={styles.cardButtons}>
                <IconButton
                  icon="pencil"
                  onPress={() => showEditPerson(person.id)}
                />
                <IconButton
                  icon="delete"
                  onPress={() => showDialog(person.id, person.name)}
                />
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
      <FAB style={styles.fab} icon="plus" onPress={showAddPerson} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Text style={{ marginBottom: 10 }}>
              Are you sure you want to delete?
            </Text>
            <Text style={{ fontWeight: "bold" }}>{selectedPersonName}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  card: {
    marginBottom: 10,
  },
  cardAvatar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  cardMainContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardButtons: {
    flexDirection: "column",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});

/*
// =====================
// =====================
//
//
// ===================== 
// =    REACT NOTES    =
// =====================
// React Navigation uses something called a "Stack Navigator" to manage navigation between screens
// Meaning, The React "engine" keeps track of the screens I've visited and allows me to go back to them (_which is why my "Go Back" just werks_).
// React also preserves "Application State" which is the "state" of the data that my application is currently using.
// So, when I go back to the "Home" screen, React Navigation pops the current screen off the _Stack_ and shows the previous screen's state along with all my unmolested data.
// Which means....to avoid the PeopleViewScreen from NOT having its state reset when I click off of it (since it's technically still in the stack even when I click "Go Home"), I need to use the "useIsFocused" hook.
// The useIsFocused hook is a hook that returns a **boolean value** that tells me if the screen (_PeopleViewScreen) is currently focused or not.
//
//
// ===================== 
// =    MEMOIZATION    =
// =====================
//
// Memoization is a technique used to optimize the performance of a function by caching its output based on its input.
// Which is just a fancy way of saying, "_If I've already run this function with these arguments, I don't need to run it again._"
// This is important because React re-renders components whenever their state changes, and if I have a function that's being called every time a component re-renders, I can use memoization to prevent that function from being called multiple times and needlessly chewing up CPU resources.
// The React.useCallback() hook fits into this — which I've also mentioned below —  because it is responsible _for_ memoizing the funtions (_caching them_) **so that they only run once**.
// Imagine you’re teaching a mate to make a perfect cuppa:

    // **Memoization Off**: Every time you ask, they say, "Wait, let me relearn how to boil water, brew tea, and pour it."
    // **Memoization On**: They say, "Nah mate, I already know this. Just pour the tea straight away."

// It says: "If none of the ingredients (dependencies) change, I’ll skip relearning how to make tea." | _THAT'S_ memoization.
//
//
// =======================
// =      useState()     =
// =======================
//
// The useState() hook is a function that takes an **initial state value** and then **returns an array** with two elements:
//
//      1. The current state value
//      2. A function that lets me update that current state's value
//
// The function that lets me update the state value, setState(), is a setter function that I call with a new state value and then React will re-render the component with the new state value.
//
//
// =======================
// =   useFocusEffect()  =
// =======================
//
// The useFocusEffect() hook is a function that takes a function as an argument and then runs that function whenever the screen is focused.
// I can control _when_ that function runs by using a **DEPENDENCY ARRAY** that I pass as a second argument to the useFocusEffect() hook
// And, if that dependency array is empty,  the function will run _every time_ the screen is focused
//
//
// =======================
// =    useIsFocused()   =
// =======================
//
// The useIsFocused() hook is a function that returns a **boolean value** that tells me if the screen (_PeopleViewScreen_) is currently focused or not.
// Meaning, isFocused will be **true** if the screen is currently focused, and **false** if it's not.
//
//
// =======================
// =     useEffect()     =
// =======================
//
// The useEffect() hook is a function that lets me perform "**Side Effects**" (_that's going to have to be a review of my notes..._) within function components, and the useEffect() hook takes two arguments:
//
//      1. A function that contains the side effect code
//      2. An array of dependencies that the side effect depends on which will trigger the side effect to run whenever any value inside this array changes
//
// The useEffect() hook is called after the component is rendered and then again after every update
//
//
// =======================
// = React.useCallback() =
// =======================
//
// The React.useCallback() hook is a function that _memoizes_ a function so that the function will only run once.
// React.useCallback() takes two arguments:
//
//      1. The function to memoize
//      2. A dependency array that dictates when the function should be re-created
//
// So in my case, when I pass setState() to React.useCallback(), it will only run once since I passed it an empty dependency array.
//
//
// Don't forget to close out your comments, dude...
—> PKv2
*/
