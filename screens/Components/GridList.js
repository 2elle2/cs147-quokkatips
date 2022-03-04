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
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../Themes/colors";
import { serverTimestamp } from "firebase/firestore";

// defining the item that will be rendered in the Flat List
const Item = (props) => {
  const navigation = useNavigation();
  let speedometer;
  let difficulty;
  if (props.app.ratingEase > 3.5) {
    speedometer = "speedometer-slow";
    difficulty = "Easy";
  } else if (props.app.ratingEase > 2) {
    speedometer = "speedometer-medium";
    difficulty = "Medium";
  } else {
    speedometer = "speedometer";
    difficulty = "Hard";
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("AppDetails", { app: props.app });
      }}
      style={styles.item}
    >
      <View style={styles.itemImageContainer}>
        <Image style={styles.itemImage} source={{ uri: props.app.logo }} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{props.app.name}</Text>
        <View style={styles.itemRatings}>
          <FontAwesome name="star" size={12} color="black" />
          <Text style={styles.itemRating}>{props.app.rating}</Text>
          <Text style={styles.itemRatingTotal}>/ 5 </Text>
          <Octicons name="primitive-dot" size={8} color="gray" />
          <Text> </Text>

          <MaterialCommunityIcons name={speedometer} size={12} color="black" />
          <Text style={styles.itemDifficulty}> {difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
};

// the filter
const GridList = ({ searchPhrase, setClicked, data }) => {
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
        <View style={styles.gridContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={newData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          ></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GridList;

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
  gridContainer: {
    flex: 1,
    width: "95%",
  },
  item: {
    flex: 1 / 2,
    height: 217,
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 5,
    // elevation: 10,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemImageContainer: {
    width: "100%",
    height: "80%",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  itemInfo: {
    display: "flex",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  itemRatings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemRating: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  itemRatingTotal: {
    fontSize: 10,
    color: "grey",
  },
  itemDifficulty: {
    fontSize: 12,
    fontWeight: "300",
  },
});
