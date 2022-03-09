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
import { useNavigation, useIsFocused } from "@react-navigation/native";

const quokkaAvatar = require('../assets/Quokkas/neutral-standing.png');
const quokka = {
    _id: 2,
    name: 'Quokka',
    avatar: quokkaAvatar,
}
export default function ARView(props) {
    useIsFocused();
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [quokkaMsg, setQuokkaMsg] = useState('');


    /**
     * Check to see if the user has given permission to use their camera.
     */
    useEffect(() => {
        console.log(props);
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

    /**
     * After each view change, renders the next view. For example, 
     * renders view 1 (Quokka saying "How can I help you?") on view
     * 1, followed by user response, then press of next view button 
     * will change view to view 2. Can also use setTimeout() to ren-
     * der views after certain amount of time passes.
     */
    const renderSwitch = () => {
        console.log(props.view);
        switch (props.view) {
            case 1:
                // Need to check quokkaMsg so we don't set off an infinite loop
                if (quokkaMsg !== `Hi there! How can I help?`) {
                    setQuokkaMsg(`Hi there! How can I help?`);
                }
                return (
                    <>
                        <View style={styles.quokkaText}>
                            <Image
                                style={styles.quokkaImage}
                                source={require('../assets/Quokkas/neutral-standing.png')}
                            />
                            <View style={styles.textBubble1}>
                                <Text style={styles.text}>
                                    {quokkaMsg}
                                </Text>
                            </View>
                        </View>
                    </>
                );
            case 2:
                // <<<<<<< HEAD
                //                 if (quokkaMsg !== "Once you have Zoom open, \nclick the green \"share \nscreen\" button.") {
                //                     setQuokkaMsg("Once you have Zoom open, \nclick the green \"share \nscreen\" button.");
                // =======
                //                 if (quokkaMsg !== "Once you have Zoom open, click the green 'Share Screen' button.") {
                //                     setQuokkaMsg("Once you have Zoom open, click the green 'Share Screen' button.");
                //                 }
                //                 return (
                //                     <View></View>
                //                 );
                //             case 3:
                //                 if (quokkaMsg !== "Click on the screen or app you want to share. Finish by clicking the blue 'Share' button.") {
                //                     setQuokkaMsg("Click on the screen or app you want to share. Finish by clicking the blue 'Share' button.");
                //                 }
                //                 return (
                //                     <View></View>
                //                 );
                //             case 4:
                //                 if (quokkaMsg !== "Great job! You set up screen sharing successfully.") {
                //                     setQuokkaMsg("Great job! You set up screen sharing successfully.");
                //                 }
                //                 return (
                //                     <View></View>
                //                 );
                //             case 5:
                //                 if (quokkaMsg !== "Once you have Zoom open, click the circular 'Record' button") {
                //                     setQuokkaMsg("Once you have Zoom open, click the circular 'Record' button");
                //                 }
                //                 return (
                //                     <View></View>
                //                 );
                //             case 6:
                //                 if (quokkaMsg !== "Now, select your preferred storage option.") {
                //                     setQuokkaMsg("Now, select your preferred storage option.");
                //                 }
                //                 return (
                //                     <View></View>
                //                 );
                //             case 7:
                //                 if (quokkaMsg !== "Great job! You set up screen recording successfully.") {
                //                     setQuokkaMsg("Great job! You set up screen recording successfully.");
                //                 }
                if (quokkaMsg !== "Once you have Zoom open, \nclick the green \"share \nscreen\" button.") {
                    setQuokkaMsg("Once you have Zoom open, \nclick the green \"share \nscreen\" button.");
                }
                return (
                    <>
                        <TouchableOpacity onPress={() => props.setView(3)}>
                            <Image style={styles.arrowRight} source={require('../assets/Arrows/arrow-t.png')} />
                        </TouchableOpacity>
                        <View style={styles.quokkaText}>
                            <Image
                                style={styles.quokkaImage}
                                source={require('../assets/Quokkas/neutral-standing.png')}
                            />
                            <View style={styles.textBubble2}>
                                <Text style={styles.text}>
                                    {quokkaMsg}
                                </Text>
                            </View>
                        </View>
                    </>
                );
            case 3:
                if (quokkaMsg !== "Click on the screen or app \nyou want to share. Finally, \nclick the blue \"share\" button.") {
                    setQuokkaMsg("Click on the screen or app \nyou want to share. Finally, \nclick the blue \"share\" button.");
                    // props.setMessages()
                }
                return (
                    <>
                        <TouchableOpacity onPress={() => props.setView(4)}>
                            <Image style={styles.arrowUp} source={require('../assets/Arrows/arrow-t.png')} />
                        </TouchableOpacity>
                        <View style={styles.quokkaText}>
                            <Image
                                style={styles.quokkaImage}
                                source={require('../assets/Quokkas/neutral-standing.png')}
                            />
                            <View style={styles.textBubble2}>
                                <Text style={styles.text}>
                                    {quokkaMsg}
                                </Text>
                            </View>
                        </View>
                    </>
                );
            case 4:
                if (quokkaMsg !== "Great job! You set up \nscreen sharing \nsuccessfully! 👍") {
                    setQuokkaMsg("Great job! You set up \nscreen sharing \nsuccessfully! 👍");
                    props.setMessages([
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
                                    {
                                        title: 'I need help recording my screen',
                                        value: 'help_recording',
                                    },
                                ],
                            },
                            user: quokka,
                        },
                    ]);
                    setTimeout(() => props.setView(1), 3000)
                }
                return (
                    <>
                        <View style={styles.quokkaText}>
                            <Image
                                style={styles.quokkaImage}
                                source={require('../assets/Quokkas/dance2.png')}
                            />
                            <View style={styles.textBubble2}>
                                <Text style={styles.text}>
                                    {quokkaMsg}
                                </Text>
                            </View>
                        </View>
                    </>
                );
        }
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

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Chat", {});
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
    textBubble2: {
        // width: 240,
        alignItems: "center",
        backgroundColor: Colors.lightgray,
        borderRadius: 8,
        padding: 8,
        height: 76,

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


    arrowRight: {
        width: 100,
        height: 100,
        left: 40,
        top: -80
    },

    arrowUp: {
        width: 100,
        height: 100,
        left: 240,
        top: -64,
        transform: [{ rotate: '250deg' }]
    }


})