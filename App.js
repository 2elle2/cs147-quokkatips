import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import WelcomeScreen from './screens/WelcomeScreen';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignUpScreenTwo from './screens/SignUpScreenTwo';

import MyGuidesScreen from './screens/MyGuidesScreen';
import ExploreScreen from './screens/ExploreScreen';

import Colors from './Themes/colors';

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
        <Stack.Screen name="SignIn">
          {props => <SignInScreen {...props} setUser={setUser} />}
        </ Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => <HomeScreen {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="LogIn" 
          component={LogInScreen}
          options={{headerShown: false}} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{headerShown: false}} 
        />
        <Stack.Screen 
          name="SignUpTwo" 
          component={SignUpScreenTwo}
          options={{headerShown: false}} 
        />


        <Stack.Screen 
          name="MyGuides" 
          component={MyGuidesScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => {
                  // auth().signOut()
                  alert('TODO: implement log out')}
                }
                title="Log Out"
                color={Colors.yellow}
              />
            ),
          }} 
        />
        <Stack.Screen 
          name="Explore" 
          component={ExploreScreen}
          options={{
            
          }} 
        />

        

        
>>>>>>> draft
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
