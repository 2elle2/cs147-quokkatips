import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
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
      <Text>This is the AboutScreen</Text>
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
    fontSize: 22,
    fontWeight: "700",
  },
  closeIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
  },
});
