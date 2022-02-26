import React from 'react';
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
    {id: '1', title: 'Desmos'},
    {id: '2', title: 'Canvas'},
    {id: '3', title: 'QuokkaTips'},
    {id: '4', title: 'Google Docs'},
    {id: '5', title: 'Slack'},
    {id: '6', title: 'Google Sheets'},
    {id: '7', title: 'Google Slides'},
    {id: '8', title: 'Microsoft PowerPoint'},
    {id: '9', title: 'Microsoft Word'},
    {id: '10', title: 'Microsoft Excel'},
    {id: '11', title: 'Microsoft Teams'},
];

const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

export default function MyGuidesScreen() {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    
    return (
        // "Sort by..." picker
        // List of the user's guides
        <SafeAreaView style={styles.container, styles.shadowProp}>
            <RNPickerSelect style={{padding: 10}}
                onValueChange={(value) => console.log(value)}
                placeholder={{label: "Sort by...", value: null, color: 'gray'}}
                items={[
                     { label: "Recenty Added", value: "Recently Added" },
                     { label: "Most Used", value: "Most Used" },
                     { label: "Alphabetical", value: "Alphabetical" }
                ]}
                style={pickerSelectStyles}
            />
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  shadowProp: {
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: '#EEEEEE',
        borderRadius: 4,
        color: 'black'
    }
});