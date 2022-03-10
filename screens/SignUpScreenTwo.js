import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

import { doc, setDoc } from "firebase/firestore";
import Colors from "../Themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SignUpScreenTwo() {
  const navigation = useNavigation();

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

      <TouchableOpacity
        style={styles.nextButton}
        // onPress=
      >
        <Text style={styles.nextText}>Next </Text>
        <FontAwesome5 name="chevron-right" size={16} color={Colors.white} />
      </TouchableOpacity>

      <Text style={styles.modifyText}>
        You can modify these selections later
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.lightgray,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 24,
    top: 60,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },

  inputView: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    margin: 10,
    paddingLeft: 12,
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 4,
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
    // marginTop: 40,
    shadowColor: "black",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
});
