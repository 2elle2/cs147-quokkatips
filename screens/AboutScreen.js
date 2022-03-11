import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Colors from "../Themes/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.closeIcon}
        >
          <AntDesign name="closecircleo" size={30} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerText}>About QuokkaTips</Text>
      </View>
      <View style={styles.contentContainer}>
        <Image
          style={styles.quokkaImage}
          source={require("../assets/Quokkas/yes-quokka.png")}
        />

        <Text style={styles.aboutText}>
          App developed for CS147: Introduction to Human-Computer Interaction
        </Text>
        <Text style={styles.studioText}>
          Studio: The Virtual Learnscape: AR/VR x Education
        </Text>
        <Text style={styles.yearText}>Winter 2022</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 30,
    marginBottom: 6,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "500",
  },
  closeIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 30,
    height: "89%",
  },
  aboutText: {
    fontSize: 22,
    textAlign: "center",
  },
  studioText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  yearText: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 8,
  },
  quokkaImage: {
    width: 280,
    height: 280,
    marginRight: 10,
  },
});
