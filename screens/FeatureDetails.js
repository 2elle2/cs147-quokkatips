import { Text, View, SafeAreaView, StyleSheet, Pressable, } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function FeatureDetails(props) {
    console.log(JSON.stringify(props.route.params) + 'asdfasdfasdfasdfasdf');
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={28} color="#E3A444" />
                    <Text style={styles.backButtonText}> Back</Text>
                </Pressable>
                <Text style={styles.categoryText}>Feature Details</Text>
            </View>
            <Text>{props.route.params.feature.name}</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    body: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      marginBottom: 6,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "95%",
      height: 30,
      marginBottom: 6,
    },
    categoryText: {
      fontSize: 22,
      fontWeight: "700",
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
      fontSize: 22,
      fontWeight: "500",
    },
  });


