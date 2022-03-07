import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import AppDetails from "./screens/AppDetails";
import WelcomeScreen from "./screens/WelcomeScreen";
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignUpScreenTwo from "./screens/SignUpScreenTwo";

import ExploreScreen from "./screens/ExploreScreen";
import ExploreSearch from "./screens/ExploreSearch";
import ViewAll from "./screens/ViewAll";
import FeatureDetails from "./screens/FeatureDetails";
import ReviewDetails from "./screens/ReviewDetails";
import Chat from "./screens/Chat";

import { LogBox } from "react-native";

LogBox.ignoreAllLogs()

import Colors from "./Themes/colors";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { forVerticalIOS } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({}); // Use state to pass user object between components
  const [guides, setGuides] = useState([]);
  console.log(user, "App.js");

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpTwo"
          component={SignUpScreenTwo}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          options={{ 
            headerShown: false, 
            gestureEnabled: false,
            cardStyleInterpolator: forFade }}
        >
          {(props) => (
            <HomeScreen {...props} setUser={setUser} setGuides={setGuides} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ReviewDetails"
          component={ReviewDetails}
          option={{ headerShown: false }}
        />
        <Stack.Screen name="AppDetails" options={{ headerShown: false }}>
          {(props) => <AppDetails {...props} user={user} />}
        </Stack.Screen>

        {/* <Stack.Screen // THIS BLOCK DOES NOTHING BTW LOL :)))))) (gotta not use ExploreStack)
          name="ExploreStack" 
          options={{ 
            headerShown: false,
            gestureEnabled: false,
            }}>
          {(props) => <ExploreStack {...props} user={user} guides={guides} />}
        </Stack.Screen> */}

        <Stack.Screen 
          name="ExploreSearch"
          options={{ 
            headerShown: false, 
            cardStyleInterpolator: forFade }}
        >
          {(props) => <ExploreSearch {...props} user={user} guides={guides} />}
        </Stack.Screen>

        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen name="FeatureDetails" component={FeatureDetails} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
