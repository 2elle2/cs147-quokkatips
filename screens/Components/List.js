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
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../Themes/colors";
import { serverTimestamp } from "firebase/firestore";

// defining the item that will be rendered in the Flat List
const Item = (props) => {
  const navigation = useNavigation();
  console.log("item props", props);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("AppDetails", {
          app: props.app,
          reRenderMyGuides: props.reRenderMyGuides,
        });
      }}
    >
      <View style={styles.itemStyle}>
        <Image style={styles.logoStyle} source={{ uri: props.app.logo }} />
        <Text style={styles.title}>{props.app.name}</Text>
        <View style={styles.rightButton}>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

// the filter
const List = ({ searchPhrase, setClicked, data, reRenderMyGuides }) => {
  console.log("rerender", reRenderMyGuides);
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
      return <Item app={item} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item app={item} />;
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
          height: 0.5,
          width: "94%",
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
    marginTop: 12,
    marginLeft: 10,
    width: "100%",
    // marginBottom: 60,
  },
  listView: {
    flex: 1,
  },
  itemStyle: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    resizeMode: "cover",
  },
  rightButton: {
    position: "absolute",
    right: 30,
  },
});
