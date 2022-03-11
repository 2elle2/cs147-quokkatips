import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import AppDetails from "./screens/AppDetails";
import WelcomeScreen from "./screens/WelcomeScreen";
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignUpScreenTwo from "./screens/SignUpScreenTwo";
import SignUpScreenThree from "./screens/SignUpScreenThree";
import SignUpScreenFour from "./screens/SignUpScreenFour";
import TutorialScreenOne from "./screens/TutorialScreenOne";
import TutorialScreenTwo from "./screens/TutorialScreenTwo";
import TutorialScreenThree from "./screens/TutorialScreenThree";
import TutorialScreenOneHome from "./screens/TutorialScreenOneHome";
import TutorialScreenTwoHome from "./screens/TutorialScreenTwoHome";
import TutorialScreenThreeHome from "./screens/TutorialScreenThreeHome";
import AboutScreen from "./screens/AboutScreen";

import ExploreScreen from "./screens/ExploreScreen";
import ExploreSearch from "./screens/ExploreSearch";
import ViewAll from "./screens/ViewAll";
import FeatureDetails from "./screens/FeatureDetails";
import ReviewDetails from "./screens/ReviewDetails";
import Chat from "./screens/Chat";
import CameraTutorial from "./screens/CameraTutorial";

import { LogBox } from "react-native";
import { AntDesign } from '@expo/vector-icons';

LogBox.ignoreAllLogs()

import Colors from "./Themes/colors";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { forVerticalIOS } from "@react-navigation/stack";

const Stack = createStackNavigator();
const quokkaAvatar = require('./assets/Quokkas/neutral-standing.png');
const quokka = {
  _id: 2,
  name: 'Quokka',
  avatar: quokkaAvatar,
}

export default function App() {
  const [user, setUser] = useState({}); // Use state to pass user object between components
  const [guides, setGuides] = useState([]);
  const [view, setView] = useState(1);
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hi there! How can I help?',
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'radio',
        keepIt: true,
        values: [
          {
            title: 'I need help sharing my screen',
            value: 'help_share',
          },
        ],
      },
      user: quokka,
    },
  ]);

  // console.log(messages, "App.js");

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const verticalAnimation = {
    gestureDirection: "vertical",
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };

  // console.log("USERSS IN APP JS", user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
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
          name="SignUpThree"
          component={SignUpScreenThree}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpFour"
          component={SignUpScreenFour}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TutorialOne"
          component={TutorialScreenOne}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TutorialTwo"
          component={TutorialScreenTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TutorialThree"
          component={TutorialScreenThree}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: forFade
          }}
        >
          {(props) => (
            <HomeScreen {...props}
              setUser={setUser}
              setGuides={setGuides}
              setView={setView}
              view={view}
              setMessages={setMessages}
              messages={messages}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="TutorialOneHome"
          component={TutorialScreenOneHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TutorialTwoHome"
          component={TutorialScreenTwoHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TutorialThreeHome"
          component={TutorialScreenThreeHome}
          options={{ headerShown: false }}
        />

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
            cardStyleInterpolator: forFade
          }}
        >
          {(props) => <ExploreSearch {...props} user={user} guides={guides} />}
        </Stack.Screen>

        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen name="FeatureDetails" component={FeatureDetails} />
        <Stack.Screen
          name="Camera Tutorial"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <CameraTutorial
              {...props}
              messages={messages}
              setMessages={setMessages}
              setView={setView}
              view={view}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Chat"
          options={{
            title: "Chat",
            headerShown: true,
            headerMode: 'screen',
            headerBackTitle: 'Back',
            headerTintColor: Colors.yellow,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "700",
              color: Colors.black,
            },
            // headerRight: () => (
            //   <Pressable onPress={() => navigation.navigate('ARView')}
            //   >
            //     <AntDesign name="caretdown" size={24} color={Colors.yellow} />
            //   </Pressable>
            // ),
            // ...TransitionPresets.ModalSlideFromBottomIOS
          }}
        >
          {(props) => <Chat {...props} setView={setView} messages={messages} setMessages={setMessages} />}
        </Stack.Screen>
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            gestureDirection: "vertical",
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
        </Stack.Screen>
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
