import { Text, View, SafeAreaView, StyleSheet, Pressable, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Image from 'react-native-image-auto-height';
import YoutubePlayer from 'react-native-youtube-iframe';

const win = Dimensions.get('window');

export default function(props) {
  const navigation = useNavigation();
  return <FeatureDetails {...props} navigation={navigation} />;
}

// INSTRUCTIONS SECTION: Rendering an instruction (text or image)
const InstructionItem = (props) => {
  return (
    props.instruction.startsWith("http")?
    <Image
      style={styles.itemImage}
      source={{ uri: props.instruction }}
      resizeMode="cover"
    /> : 
    <Text style={styles.sectionBodyText}>{props.instruction}</Text>
  );
};
const renderInstruction = ({ item }) => <InstructionItem instruction={item} />;

class FeatureDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinned: false,
      width: 0,
      height: 0,
    };
  }

  render() {
    const { navigation } = this.props;
    let feature = this.props.route.params.feature;
    return (
      <RootSiblingParent>
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
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
                    this.setState({pinned: !this.state.pinned});
                  }}
                  size={28} 
                  color="#E3A444" />
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scrollView} showsVerticalScrollIndicator={true}>
              <Text style={styles.sectionTitleText}>{feature.name}</Text>
              <Text style={styles.sectionBodyText}>{feature.description}</Text>
              <TouchableOpacity 
                  style={styles.cameraTutorialButton} 
                  onPress={() => console.log('Camera tutorial button pressed!')}
              >
                <Ionicons name="camera" size={40} color="white"/>
                <Text style={styles.cameraTutorialText}>Camera Tutorial</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  marginTop: 15,
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: 1,
                  marginLeft: 15,
                }}
              />
              <Text style={styles.sectionTitleText}>Video Demo</Text>
              <View style={{marginTop: 10, marginHorizontal: 15, marginBottom: -25}}>
                <YoutubePlayer
                  height={250}
                  play={true}
                  videoId={feature.videoId}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: 1,
                  marginLeft: 15,
                }}
              />
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
    },
    cameraTutorialText: {
      fontSize: 16,
      color: Colors.white,
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
      marginTop: 15,
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
});