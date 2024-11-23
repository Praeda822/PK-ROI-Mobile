// jh-rnsn | RN Stack-Navigator

import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import MainNavigator from "./MainNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      // My screen name
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
