import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import React from 'react';
import Colors from '../Themes/colors';


export default function TutorialScreenOne() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Tutorial</Text>
            </View>

            <Image
                style={styles.tutorialImage}
                source={require('../assets/Quokkas/yes-quokka.png')}
            />
 
            <Text style={styles.modifyText}>Explore software based on recommendations, trending, and more</Text>

            <TouchableOpacity 
                style={styles.nextButton} 
                onPress={() => navigation.navigate("TutorialScreenTwo")}
            >
                <Text style={styles.nextText}>Next </Text>
                <FontAwesome5 name="chevron-right" size={16} color={Colors.white} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 300,
        backgroundColor: "white",
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
    backIcon: {
        alignSelf: 'flex-start',
        position: 'absolute',
        left: 24,
        top: 60,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "700",
      },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.black,
        width: '80%',
        height: 50,
        margin: 10,
        borderRadius: 14,
        shadowColor: Colors.gray,
        shadowOffset: { width: -1, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    nextText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
    },
    modifyText: {
        fontSize: 14,
        color: Colors.black,
    },
    tutorialImage: {
        width: 100,
        height: 100,
    },
    
})