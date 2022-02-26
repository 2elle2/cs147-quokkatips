import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

import MyGuidesScreen from './MyGuidesScreen';
import ExploreScreen from './ExploreScreen';
import AskQuokkaScreen from './AskQuokkaScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function HomeScreen() {

    const getUserInfo = async (user) => {
        const docRef = doc(db, 'users', user.uid)
        let docSnap = await getDoc(docRef)
        if(docSnap.exists) {
            console.log(docSnap.data()) //can get user data and set in state
        }
    }

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            // User is signed in, see docs for list of available properties
            // https://firebase.google.com/docs/refernce/js/firebase.User
            
            getUserInfo(user);
        } else {
            // No user is signed in.
        }
    }, []) //pass in empty array so it will only run once when loading Home Screen

    // Bottom tab navigator
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            // Make 'My Guides' the initial tab
            initialRouteName='My Guides'

            // Customize icons and appearance
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let icon;
                    switch(route.name) {
                        case 'My Guides':
                            icon = focused? 'book' : 'book-outline';
                            break;
                        case 'Explore':
                            icon = focused ? 'compass' : 'compass-outline';
                            break;
                        case 'Ask Quokka':
                            icon = focused? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                            break;
                    }
                return <Ionicons name={icon} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#E3A444', // App theme color
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name='Explore' component={ExploreScreen} />
          <Tab.Screen name='My Guides' component={MyGuidesScreen} />
          <Tab.Screen name='Ask Quokka' component={AskQuokkaScreen} />
        </Tab.Navigator>
    );
}