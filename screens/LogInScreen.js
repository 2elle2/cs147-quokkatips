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
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function LogInScreen() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigation = useNavigation();

  const logInUser = async () => {
    const auth = getAuth();

    setErrorText("");
    if (email.length === 0 && password.length === 0) {
      alert("Please enter your email address and password");
      return;
    }
    if (email.length === 0) {
      alert("Please enter your email address");
      return;
    }
    if (password.length === 0) {
      alert("Please enter your password");
      return;
    }

    //changed the promising chaining to async/await
    try {
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userCredential);

      // let uid = userCredential.user.uid;
      // console.log(uid);

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

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
      <Image
        style={styles.quokkaImage}
        source={require("../assets/Quokkas/dance2.png")}
      />
      <Text style={styles.logInHeaderText}>Log In</Text>
      <View style={styles.inputView}>
        <Feather name="user" size={24} color="black" />
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email address"
        />
      </View>
      <View style={styles.inputView}>
        <AntDesign name="lock1" size={24} color="black" />
        <TextInput
          style={styles.inputText}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.logInButton} onPress={logInUser}>
        <Text style={styles.logInText}>Log In </Text>
        <FontAwesome5 name="chevron-right" size={16} color={Colors.white} />
      </TouchableOpacity>

      <View style={styles.signUpRow}>
        <Text style={styles.newUserText}>New user?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.createAnAccount}> Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 24,
    top: 60,
  },

  quokkaImage: {
    width: 240,
    height: 240,
    marginRight: 16,
  },

  logInHeaderText: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 10,
  },

  inputView: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1.2,
    margin: 10,
    paddingLeft: 12,
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 4,
  },

  logInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.black,
    width: "80%",
    height: 50,
    margin: 10,
    borderRadius: 6,
    // marginTop: 40,
    shadowColor: Colors.black,
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  logInText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.white,
  },

  signUpRow: {
    marginTop: 40,
    flexDirection: "row",
  },

  newUserText: {
    fontSize: 16,
    color: Colors.black,
  },
  createAnAccount: {
    fontSize: 16,
    color: Colors.orange,
    fontWeight: "600",
  },
});
