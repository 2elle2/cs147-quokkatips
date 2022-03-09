import { Text, View, SafeAreaView, StyleSheet, Pressable, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Image from 'react-native-image-auto-height';
import YoutubePlayer from 'react-native-youtube-iframe';

const win = Dimensions.get('window');

export default function(props) {
  const navigation = useNavigation();
  return <FeatureDetails {...props} navigation={navigation} />;
}

class FeatureDetails extends React.Component {
  constructor(props) {
    super(props);
    let app = props.route.params.app;
    let user = props.route.params.user;
    let feature = props.route.params.feature;
    let pinned = user.pinned[app.id].includes(feature.id);
    let unread = user.unread[app.id].includes(feature.id);
    this.state = {
      app: app,
      user: user,
      feature: feature,
      pinned: pinned,
      unread: unread,
    };
  }

  componentDidMount() {
  }

  render() {
    const { navigation } = this.props;
    let app = this.state.app;
    let feature = this.state.feature;
    let user = this.state.user;
    return (
      <RootSiblingParent>
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => {
                      if (this.state.unread) {
                        // Remove the feature from the user's unread
                        let index = user.unread[app.id].indexOf(feature.id);
                        if (index > -1) {
                          user.unread[app.id].splice(index, 1);
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
                  name={this.state.pinned?"bookmark":"bookmark-outline"} 
                  onPress={() => {
                    Toast.show(this.state.pinned?'Feature unpinned!': 'Feature pinned!', {
                      backgroundColor: "#E3A444",
                      textColor: 'white',
                      opacity: 1,
                      duration: Toast.durations.SHORT,
                    });
                    if (this.state.pinned) { // Unpin
                      this.setState({pinned: false});
                      let index = user.pinned[app.id].indexOf(feature.id);
                      if (index > -1) {
                        user.pinned[app.id].splice(index, 1);
                      }
                      // TODO: set pinned to false in firestore
                    } else { // Pin
                      this.setState({pinned: true});
                      user.pinned[app.id].push(feature.id);
                      // TODO: set pinned to true in firestore
                    }
                  }}
                  size={28} 
                  color="#E3A444" />
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scrollView} showsVerticalScrollIndicator={true}>
              <Text style={styles.sectionTitleText}>{feature.name}</Text>
              <Text style={styles.sectionBodyText}>{feature.description}</Text>
              <TouchableOpacity 
                  style={styles.cameraTutorialButton} 
                  onPress={() => {
                    // TODO: navigate to camera tutorial view
                  }}
              >
                <Ionicons name="camera" size={40} color="white"/>
                <Text style={styles.cameraTutorialText}>Camera Tutorial</Text>
              </TouchableOpacity>
              <View style={styles.divider}/>
              {feature.updates?
              <View style={this.state.unread? {backgroundColor: '#ECECEC'}: {}}>
                <Text style={styles.sectionTitleText}>What's New 🆕</Text>
                <Text style={styles.sectionBodyText}>{feature.updates}</Text>
                <View style={{height: 15}}></View>
                <View style={styles.divider}/>
              </View> : <View/>}
              <Text style={styles.sectionTitleText}>Video Demo</Text>
              <View style={{marginTop: 10, marginHorizontal: 15, marginBottom: -25}}>
                <YoutubePlayer
                  height={250}
                  play={true}
                  videoId={feature.videoId}
                />
              </View>
              <View style={styles.divider}/>
              <Text style={styles.sectionTitleText}>Instructions</Text>
              {feature.instructions.map(instruction => {
                return (
                  instruction.startsWith("http")?
                  <Image
                    style={styles.image}
                    source={{ uri: instruction }}
                  /> : 
                  <Text style={styles.sectionBodyText}>{instruction}</Text>
                );
              })}
            </ScrollView>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
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
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#E3A444",
      marginHorizontal: 15,
      marginTop: 15,
      height: 70,
      borderRadius: 14,
      shadowColor: "black",
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      marginBottom: 15,
    },
    cameraTutorialText: {
      fontSize: 16,
      color: 'white',
    },
    sectionTitleText: {
      marginTop: 15,
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'left',
      alignSelf: 'flex-start',
      marginHorizontal: 15
    },
    sectionBodyText: {
      marginTop: 10,
      fontSize: 16,
      color: 'black',
      marginHorizontal: 15
    },
    image: {
      alignSelf: 'center',
      width: Dimensions.get('window').width - 30,
      height: 'auto',
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