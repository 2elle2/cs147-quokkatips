import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import Colors from "../Themes/colors";

export default function TutorialScreenTwo(props) {
  console.log("props two", props);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#E3A444" />
          <Text style={styles.backButtonText}> Back</Text>
        </Pressable>
        <Text style={styles.headerText}>Tutorial</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.tutorialImage}
          source={require("../assets/my_guides.png")}
        />
      </View>

      <Text style={styles.modifyText}>
        View your saved guides of classroom software, including app info and
        features
      </Text>

      <View style={styles.dots}>
        <View style={styles.dotOff} />
        <View style={styles.dotOn} />
        <View style={styles.dotOff} />
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("TutorialThreeHome")}
      >
        <Text style={styles.nextText}>Next </Text>
        <FontAwesome5 name="chevron-right" size={16} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 300,
    backgroundColor: Colors.lightgray,
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    height: 30,
    marginBottom: 6,
    alignSelf: "center",
  },
  backIcon: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 24,
    top: 60,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
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
    marginTop: 10,
    width: "75%",
    textAlign: "center",
  },
  tutorialImage: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    overflow: "hidden",
  },
  imageContainer: {
    marginTop: 20,
    width: "75%",
    height: 500,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: Colors.gray,
    shadowOffset: { width: -1, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  dots: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  dotOn: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#E3A444",
  },
  dotOff: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#888888",
  },
  skipButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  skipButtonText: {
    color: "#E3A444",
    fontSize: 18,
    fontWeight: "500",
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
  },
  backButtonText: {
    color: "#E3A444",
    fontSize: 18,
    fontWeight: "500",
  },
});
