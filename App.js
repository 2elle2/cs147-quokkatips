import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import WelcomeScreen from './screens/WelcomeScreen';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignUpScreenTwo from './screens/SignUpScreenTwo';

import MyGuidesScreen from './screens/MyGuidesScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

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
