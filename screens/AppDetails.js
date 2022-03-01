import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppDetailsInfo from "./AppDetailsInfo";
import AppDetailsFeatures from "./AppDetailsFeatures";

export default function AppDetails({ route }) {
  const { appName } = route.params;
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  return (
    // Screen header
    // Top tab navigator
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
  backButtonText: {
    color: "#E3A444",
    fontSize: 20,
    fontWeight: "500",
  },
});
