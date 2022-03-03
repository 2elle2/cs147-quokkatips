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
import GridList from "./Components/GridList";
import SearchBar from "./Components/SearchBar";
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
  let speedometer;
  let difficulty;
  if (props.app.rating > 4) {
    speedometer = "speedometer-slow";
    difficulty = "Easy";
  } else if (props.app.rating > 2) {
    speedometer = "speedometer-medium";
    difficulty = "Medium";
  } else {
    speedometer = "speedometer";
    difficulty = "Hard";
  }
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
              name={speedometer}
              size={12}
              color="black"
            />

            <Text style={styles.itemDifficulty}> {difficulty}</Text>
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
          navigation.navigate("ViewAll", { category: category, apps: data });
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

export default function ExploreSearch({ route, user, guides }) {
  const navigation = useNavigation();
  const [firestore_data, setData] = useState([]); // Save list of guides from firestore
  // in local state
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    // "Sort by..." picker
    // List of the user's guides
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            placeHolderText="Search apps..."
          />
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </Pressable>
      </View>
      <GridList
        searchPhrase={searchPhrase}
        data={guides}
        setClicked={setClicked}
      />
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
  headerText: {
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
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
    alignItems: "center",
  },
  listContainer: {
    marginTop: 10,
  },
  cancelButton: {
    color: Colors.yellow,
    fontSize: 18,
    paddingTop: 8,
    marginLeft: -14,
  },
  searchText: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
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
