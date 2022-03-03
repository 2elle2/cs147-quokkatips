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

// Forces the component to rerender
function useForceUpdate(){
  const [value, setValue] = React.useState(0); // Integer state
  return () => setValue(value => value + 1); // Update the state to force render
}

export default function AppDetails(props) {
  const { app } = props.route.params;
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  const user = props.user; // The currently logged in user
  const rerenderParentCallback = useForceUpdate(); // Called when the child updates

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
          tabBarIndicatorStyle: { backgroundColor: '#E3A444'},
          swipeEnabled: user.guides.includes(app.id)? true: false // Disable swiping when features are locked
        }}
      >
        <Tab.Screen
          name="INFO"
          children={()=><AppDetailsInfo app={app} user={user} parentCallback={rerenderParentCallback}/>}
          options={{
            tabBarLabel: 'INFO',
            tabBarIcon: ({ focused, color }) =>
              <Ionicons name={focused? "information-circle" : "information-circle-outline"} size={25} color={color} />
          }}
        />

        <Tab.Screen
          name="FEATURES"
          children={()=><AppDetailsFeatures app={app} user={user} parentCallback={rerenderParentCallback}/>}
          options={user.guides.includes(app.id)? 
          { // Features are unlocked
            tabBarLabel: 'FEATURES',
            tabBarIcon: ({ focused, color }) =>
              <Ionicons name={focused? "list" : "list-outline"} size={25} color={color} />
          } :
          { // Features are locked
            tabBarLabel: 'Add to Guides to see specific features!',
          }}

          // Disable pressing the tab when features are locked
          listeners={!user.guides.includes(app.id)? {
            tabPress: e => e.preventDefault(),
          } : {}}
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
