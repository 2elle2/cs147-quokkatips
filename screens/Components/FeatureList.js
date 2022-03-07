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
import { Ionicons } from "@expo/vector-icons";

// defining the item that will be rendered in the Flat List
const Item = (props) => {
  const navigation = useNavigation();
  let unread = props.user.unread.includes(props.feature.id);
  let pinned = props.user.pinned.includes(props.feature.id);
  return (
    <Pressable
      style={unread? {backgroundColor: '#ECECEC'}: {}}
      onPress={() => {
        console.log("bbbb", props.user);
        navigation.navigate("FeatureDetails", {
          feature: props.feature, user: props.user,
        });
      }}
    >
      <View style={styles.itemStyle}>
          {unread? 
            <View style={styles.unreadCircle}/> :
            <View style={styles.readCircle}/>
          }
          {unread? 
            <Text style={[{fontWeight: 'bold'}, styles.featureName]}>{props.feature.name}</Text> :
            <Text style={styles.featureName}>{props.feature.name}</Text> 
          }
          {pinned? 
            <Ionicons style={styles.bookmarkIcon} name="bookmark" color="#E3A444" size={15}/> : 
            <View/>
          }
      </View>
      <Text numberOfLines={2} ellipsizeMode='tail' style={styles.featureDescription}>{props.feature.description}</Text>
    </Pressable>
  );
};

// the filter
const List = (props) => {
  let data = props.data;
  let setClicked = props.setClicked;
  let searchPhrase = props.searchPhrase;
  let user = props.user;
  let newData = data;
  console.log("point a user", user);
  if (searchPhrase) {
    newData = data.filter((item) => {
      return item.name.toUpperCase().includes(searchPhrase.toUpperCase());
    });
  }
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item feature={item} user={user} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item feature={item} user={user} />;
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item divider line
      <View
        style={{
          padding: 1,
          backgroundColor: '#C4C4C4',
          height: 0.5,
          marginLeft: 20
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
    width: "100%",
  },
  listView: {
    flex: 1,
  },
  itemStyle: {
    display: "flex",
    marginTop: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  featureName: {
    fontSize: 16,
    color: 'black',
  },
  featureDescription: {
    marginTop: 3,
    fontSize: 16,
    marginHorizontal: 20,
    color: '#888888',
    marginBottom: 8,
  },
  unreadCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#E3A444",
  },
  readCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "transparent",
  },
  bookmarkIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
  }
});
