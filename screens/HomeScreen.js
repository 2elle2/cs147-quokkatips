import React from "react";

import {
  Text,
  View,
  Button,
  Animated,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

import MyGuidesScreen from "./MyGuidesScreen";
import AskQuokkaScreen from "./AskQuokkaScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../Themes/colors";
import ExploreScreen from "./ExploreScreen";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

// Hard-coded drawer width
const DRAWER_WIDTH = 300;

// MODAL OVERLAY: Remove from my guides
const RemoveModal = (props) => {
  const parent = props.parent;
  const user = props.parent.props.user;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={parent.state.showRemoveAlert}
      onRequestClose={() => {
        parent.setState({ showRemoveAlert: false });
      }}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => {
          parent.setState({ showRemoveAlert: false });
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            {/* ADD THIS CLOSE BUTTON */}
            <TouchableOpacity
              onPress={() => {
                parent.setState({ showRemoveAlert: false });
              }}
              style={{
                position: "absolute",
                right: 20,
                top: 20,
              }}
            >
              <AntDesign name="closecircleo" size={30} color={Colors.black} />
            </TouchableOpacity>
            {/* CLOSE BUTTON ENDS */}
            <Text style={styles.modalTitle}>
              Are you sure you want to log out?
            </Text>
            {/* <Text style={styles.modalMessage}>
              You will be logged out of your account, but can always log back in
              later.
            </Text> */}
            <TouchableOpacity
              style={[
                {
                  backgroundColor: "white",
                  borderColor: "#D0101066",
                  borderWidth: 1,
                },
                styles.modalButton,
              ]}
              onPress={async () => {
                parent.setState({ showRemoveAlert: false }); // Hide the modal window
                const auth = getAuth();
                await auth.signOut();
                props.navigation.navigate("Welcome");
              }}
            >
              <Text style={styles.modalButtonTextRemove}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: Colors.yellow,
                },
                styles.modalButton,
              ]}
              onPress={() => {
                // When "No, keep this app" is pressed
                parent.setState({ showRemoveAlert: false }); // Hide the modal window
              }}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

// Bottom tab navigator
const Tab = createBottomTabNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function (props) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  return <HomeScreen {...props} navigation={navigation} />;
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setUser = props.setUser;
    this.setGuides = props.setGuides;
    this.state = {
      showRemoveAlert: false, // Control visibility of modal windows
      user: {},
      guides: [],
    };
  }

  /**
   * Helper Function: getGuides
   *
   * Callback function for useEffect. Retrieves all documents in the "guides" collection.
   * The array of guides is sent to the parent component via callback function.
   */
  getGuides = async () => {
    const querySnapshot = await getDocs(collection(db, "guides"));
    const guides = querySnapshot.docs.map((doc) => {
      let guide = doc.data();
      guide.id = doc.id; // Set the id prop on the guide object
      return guide;
    });
    // console.log("GUIDES SUCCESSFULLY PULLED");
    this.setState({ guides: guides });
    this.setGuides(guides);
  };

  getUserInfo = async (user) => {
    const docRef = doc(db, "users", user.uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      let user = docSnap.data();
      user.id = docSnap.id; // Add the id prop to the user object
      // console.log(user, "HomeScreen.js"); // Can get user data and set in state
      this.setUser(user); // Saves user object in parent state

      this.setState({ user: user });
      // console.log("STATEE", this.state);
      // console.log(user, "HomeScreen.js"); // Can get user data and set in state
    }
  };

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // User is signed in, see docs for list of available properties
      // https://firebase.google.com/docs/refernce/js/firebase.User

      // console.log("priinting user", user);
      this.getUserInfo(user);
      this.getGuides();
    } else {
      // No user is signed in - add redirect here?
    }
  } //pass in empty array so it will only run once when loading Home Screen

  animation = new Animated.Value(0);
  slide = true;

  showSlidingDrawer = () => {
    // console.log("drawer clicked");
    if (this.slide) {
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        this.slide = false;
      });
    } else {
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        this.slide = true;
      });
    }
  };

  interpolate = this.animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0],
  });

  render() {
    const { view, setView, setMessages, navigation, messages } = this.props;

    // Count the total number of feature updates
    let unreadCount = 0;
    for (const [, features] of Object.entries(
      this.state.user.unread ? this.state.user.unread : {}
    )) {
      unreadCount += features.length;
    }

    return (
      <View style={{ flex: 1 }}>
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
            {(props) => (
              <ExploreScreen
                {...props}
                user={this.state.user}
                guides={this.state.guides}
                toggleDrawer={this.showSlidingDrawer}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="My Guides"
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
              tabBarBadge: unreadCount ? unreadCount : null,
              tabBarBadgeStyle: { backgroundColor: "#201947" },
            }}
          >
            {(props) => (
              <MyGuidesScreen
                {...props}
                user={this.state.user}
                guides={this.state.guides}
                toggleDrawer={this.showSlidingDrawer}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Ask Quokka"
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <AskQuokkaScreen
                {...props}
                messages={messages}
                setMessages={setMessages}
                setView={setView}
                view={view}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
        <RemoveModal parent={this} navigation={navigation} />

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawerRoot,
            { transform: [{ translateX: this.interpolate }] },
          ]}
        >
          <View style={styles.mainDrawer}>
            <View style={styles.userInfoContainer}>
              <Image
                style={styles.userPicture}
                source={{ uri: this.state.user.picture }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginLeft: 10,
                  color: "white",
                }}
              >
                {this.state.user.name}
              </Text>
            </View>
            {/* <Text>Stuff</Text>
            <Button title="Close menu" onPress={this.showSlidingDrawer} /> */}
            <View style={styles.drawerLinksContainer}>
              <Pressable onPress={() => 
                Alert.alert(
                  "Not yet implemented",
                  "\"Edit Profile\" has not yet been implemented. Check back later!",
                  [{ text: "OK", onPress: () => {} }]
                )
              }>
                <Text style={styles.drawerLink}>Edit Profile</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("AboutScreen")}>
                <Text style={styles.drawerLink}>About QuokkaTips</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("TutorialOneHome")}>
                <Text style={styles.drawerLink}>QuokkaTips Tutorial</Text>
              </Pressable>
              <Pressable
                style={styles.drawerLink}
                onPress={async () => {
                  this.setState({ showRemoveAlert: true });
                }}
              >
                <Text style={styles.removeText}>Logout</Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={styles.outSideDrawer}
            onPress={this.showSlidingDrawer}
          ></Pressable>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // DRAWER STYLING
  drawerRoot: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    left: -35,
    bottom: 0,
    top: 0,
    width: 502,
  },

  mainDrawer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: 290,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  userInfoContainer: {
    height: "15%",
    width: 290,
    backgroundColor: Colors.yellow,
    paddingLeft: 35,
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerLinksContainer: {
    width: "100%",
    height: "850%",
    backgroundColor: "white",
    paddingLeft: 35,
    paddingTop: 15,
  },
  drawerLink: {
    fontSize: 20,
    fontWeight: "400",
    margin: 20,
  },
  outSideDrawer: {
    height: "100%",
    width: 150,
  },
  removeButton: {
    marginLeft: 15,
    marginTop: 5,
    alignItems: "center",
    alignSelf: "baseline",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E3A444",
    shadowColor: "black",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addText: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
  },
  removeText: {
    color: "#E3A444",
    fontSize: 22,
    fontWeight: "400",
  },
  itemImage: {
    marginRight: 10,
    width: 200,
    height: "100%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  itemReview: {
    flex: 1,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#E3E3E3",
    borderRadius: 20,
    padding: 15,
    width: 300,
    height: "90%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontWeight: "500",
  },
  modalView: {
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: "10%",
    marginVertical: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 36,
    paddingTop: 60,
    paddingBottom: 36,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    padding: 10,
    marginVertical: 5,
    width: 250,
    shadowColor: "black",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  modalButtonTextRemove: {
    color: "#D01010c8",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  modalMessage: {
    marginBottom: 10,
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  userPicture: {
    borderRadius: 25,
    width: 50,
    height: 50,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    backgroundColor: "#E3A444",
  },
});
