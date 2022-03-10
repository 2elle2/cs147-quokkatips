import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import React from "react";
import Colors from "../Themes/colors";

const SOFTWARE = [
  {
    id: "jUEWVUQE4UBImqprqsg9",
    name: "Canvas Teacher",
    logo: "https://play-lh.googleusercontent.com/lYd4BNnf82PzmU2ELD7F0dkMYtjZqra973SwT7DmzTFRk7QkhWVU02wYzskpHFYW5Sht=s180-rw",
    checked: false,
  },
  {
    id: "lpJsISwLw5WNnuBsRLzJ",
    name: "Desmos",
    logo: "https://play-lh.googleusercontent.com/AcmdHoyslp6AnrSMvDMg1o3tmhIuy0wbd8mN-usvDzhO4hiTHMLIavweYOPKmlpglrY=s180-rw",
    checked: false,
  },
  {
    id: "rVc8OGoVk4xxAdoS8ue8",
    name: "Google Classroom",
    checked: false,
    logo: "https://play-lh.googleusercontent.com/w0s3au7cWptVf648ChCUP7sW6uzdwGFTSTenE178Tz87K_w1P1sFwI6h1CLZUlC2Ug=s360-rw",
    checked: false,
  },
  {
    id: "HTk8bNkvXHCIUOx6m1lk",
    name: "Google Docs",
    checked: false,
    logo: "https://play-lh.googleusercontent.com/emmbClh_hm0WpWZqJ0X59B8Pz1mKoB9HVLkYMktxhGE6_-30SdGoa-BmYW73RJ8MGZQ=s360-rw",
    checked: false,
  },
  {
    id: "OdfIf5rPGDOmNaIvPTxI",
    name: "Kahoot",
    checked: false,
    logo: "https://play-lh.googleusercontent.com/AyJnaQ0JfEu-F_4bop5hH4qpJwYJ1blePyer6VVUUm4Al80uWJBje4UZHirrf39wI7uI=s360-rw",
    checked: false,
  },
  {
    id: "qXpLXifR8OcuUCTvEY3E",
    name: "Slack",
    checked: false,
    logo: "https://play-lh.googleusercontent.com/lV1DhBeSuikQy6fLPhgfNHUxDqterNlur4oB1Z_Yr0NOSiWwQOD0g8gWCjVf1mmMuw=s360-rw",
    checked: false,
  },
  {
    id: "DzFkWDDaArCq5EUCtts3",
    name: "Zoom",
    logo: "https://play-lh.googleusercontent.com/JgU6AIREDMsGLmrFSJ8OwLb-JJVw_jwqdwEZWUHemAj0V5Dl7i7GOpmranv2GsCKobM=s180-rw",
    checked: false,
  },
];

// Create your forceUpdate hook to rerender checkboxes
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function SignUpScreenFour() {
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

      <Text style={styles.headerText}>What software do you use?</Text>

      <View style={styles.checkboxList}>
        {SOFTWARE.map((software) => {
          return (
            <View style={styles.checkboxListItem}>
              <Checkbox.Android
                status={software.checked ? "checked" : "unchecked"}
                color={"#E3A444"}
                onPress={() => {
                  software.checked = !software.checked;
                  forceUpdate();
                }}
              />
              <Text style={styles.softwareText}>{software.name}</Text>
              <Image style={styles.logo} source={{ uri: software.logo }} />
            </View>
          );
        })}
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("TutorialOne")}
        >
          <Text style={styles.signupText}>Sign Up </Text>
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
  signupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3A444",
    width: "80%",
    height: 50,
    margin: 10,
    borderRadius: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  signupText: {
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
  softwareText: {
    fontSize: 20,
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
  logo: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    position: "absolute",
    left: "85%",
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
  },
});
