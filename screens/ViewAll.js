import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

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

const Item = ({ title }) => (
  <View style={styles.item}>
    <View style={styles.itemImage}></View>
    <View style={styles.itemInfo}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemRatings}>
        <Text style={styles.itemRating}>4.3</Text>
        <Text style={styles.itemDifficulty}>Easy</Text>
      </View>
    </View>
  </View>
);

export default function ViewAll({ route }) {
  const renderItem = ({ item }) => <Item title={item.title} />;

  const navigation = useNavigation();
  const { category } = route.params;

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
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <View style={styles.gridContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
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
    fontWeight: "700",
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
    fontWeight: "bold",
  },
  itemImage: {
    backgroundColor: "#E3A444",
    width: "100%",
    height: "80%",
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
  },
  itemRating: {
    fontSize: 12,
  },
  itemDifficulty: {
    fontSize: 12,
  },
  backButtonText: {
    color: "#E3A444",
    fontSize: 20,
    fontWeight: "500",
  },
});
