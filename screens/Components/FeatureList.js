// Based off of https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
// FeatureList.js
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

// defining the item that will be rendered in the Flat List
const Item = (props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("FeatureDetails", {
          feature: props.feature,
        });
      }}
    >
      <View style={styles.itemStyle}>
        <Text style={styles.featureName}>{props.feature.name}</Text>
        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.featureDescription}>{props.feature.description}</Text>
      </View>
    </Pressable>
  );
};

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  let newData = data;
  if (searchPhrase) {
    newData = data.filter((item) => {
      return item.name.toUpperCase().includes(searchPhrase.toUpperCase());
    });
  }
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item feature={item} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item feature={item} />;
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item divider line
      <View
        style={{
          padding: 1,
          marginVertical: 8,
          backgroundColor: '#C4C4C4',
          height: 0.5,
          marginLeft: 10
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
  },
  listView: {
    flex: 1,
  },
  itemStyle: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featureName: {
    marginHorizontal: 8,
    fontSize: 16,
    color: 'black',
  },
  featureDescription: {
    marginHorizontal: 8,
    paddingRight: 8,
    marginTop: 3,
    fontSize: 16,
    color: '#888888',
  }
});
