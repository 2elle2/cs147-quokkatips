import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";

const DATA = [
  { id: "1", title: "Desmos" },
  { id: "2", title: "Canvas" },
  { id: "3", title: "QuokkaTips" },
  { id: "4", title: "Google Docs" },
  { id: "5", title: "Slack" },
  { id: "6", title: "Google Sheets" },
  { id: "7", title: "Google Slides" },
  { id: "8", title: "Microsoft PowerPoint" },
  { id: "9", title: "Microsoft Word" },
  { id: "10", title: "Microsoft Excel" },
  { id: "11", title: "Microsoft Teams" },
];

const { width } = Dimensions.get("window");

const Item = (props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("AppDetails", { appName: props.app.name });
      }}
      style={styles.item}
    >
      <View style={styles.itemImageContainer}>
        <Image style={styles.itemImage} source={{ uri: props.app.logo }} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{props.app.name}</Text>
        <View style={styles.itemRatings}>
          <FontAwesome name="star" size={12} color="black" />
          <Text style={styles.itemRating}>{props.app.rating}</Text>
          <Text style={styles.itemRatingTotal}>/ 5 </Text>
          <Octicons name="primitive-dot" size={8} color="gray" />
          <Text> </Text>

          <MaterialCommunityIcons
            name="speedometer-slow"
            size={12}
            color="black"
          />
          <Text style={styles.itemDifficulty}> Easy</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function ViewAll({ route }) {
  const renderItem = ({ item }) => <Item app={item} />;
  const [firestore_data, setData] = useState([]); // Save list of guides from firestore
  // in local state

  useEffect(() => getGuides(), []); // Pass in empty array so it will only run once on component mount

  /**
   * Helper Function: getGuides
   *
   * Callback function for useEffect. Retrieves all documents in the "guides" collection.
   * The array of guides is saved to the state variable "firestore_data";
   */
  const getGuides = async () => {
    const querySnapshot = await getDocs(collection(db, "guides"));
    const guides = querySnapshot.docs.map((doc) => {
      let guide = doc.data();
      guide.id = doc.id; // Set the id prop on the guide object
      return guide;
    });
    console.log(guides);
    setData(guides);
  };

  const navigation = useNavigation();
  const { category } = route.params;

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
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <View style={styles.gridContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={firestore_data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        ></FlatList>
      </View>
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
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
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
  gridContainer: {
    flex: 1,
    width: "95%",
  },
  item: {
    flex: 1 / 2,
    height: 217,
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 5,
    // elevation: 10,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemImageContainer: {
    width: "100%",
    height: "80%",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  itemInfo: {
    display: "flex",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  itemRatings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemRating: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  itemRatingTotal: {
    fontSize: 10,
    color: "grey",
  },
  itemDifficulty: {
    fontSize: 12,
    fontWeight: "300",
  },
  backButtonText: {
    color: "#E3A444",
    fontSize: 22,
    fontWeight: "500",
  },
});
