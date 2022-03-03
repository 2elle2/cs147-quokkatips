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
import { serverTimestamp } from "firebase/firestore";

// defining the item that will be rendered in the Flat List
const Item = ({ title, image }) => (
  <View style={styles.itemStyle}>
    <Image style={styles.logoStyle} source={{ uri: image }} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  let newData = data;
  if (searchPhrase) {
    newData = data.filter((item) => {
      console.log(item);
      return item.name.toUpperCase().includes(searchPhrase.toUpperCase());
    });
  }
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item title={item.name} image={item.image} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item title={item.name} image={item.image} />;
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item divider line
      <View
        style={{
          padding: 1,
          marginVertical: 8,
          backgroundColor: Colors.gray,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        style={styles.listView}
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={newData}
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
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    width: "100%",
    // marginBottom: 60,
  },
  listView: {
    flex: 1,
  },
  itemStyle: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
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
