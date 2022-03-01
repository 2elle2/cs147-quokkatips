// Based off of https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
// List.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import Colors from "../../Themes/colors";

// defining the item that will be rendered in the Flat List
const Item = ({ title, image }) => (
    <View style={styles.itemStyle}>
        <Image 
            style={styles.logoStyle}
            source={{uri: image}}/>
        <Text style={styles.title}>{title}</Text>
    </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <Item title={item.title} image={item.image} />
      );
    }
    // filter of the name
    if (item.title.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item title={item.title} image={item.image} />;
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item divider line
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors.gray,
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.list__container}>
        <View
            onStartShouldSetResponder={() => {
            setClicked(false);
            }}
        >
        <FlatList
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorView}
            keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    width: "100%",
    marginBottom: 60,
  },
  itemStyle: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    height: 80,
  },
  title: {
    fontSize: 20,
    color: Colors.black,
  },
  logoStyle: {
    height: 56,
    width: 60,
    borderRadius: 15, 
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.darkpurple, //testing purposes
  },
});