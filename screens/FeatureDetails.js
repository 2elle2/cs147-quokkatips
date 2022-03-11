import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import Image from "react-native-image-auto-height";
import YoutubePlayer from "react-native-youtube-iframe";
import SafeAreaView from "react-native-safe-area-view";
// const win = Dimensions.get('window');

export default function (props) {
  const navigation = useNavigation();
  return <FeatureDetails {...props} navigation={navigation} />;
}

class FeatureDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: props.route.params.appId,
      feature: props.route.params.feature,
      user: props.route.params.user,
      unread: props.route.params.unread,
      pinned: props.route.params.pinned,
    };
  }

  render() {
    const { navigation } = this.props;
    let appId = this.state.appId;
    let feature = this.state.feature;
    let user = this.state.user;
    let unread = this.state.unread;
    let pinned = this.state.pinned;

    return (
      <RootSiblingParent>
        <SafeAreaView style={styles.body} forceInset="top">
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                if (unread) {
                  // Remove the feature from the user's unread
                  let index = user.unread[appId].indexOf(feature.id);
                  if (index > -1) {
                    user.unread[appId].splice(index, 1);
                  }
                  // TODO: update unread in firestore
                }
                navigation.goBack();
              }}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color="#E3A444" />
              <Text style={styles.backButtonText}> Back</Text>
            </Pressable>
            <Text style={styles.categoryText}>Feature Details</Text>
            <Ionicons
              style={styles.pinButton}
              name={pinned ? "bookmark" : "bookmark-outline"}
              onPress={() => {
                Toast.show(pinned ? "Feature unpinned!" : "Feature pinned!", {
                  backgroundColor: "#E3A444",
                  textColor: "white",
                  opacity: 1,
                  duration: Toast.durations.SHORT,
                });
                if (pinned) {
                  // Unpin
                  this.setState({ pinned: false });
                  let index = user.pinned[appId].indexOf(feature.id);
                  if (index > -1) {
                    user.pinned[appId].splice(index, 1);
                  }
                  // TODO: set pinned to false in firestore
                } else {
                  // Pin
                  this.setState({ pinned: true });
                  if (user.pinned[appId] == null) user.pinned[appId] = [];
                  user.pinned[appId].push(feature.id);
                  // TODO: set pinned to true in firestore
                }
              }}
              size={28}
              color="#E3A444"
            />
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.scrollView}
            showsVerticalScrollIndicator={true}
          >
            <Text style={styles.sectionTitleText}>{feature.name}</Text>
            <Text style={styles.sectionBodyText}>{feature.description}</Text>
            <TouchableOpacity
              style={styles.cameraTutorialButton}
              onPress={() => {
                // TODO: navigate to camera tutorial view
                navigation.navigate("Camera Tutorial", {});
              }}
            >
              <Ionicons name="camera" size={40} color="white" />
              <Text style={styles.cameraTutorialText}>Camera Tutorial</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            {feature.updates ? (
              <View
                style={this.state.unread ? { backgroundColor: "#ECECEC" } : {}}
              >
                <Text style={styles.sectionTitleText}>What's New 🆕</Text>
                <Text style={styles.sectionBodyText}>{feature.updates}</Text>
                <View style={{ height: 15 }}></View>
                <View style={styles.divider} />
              </View>
            ) : (
              <View />
            )}
            <Text style={styles.sectionTitleText}>Video Demo</Text>
            <View
              style={{ marginTop: 10, marginHorizontal: 15, marginBottom: -25 }}
            >
              <YoutubePlayer
                height={250}
                play={true}
                videoId={feature.videoId}
              />
            </View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitleText}>Instructions</Text>
            {feature.instructions.map((instruction) => {
              return instruction.startsWith("http") ? (
                <Image style={styles.image} source={{ uri: instruction }} />
              ) : (
                <Text style={styles.sectionBodyText}>{instruction}</Text>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}

// Style sheet
const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 6,
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
  pinButton: {
    position: "absolute",
    right: 0,
  },
  backButtonText: {
    color: "#E3A444",
    fontSize: 22,
    fontWeight: "500",
  },
  cameraTutorialButton: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3A444",
    marginHorizontal: 15,
    marginTop: 15,
    height: 70,
    borderRadius: 6,
    shadowColor: "black",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
  },
  cameraTutorialText: {
    fontSize: 16,
    color: "white",
  },
  sectionTitleText: {
    marginTop: 15,
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    alignSelf: "flex-start",
    marginHorizontal: 15,
  },
  sectionBodyText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
    marginHorizontal: 15,
  },
  image: {
    alignSelf: "center",
    width: Dimensions.get("window").width - 30,
    height: "auto",
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  scrollView: {
    width: "100%",
  },
  divider: {
    width: "100%",
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    marginLeft: 15,
  },
});
