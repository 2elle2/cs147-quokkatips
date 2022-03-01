import React from "react";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Themes/colors";

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

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

const Item = (props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("AppDetails", { app: props.app });
      }}
    >
      <View style={styles.item}>
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
      </View>
    </Pressable>
  );
};

const renderItem = ({ item }) => <Item app={item} />;

const CategoryCarrousel = ({ category, navigation, data }) => (
  <View style={styles.categoryContainer}>
    <View style={styles.categoryHeaders}>
      <Text style={styles.categoryName}>{category}</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("ViewAll", { category: category });
        }}
      >
        <Text style={styles.viewAllButton}>View All</Text>
      </Pressable>
    </View>

    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default function ExploreScreen() {
  const navigation = useNavigation();
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

  return (
    // "Sort by..." picker
    // List of the user's guides
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <Ionicons name="ios-menu-outline" size={40} color="#E3A444" />
        </Pressable>
        <Text style={styles.categoryText}>Explore</Text>
      </View>
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={22} color={Colors.gray} />
        <Text style={styles.searchText}>Search apps...</Text>
      </View>
      <ScrollView>
        <CategoryCarrousel
          category="Recommended"
          navigation={navigation}
          data={firestore_data}
        />
        <CategoryCarrousel
          category="Mathematics"
          navigation={navigation}
          data={firestore_data}
        />
        <CategoryCarrousel
          category="Trending"
          navigation={navigation}
          data={firestore_data}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 300,
    backgroundColor: "white",
    //alignItems: "center",
  },
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
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: Colors.gray,
    width: "90%",
    height: 39,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  searchText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    color: "gray",
  },
  item: {
    height: "85%",
    width: 130,
    backgroundColor: "white",
    //marginVertical: 5,

    borderRadius: 5,
    // elevation: 10,
    marginHorizontal: 5,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  shadowProp: {
    shadowColor: "gray",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryContainer: {
    alignSelf: "center",
    height: 220,
    width: "92%",
  },
  categoryHeaders: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "15%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "400",
  },
  itemImageContainer: {
    width: "100%",
    height: "75%",
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
  viewAllButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E3A444",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
    color: "black",
  },
});
