import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';

import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();

const auth = getAuth();
let uid = null;
// Global event listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    // ...
  } else {
    uid = null;
    // User is signed out
    // ...
  }
});

export default function App() {
  const [user, setUser] = useState({}); // Use state to pass user object between components
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {uid === null ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {props => <SignInScreen {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn">
              {props => <SignInScreen {...props} setUser={setUser} />}
            </ Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
