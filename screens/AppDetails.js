import React from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppDetailsInfo from "./AppDetailsInfo";
import AppDetailsFeatures from "./AppDetailsFeatures";

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


export default function AppDetails({ route }) {
  const { appName } = route.params;
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  return (
    // "Sort by..." picker
    // List of the user's guides
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#E3A444" />
          <Text style={styles.backButtonText}> Back</Text>
        </Pressable>
        <Text style={styles.categoryText}>App Details</Text>
      </View>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#E3A444',
          tabBarInactiveTintColor: '#E3A444',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: '#F2F2F2' },
          tabBarIndicatorStyle: { backgroundColor: '#E3A444'}
        }}
      >
        <Tab.Screen
          name="INFO"
          children={()=><AppDetailsInfo appName={appName}/>}
          options={{
            tabBarLabel: 'INFO',
            tabBarIcon: ({ focused, color }) =>
              <Ionicons name={focused? "information-circle" : "information-circle-outline"} size={25} color={color} />
          }}
        />
        <Tab.Screen
          name="FEATURES"
          children={()=><AppDetailsFeatures appName={appName}/>}
          options={{
            tabBarLabel: 'FEATURES',
            tabBarIcon: ({ focused, color }) =>
              <Ionicons name={focused? "list" : "list-outline"} size={25} color={color} />
          }}
        />
      </Tab.Navigator>
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
    width: "100%",
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
  container: {
    flex: 1,
    width: "100%",
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
  itemImage: {
    backgroundColor: "#E3A444",
    width: "100%",
    height: "80%",
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
  backButtonText: {
    color: "#E3A444",
    fontSize: 20,
    fontWeight: "500",
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
