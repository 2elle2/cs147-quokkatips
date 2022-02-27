import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../Themes/colors';


export default function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: 240,
                height: 240,
                borderRadius: 240/2,
                backgroundColor: Colors.yellow,
                position: 'absolute',
                left: -100,
                top: -60,
            }}/>
            <Image style={styles.quokkaImage} source={require('../assets/Quokkas/yes-quokka.png')}/>
            <Text style={styles.welcomeText}>Welcome to QuokkaTips!</Text>
            <View style={styles.taglineView}>
                <Text style={styles.taglineText}>
                    Your empathetic classroom software advisor
                </Text>
            </View>

            <TouchableOpacity 
                style={styles.getStartedButton} 
                onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    quokkaImage: {
        width: 280,
        height: 280,
    },

    welcomeText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.black
    },
    taglineText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: Colors.darkgray,
        textAlign: 'center',
    },
    taglineView: {
        alignItems: 'center',
        width: '70%',
        marginTop: 8,
        marginBottom: 8,
    },
      
    textInput: {
        borderWidth: 1,
        margin: 10,
    },

    getStartedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.black,
        width: '80%',
        height: 50,
        margin: 10,
        marginTop: 32,
        borderRadius: 14,
        // marginTop: 40,
        shadowColor: Colors.gray,
        shadowOffset: { width: -1, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    getStartedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
    },
})