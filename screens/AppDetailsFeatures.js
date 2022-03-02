import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { ThemeProvider } from '@react-navigation/native';

class AppDetailsFeatures extends React.Component {
    render() {
      return <View>
        <Text>This is the AppDetailsFeatures of {this.props.appName}</Text>
      </View>
    }
  }

export default AppDetailsFeatures;