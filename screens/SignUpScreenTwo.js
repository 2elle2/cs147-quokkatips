import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Checkbox } from "react-native-paper";
import React from "react";
import Colors from "../Themes/colors";

const SUBJECTS = [
  { id: 1, name: "Art", checked: false },
  { id: 2, name: "Chemistry", checked: false },
  { id: 3, name: "Computer Science", checked: false },
  { id: 4, name: "English Literature", checked: false },
  { id: 5, name: "Geography", checked: false },
  { id: 6, name: "History", checked: false },
  { id: 7, name: "Mathematics", checked: false },
  { id: 8, name: "Music", checked: false },
  { id: 9, name: "Physics", checked: false },
  { id: 10, name: "Spanish", checked: false },
];

// Create your forceUpdate hook to rerender checkboxes
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function SignUpScreenTwo() {
  const navigation = useNavigation();
  const forceUpdate = useForceUpdate();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="chevron-back-circle-outline"
          size={48}
          color={Colors.black}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>What do you teach?</Text>

      <View style={styles.checkboxList}>
        {SUBJECTS.map((subject) => {
          return (
            <View style={styles.checkboxListItem}>
              <Checkbox.Android
                status={subject.checked ? "checked" : "unchecked"}
                color={"#E3A444"}
                onPress={() => {
                  subject.checked = !subject.checked;
                  forceUpdate();
                }}
              />
              <Text style={styles.subjectText}>{subject.name}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("SignUpThree")}
        >
          <Text style={styles.nextText}>Next </Text>
          <FontAwesome5 name="chevron-right" size={16} color={Colors.white} />
        </TouchableOpacity>

        <Text style={styles.modifyText}>
          You can modify these selections later
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.lightgray,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backIcon: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 24,
    top: 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 70,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.black,
    width: "80%",
    height: 50,
    margin: 10,
    borderRadius: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  nextText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.white,
  },
  modifyText: {
    fontSize: 14,
    color: Colors.black,
  },
  checkboxListItem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  subjectText: {
    fontSize: 18,
    color: "black",
  },
  checkboxList: {
    position: "absolute",
    top: 160,
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 10,
    width: "80%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
  },
});
