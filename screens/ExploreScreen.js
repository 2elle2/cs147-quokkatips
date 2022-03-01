import React from "react";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { FirebaseError } from "firebase/app";

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
        navigation.navigate("AppDetails", { appName: props.title });
      }}
    >
      <View style={styles.item}>
        <View style={styles.itemImage}></View>
        <View style={styles.itemInfo}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.itemRatings}>
            <FontAwesome name="star" size={10} color="black" />
            <Text style={styles.itemRating}>4.3</Text>
            <Text style={styles.itemRatingTotal}>/ 5</Text>

            <Text style={styles.itemDifficulty}>Easy</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const renderItem = ({ item }) => <Item title={item.title} />;

const CategoryCarrousel = ({ category, navigation }) => (
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
      data={DATA}
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
    const guides = querySnapshot.docs.map(doc => {
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
      <ScrollView>
        <RNPickerSelect
          style={{ padding: 10 }}
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: "Sort by...", value: null, color: "gray" }}
          items={[
            { label: "Recenty Added", value: "Recently Added" },
            { label: "Most Used", value: "Most Used" },
            { label: "Alphabetical", value: "Alphabetical" },
          ]}
          style={pickerSelectStyles}
        />
        <CategoryCarrousel category="Recommended" navigation={navigation} />
        <CategoryCarrousel category="Mathematics" navigation={navigation} />
        <CategoryCarrousel category="Trending" navigation={navigation} />
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
    fontSize: 14,
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
  itemImage: {
    backgroundColor: "#E3A444",
    width: "100%",
    height: "75%",
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
  },
  itemRatingTotal: {
    fontSize: 10,
    color: "grey",
  },
  itemDifficulty: {
    fontSize: 12,
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
