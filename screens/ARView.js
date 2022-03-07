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
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../Themes/colors';

export default function ARView() {
    const [hasPermission, setHasPermission] = useState(null);
    const [view, setView] = useState(1);  //increment how we progress through tutorial

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
     * Unimplemented yet.
     * 
     * After each view change, renders the next view. For example, 
     * renders view 1 (Quokka saying "How can I help you?") on view
     * 1, followed by user response, then press of next view button 
     * will change view to view 2. Can also use setTimeout() to ren-
     * der views after certain amount of time passes.
     */
    const renderSwitch = () => {
        // if (view === 1) {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 200,
                }}
            >
                <Text
                    style={{
                        color: 'white'
                    }}
                >
                    Hi there! How can I help you?
                </Text>
            </View>
        );
        // }
    }

    return (
        <View styles={styles.container}>

            <Camera
                type={Camera.Constants.Type.back}
                style={{ height:700  }}
            >
                <Image
                    style={styles.quokkaImage}
                    source={require('../assets/Quokkas/dance2.png')}
                />

                {/*Add render switch*/}

                <View style={styles.textBubble}>
                    <Text style={styles.text}>
                        {
                            `Hi there! How can I help you?`
                        }
                    </Text>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textBubble: {
        position: 'absolute',
        top: 400,
        left: 50,
        backgroundColor: Colors.lightgray,
        borderRadius: 8,
        padding: 8,
    },
    text: {
        color: Colors.black,
        fontSize: 20,
    },
    quokkaImage: {

        width: 100,
        height: 100,
    }
})