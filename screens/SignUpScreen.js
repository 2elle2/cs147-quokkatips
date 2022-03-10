import { StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import Colors from '../Themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function SignUpScreen(props) {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [name, onChangeName] = useState("");
    const navigation = useNavigation();

    const signUpUser = async () => {
        const auth = getAuth();

        //changed the promising chaining to async/await
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)
            let uid = userCredential.user.uid;

            await setDoc(doc(db, "users", uid), {
                // Default properties of a new user
                email: email,
                name: name,
                gradeLevels: ["Middle School"],
                subjects: ["Mathematics"],
                guides: ["jUEWVUQE4UBImqprqsg9", "lpJsISwLw5WNnuBsRLzJ", "H7Ue6SxYJHWfW9LHveoG", "DzFkWDDaArCq5EUCtts3"],
                picture: "https://picsum.photos/50/50",
                pinned: {},
                unread: {},
            });

            navigation.navigate('SignUpTwo');
        } catch (error) {
            if (email.length === 0 && password.length === 0) {
                alert('Please enter your email address and password');
                return;
            }
            if (email.length === 0) {
                alert('Please enter your email address');
                return;
            }
            if (password.length === 0) {
                alert('Please enter your password');
                return;
            }
            if (password.length < 6) {
                alert('Password should be at least 6 characters');
                return;
            }
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use');
                return;
              }
            if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid');
                return;
            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-circle-outline" size={48} color={Colors.black} />
            </TouchableOpacity>

            <Text style={styles.logInHeaderText}>Sign Up</Text>
            <View style={styles.inputView}>
                <Feather name="user" size={24} color="black" />
                <TextInput
                    style={styles.inputText}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Full Name"
                />
            </View>
            <View style={styles.inputView}>
                <Feather name="mail" size={24} color="black" />
                <TextInput
                    style={styles.inputText}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="Email address"
                />
            </View>
            <View style={styles.inputView}>
                <AntDesign name="lock1" size={24} color="black" />
                <TextInput
                    style={styles.inputText}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity 
                style={styles.nextButton} 
                onPress={signUpUser}
            >
                <Text style={styles.nextText}>Next </Text>
                <FontAwesome5 name="chevron-right" size={16} color={Colors.white} />
            </TouchableOpacity>

            <View style={styles.signUpRow}>
                <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.loginText}> Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        alignSelf: 'flex-start',
        position: 'absolute',
        left: 24,
        top: 60,
    },
    quokkaImage: {
        width: 240,
        height: 240,
        marginRight: 16,
    },
      
    logInHeaderText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputView: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        width: '80%',
        height: 50,
        borderRadius: 14,
        borderWidth: 1.5,
        margin: 10,
        paddingLeft: 12,
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 4,
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
    signUpRow: {
        marginTop: 40,
        flexDirection: 'row',
    },
    alreadyHaveAccountText: {
        fontSize: 16,
        color: Colors.black,
    },
    loginText: {
        fontSize: 16,
        color: Colors.orange,
        fontWeight: 'bold',
    }
})