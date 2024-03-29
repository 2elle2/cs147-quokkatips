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
import { Feather, Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import Colors from "../Themes/colors";
import List from "./Components/List";
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

const Item = (props) => {
  const navigation = useNavigation();
  let speedometer;
  let difficulty;
  if (props.app.ratingEase > 3.5) {
    speedometer = "speedometer-slow";
    difficulty = "Easy";
  } else if (props.app.ratingEase > 2) {
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

const CategoryCarrousel = ({ category, navigation, data, header }) => (
  <View style={styles.categoryContainer}>
    <View style={styles.categoryHeaders}>
      <Text style={styles.categoryName}>{category}</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("ViewAll", { header: header, apps: data });
        }}
      >
        <Text style={styles.viewAllButton}>View All</Text>
      </Pressable>
    </View>

    <FlatList
      horizontal
      data={data.slice(0, 5)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default function ExploreScreen(props) {
  // console.log(props, "ExploreScreen");
  const navigation = useNavigation();

  // console.log("props", props);
  // console.log("USER", props.user);

  return (
    // "Sort by..." picker
    // List of the user's guides
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.hamburgerIcon}
          onPress={() => props.toggleDrawer()}
        >
          <Ionicons name="ios-menu-outline" size={40} color="#E3A444" />
        </Pressable>
        <Text style={styles.categoryText}>Explore</Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("ExploreSearch", { apps: props.guides });
        }}
        style={styles.searchBarContainer}
      >
        <View style={styles.searchBar}>
          {/* search Icon */}
          <Feather
            name="search"
            size={20}
            color={Colors.darkgray}
            style={{ marginLeft: 1 }}
          />
          {/* Input field */}
          <Text style={styles.searchText}>Search guides...</Text>
        </View>
      </Pressable>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <CategoryCarrousel
          category="Recommended for You"
          header="Recommended"
          navigation={navigation}
          data={props.guides}
        />

        <CategoryCarrousel
          category="Popular in Communication"
          header={"Communication"}
          navigation={navigation}
          data={props.guides.filter(function (app) {
            return app.tags.includes("Communication");
          })}
        />

        {props.user.subjects?.map((tag, index) => (
          <CategoryCarrousel
            category={"Popular in " + tag}
            header={tag}
            navigation={navigation}
            key={index}
            data={props.guides.filter(function (app) {
              return app.tags.includes(tag);
            })}
          />
        ))}
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
    fontWeight: "500",
  },
  hamburgerIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
  },
  scrollContainer: {
    marginTop: 10,
  },
  searchBarContainer: {
    marginTop: 10,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchText: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
    color: Colors.gray,
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
    fontWeight: "600",
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
