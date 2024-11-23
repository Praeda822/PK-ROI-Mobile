import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import PeopleViewScreen from "../screens/PeopleViewScreen";
import PersonViewScreen from "../screens/PersonViewScreen";
import PersonEditScreen from "../screens/PersonEditScreen";

const Stack = createStackNavigator();

export default function PeopleNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="PeopleView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PeopleView" component={StackScreen1} />
      <Stack.Screen name="PersonView" component={StackScreen1} />
      <Stack.Screen name="PersonEdit" component={StackScreen1} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
