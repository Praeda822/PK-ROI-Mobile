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
      <Stack.Screen name="PeopleView" component={PeopleViewScreen} />
      <Stack.Screen name="PersonView" component={PersonViewScreen} />
      <Stack.Screen name="PersonEdit" component={PersonEditScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
