import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

import { doc, setDoc } from 'firebase/firestore';


export default function SignInScreen() {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const navigation = useNavigation();

    const signUpUser = async () => {
        const auth = getAuth();

        if (email.length === 0 || password.length === 0) {
            return;
        }

        //changed the promising chaining to async/await
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // console.log(userCredential);

            let uid = userCredential.user.uid;
            // console.log(uid);

            await setDoc(doc(db, "users", uid), {
                email: email,
            });

            navigation.navigate('Home');

        } catch (error) {
            console.log(error);
        }
    }

    const logInUser = async () => {
        const auth = getAuth();

        if (email.length === 0 || password.length === 0) {
            return;
        }

        //changed the promising chaining to async/await
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password)
            // console.log(userCredential);

            // let uid = userCredential.user.uid;
            // console.log(uid);

            navigation.navigate('Home');

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />

            <Button title="Log In User" onPress={logInUser}/>
            <Button title="Register User" onPress={signUpUser}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
      
    textInput: {
        borderWidth: 1,
        margin: 10,
    },
})