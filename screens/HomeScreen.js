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
  Pressable,
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
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
// Handles the text!!!
import {
  TextH1,
  TextH2,
  TextH3,
  TextParagraph,
} from "../components/StyledText";

export default function HomeScreen(props) {
  const [isLogoColour, setIsLogoColour] = React.useState(true);
  const theme = useTheme();
  function showPeopleView() {
    props.navigation.navigate("PeopleView");
  }

  function toggleLogo() {
    setIsLogoColour(!isLogoColour);
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.textContainer}>
        <Button mode="contained" onPress={showPeopleView} style={styles.button}>
          Logo icon
        </Button>
        <Text variant="displaySmall" style={styles.heading}>
          Hi, John
        </Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={
            isLogoColour
              ? require("../assets/images/roi-logo.jpg")
              : require("../assets/images/roi-logo-monochrome.jpg")
          }
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        <Divider style={styles.divider} />
        <Text variant="displaySmall" style={styles.title}>
          ROI HR System
        </Text>
        <Divider style={styles.divider} />
        <Text variant="displaySmall" style={styles.text}>
          Remaining Leave Days: 10
        </Text>
        <Divider style={styles.divider} />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Much easier to just comment these out..
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    padding: 16,
  },

  textContainer: {
    alignItems: "flex-start",
    width: "100%",
  },

  heading: {
    fontSize: 24,
    marginBottom: 10,
    color: "#941a1d",
    textAlign: "left",
    fontWeight: "bold",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
  },

  text: {
    fontSize: 20,
    textAlign: "left",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },

  button: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },

  divider: {
    marginTop: 10,
    marginBottom: 30,
    width: "95%",
  },
});
