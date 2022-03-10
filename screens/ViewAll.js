import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";

const DATA = [
  { id: "1", title: "Desmos" },
  { id: "2", title: "Canvas" },
  { id: "3", title: "QuokkaTips" },
  { id: "4", title: "Google Docs" },
  { id: "5", title: "Slack" },
  { id: "6", title: "Google Sheets" },
  { id: "7", title: "Google Slides" },
  { id: "8", title: "Microsoft PowerPoint" },
  { id: "9", title: "Microsoft Word" },
  { id: "10", title: "Microsoft Excel" },
  { id: "11", title: "Microsoft Teams" },
];

const { width } = Dimensions.get("window");

const Item = (props) => {
  const navigation = useNavigation();
  let speedometer;
  let difficulty;
  if (props.app.rating > 4) {
    speedometer = "speedometer-slow";
    difficulty = "Easy";
  } else if (props.app.rating > 2) {
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

export default function ViewAll({ route }) {
  const renderItem = ({ item }) => <Item app={item} />;
  const [firestore_data, setData] = useState([]); // Save list of guides from firestore
  // in local state

  const navigation = useNavigation();
  const { header, apps } = route.params;
  console.log(apps);
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#E3A444" />
          <Text style={styles.backButtonText}> Back</Text>
        </Pressable>
        <Text style={styles.categoryText}>{header}</Text>
      </View>

      <View style={styles.gridContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={apps}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 6,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    height: 30,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 22,
    fontWeight: "500",
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
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
    fontWeight: "600",
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
  backButtonText: {
    color: "#E3A444",
    fontSize: 22,
    fontWeight: "500",
  },
});
