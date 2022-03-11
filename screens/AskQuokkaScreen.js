import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Pressable } from "react-native";
import ARView from './ARView';

export default function AskQuokkaScreen(props) {
    return (
        <View>
            <ARView
                view={props.view}
                setView={props.setView}
                setMessages={props.setMessages}
                messages={props.messages}
            />
        </View>
    )
}