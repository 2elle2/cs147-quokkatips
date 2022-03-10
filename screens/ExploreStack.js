import React from "react";

import RNPickerSelect from "react-native-picker-select";
import ExploreScreen from "./ExploreScreen";
import ViewAll from "./ViewAll";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

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

const Item = ({ title }) => (
  <View style={styles.item}>
    <View style={styles.itemImage}></View>
    <View style={styles.itemInfo}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemRatings}>
        <Text style={styles.itemRating}>4.3</Text>
        <Text style={styles.itemDifficulty}>Easy</Text>
      </View>
    </View>
  </View>
);

export default function ExploreStack({ user, guides }) {
  const renderItem = ({ item }) => <Item title={item.title} />;
  // console.log("PROPS", guides);

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen // THIS BLOCK DOES NOTHING BTW LOL :)))))) (gotta not use ExploreStack)
        name="ExploreScreen"
        options={{ headerShown: false }}
      >
        {(props) => <ExploreScreen {...props} user={user} guides={guides} />}
      </Stack.Screen>{" "}
      <Stack.Screen name="ViewAll" component={ViewAll} />
    </Stack.Navigator>
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
  },
  itemRating: {
    fontSize: 12,
  },
  itemDifficulty: {
    fontSize: 12,
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
