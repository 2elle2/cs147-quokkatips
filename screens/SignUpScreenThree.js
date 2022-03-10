import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import React from 'react';
import Colors from '../Themes/colors';

const GRADE_LEVELS = [
    { id: 1, name: 'Kindergarten', checked: false }, 
    { id: 2, name: 'Elementary School', checked: false },
    { id: 3, name: 'Middle School', checked: false },
    { id: 4, name: 'High School', checked: false },
    { id: 5, name: 'College - Undergraduate', checked: false },
    { id: 6, name: 'College - Graduate', checked: false },
];

// Create your forceUpdate hook to rerender checkboxes
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function SignUpScreenThree() {
    const navigation = useNavigation();
    const forceUpdate = useForceUpdate();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-circle-outline" size={48} color={Colors.black} />
            </TouchableOpacity>

            <Text style={styles.headerText}>What grades do you teach?</Text>

            <View style={styles.checkboxList}>
            {GRADE_LEVELS.map(gradeLevel => {
                return (
                    <View style={styles.checkboxListItem}>
                        <Checkbox.Android
                            status={gradeLevel.checked ? 'checked' : 'unchecked'}
                            color={'#E3A444'}
                            onPress={() => {
                                gradeLevel.checked = !gradeLevel.checked;
                                forceUpdate();
                            }}
                        />
                        <Text style={styles.gradeLevelText}>{gradeLevel.name}</Text>
                    </View>
                );
            })}
            </View>
 
            <TouchableOpacity 
                style={styles.nextButton} 
                onPress={() => navigation.navigate("SignUpFour")}
            >
                <Text style={styles.nextText}>Next </Text>
                <FontAwesome5 name="chevron-right" size={16} color={Colors.white} />
            </TouchableOpacity>

            <Text style={styles.modifyText}>You can modify these selections later</Text>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.lightgray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        alignSelf: 'flex-start',
        position: 'absolute',
        left: 24,
        top: 60,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 40,
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
    checkboxListItem: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: 'flex-start',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    gradeLevelText: {
        fontSize: 20,
        color: 'black',
    },
    checkboxList: {
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 10,
        width: '80%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    }
})