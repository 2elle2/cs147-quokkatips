import { Text, View } from "react-native";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

import MyGuidesScreen from "./MyGuidesScreen";
import AskQuokkaScreen from "./AskQuokkaScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../Themes/colors";
import ExploreScreen from "./ExploreScreen";

export default function HomeScreen(props) {
  const [user, setUser] = useState({}); // Use state to pass user object between components
  const [guides, setGuides] = useState([]);
  // console.log(props, "homescreen");
  /**
   * Helper Function: getGuides
   *
   * Callback function for useEffect. Retrieves all documents in the "guides" collection.
   * The array of guides is sent to the parent component via callback function.
   */
  const getGuides = async () => {
    const querySnapshot = await getDocs(collection(db, "guides"));
    const guides = querySnapshot.docs.map((doc) => {
      let guide = doc.data();
      guide.id = doc.id; // Set the id prop on the guide object
      return guide;
    });
    // console.log(guides, "HomeScreen.js");
    setGuides(guides);
    props.setGuides(guides);
  };

  const getUserInfo = async (user) => {
    const docRef = doc(db, "users", user.uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      let user = docSnap.data();
      user.id = docSnap.id; // Add the id prop to the user object
      console.log(user, "HomeScreen.js"); // Can get user data and set in state
      setUser(user);
      // console.log(user, "HomeScreen.js"); // Can get user data and set in state
      props.setUser(user); // Saves user object in parent state
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // User is signed in, see docs for list of available properties
      // https://firebase.google.com/docs/refernce/js/firebase.User

      // console.log(user);
      getUserInfo(user);
      getGuides();
    } else {
      // No user is signed in - add redirect here?
    }
  }, []); //pass in empty array so it will only run once when loading Home Screen

  // Bottom tab navigator
  const Tab = createBottomTabNavigator();
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <Tab.Navigator
      // Make 'My Guides' the initial tab
      initialRouteName="My Guides"
      // Customize icons and appearance
      screenOptions={({ route }) => ({
        // swipeEnabled: false,
        tabBarStyle: { height: 84 },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          switch (route.name) {
            case "My Guides":
              icon = focused ? "book" : "book-outline";
              break;
            case "Explore":
              icon = focused ? "compass" : "compass-outline";
              break;
            case "Ask Quokka":
              icon = focused
                ? "chatbubble-ellipses"
                : "chatbubble-ellipses-outline";
              break;
          }
          return <Ionicons name={icon} size={28} color={color} />;
        },
        tabBarActiveTintColor: Colors.yellow, // App theme color
        tabBarInactiveTintColor: Colors.darkgray,
      })}
    >
      <Tab.Screen
        name="Explore"
        options={{ headerShown: false, cardStyleInterpolator: forFade }}
      >
        {(props) => <ExploreScreen {...props} user={user} guides={guides} />}
      </Tab.Screen>
      <Tab.Screen
        name="My Guides"
        options={{ headerShown: false, cardStyleInterpolator: forFade }}
      >
        {(props) => <MyGuidesScreen {...props} user={user} guides={guides} />}
      </Tab.Screen>

      <Tab.Screen 
        name="Ask Quokka" 
        options={{ headerShown: false, cardStyleInterpolator: forFade }}
        component={AskQuokkaScreen} >
      </Tab.Screen>
    </Tab.Navigator>
  );
}
