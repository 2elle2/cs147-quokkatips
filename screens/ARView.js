/**
 * Template and guidance from: 
 * https://docs.expo.dev/versions/latest/sdk/camera/
 * https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/
 * 
 */

/**
 * TO INSTALL EXPO CAMERA (IMPORTANT!!):
 * run 'expo install expo-camera --npm'
 * If it installs with yarn instead of npm you'll
 * have to re-clone the entire repository
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Pressable, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../Themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { Chat } from './Chat';
import { useNavigation } from "@react-navigation/native";

export default function ARView() {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [view, setView] = useState(1);  // increment how we progress through tutorial
    const [messages, setMessages] = useState([{
        "type": 1,
        "text": "Hello! Good Morning!"
    }]);


    /**
     * Check to see if the user has given permission to use their camera.
     */
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Looks like something went wrong!</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const changeView = () => {
        console.log(view);
        setView(view + 1);
    };

    /**
     * After each view change, renders the next view. For example, 
     * renders view 1 (Quokka saying "How can I help you?") on view
     * 1, followed by user response, then press of next view button 
     * will change view to view 2. Can also use setTimeout() to ren-
     * der views after certain amount of time passes.
     */
    const renderSwitch = () => {
        // if (view === 1) {
        return (
            <View></View>
        );
        // }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.hamburgerIcon}>
                    <Ionicons name="ios-menu-outline" size={40} color="#E3A444" />
                </Pressable>
                <Text style={styles.headerText}>Ask Quokka</Text>
            </View>

            <Camera
                type={Camera.Constants.Type.back}
                style={{ height: 700 }}
            >
                <View style={styles.cameraViewArea}></View>

                {renderSwitch()}
                
                <View style={styles.quokkaText}>
                    <Image
                        style={styles.quokkaImage}
                        source={require('../assets/Quokkas/neutral-standing.png')}
                    />
                    <View style={styles.textBubble1}>
                        <Text style={styles.text}>
                            {`Hi there! How can I help?`}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Chat", {
                            // messages: messages,
                            // setMessages: setMessages,
                        });
                    }}
                    style={styles.chat}
                >
                    <Ionicons name="chatbubbles" size={32} color={Colors.white} />
                    <Text style={styles.chatText}>Chat</Text>
                </TouchableOpacity>

            </Camera>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: 30,
        marginBottom: 6,
        alignSelf: "center",
    },
    headerText: {
        fontSize: 22,
        fontWeight: "700",
    },
    hamburgerIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        left: 0,
    },

    cameraViewArea: {
        flex: 6,
        // backgroundColor: "red",  //for testing purposes
    },

    quokkaText: {
        flexDirection: "row",
        flex: 1.5,
    },

    textBubble1: {
        // width: 240,
        alignItems: "center",
        backgroundColor: Colors.lightgray,
        borderRadius: 8,
        padding: 8,
        height: 36,
    },
    text: {
        color: Colors.black,
        fontSize: 16,
    },
    quokkaImage: {
        width: 100,
        height: 100,
        // position: "absolute",
        // top: 44,
        // left: 16,
    },

    chat: {
        position: "absolute",
        bottom: 44,
        right: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.yellow,
        width: 64,
        height: 64,
        borderRadius: 64 / 2,
    },
    chatText: {
        color: Colors.white,
        fontSize: 16,
        paddingBottom: 2,
    },



})