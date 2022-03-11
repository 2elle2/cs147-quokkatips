// Based off of https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
// FeatureList.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Defining the item that will be rendered in the FlatList
const Item = (props) => {
  const navigation = useNavigation();
  let appId = props.appId;
  let feature = props.feature;
  let user = props.user;
  let unread = user.unread[appId]
    ? user.unread[appId].includes(feature.id)
    : false;
  let pinned = user.pinned[appId]
    ? user.pinned[appId].includes(feature.id)
    : false;

  return (
    <Pressable
      style={unread ? { backgroundColor: "#ECECEC" } : {}}
      onPress={() => {
        navigation.navigate("FeatureDetails", {
          appId: appId,
          feature: feature,
          user: user,
          unread: unread,
          pinned: pinned,
        });
      }}
    >
      <View style={styles.itemStyle}>
        {unread ? (
          <View style={styles.unreadCircle} />
        ) : (
          <View style={styles.readCircle} />
        )}
        {unread ? (
          <Text style={[{ fontWeight: "600" }, styles.featureName]}>
            {feature.name}
          </Text>
        ) : (
          <Text style={styles.featureName}>{feature.name}</Text>
        )}
        {pinned ? (
          <Ionicons
            style={styles.bookmarkIcon}
            name="bookmark"
            color="#E3A444"
            size={15}
          />
        ) : (
          <View />
        )}
      </View>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.featureDescription}
      >
        {feature.description}
      </Text>
    </Pressable>
  );
};

// The filter
const List = (props) => {
  let data = props.data;
  let setClicked = props.setClicked;
  let searchPhrase = props.searchPhrase;
  let user = props.user;
  let appId = props.appId;
  let newData = data;

  // Returns only items that match the search phrase
  if (searchPhrase) {
    newData = data.filter((item) => {
      return item.name.toUpperCase().includes(searchPhrase.toUpperCase());
    });
  }

  // Renders the items
  const renderItem = ({ item }) => {
    // When no input, show all
    if (searchPhrase === "") {
      return <Item feature={item} user={user} appId={appId} />;
    }
    // Filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item feature={item} user={user} appId={appId} />;
    }
  };

  // Renders the FlatList item divider line
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          padding: 1,
          backgroundColor: "#C4C4C4",
          height: 0.5,
          marginLeft: 20,
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

// Style sheet
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
    color: "black",
  },
  featureDescription: {
    marginTop: 3,
    fontSize: 16,
    marginHorizontal: 20,
    color: "#888888",
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
    position: "absolute",
    right: 10,
    top: 5,
  },
});
