import { SafeAreaView, StyleSheet, Text } from "react-native";
import FeatureList from "./Components/FeatureList";
import SearchBar from "./Components/SearchBar";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useIsFocused } from "@react-navigation/native";

/* -------- Begin dummy data for testing purposes. Won't use in actual app. -------- */
const FEATURES = [
  {
    id: "1",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "2",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "3",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "4",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "5",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "6",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "7",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "8",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
  {
    id: "9",
    name: "🖥 Share screen",
    description: "Share your screen to meeting participants.",
  },
];
/* -------- End dummy data for testing purposes. Won't use in actual app. -------- */

export default function (props) {
  useIsFocused();
  return <AppDetailsFeatures {...props} />;
}

class AppDetailsFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      appName: this.props.appName,
      appId: this.props.appId,
      searchPhrase: "",
      clicked: false,
      features: [],
    };
  }

  /* Class function: sortFeatures(features)
   * Sorts the passed in features first by pinned, then by alphabetical.
   * Calls setState on features to rerender.
   */
  sortFeatures(features) {
    let pinned = this.state.user.pinned;
    let appId = this.state.appId;
    let pinnedInApp = pinned[appId] ? pinned[appId] : [];
    features.sort(function (featureA, featureB) {
      // Pinned features go first
      if (
        pinnedInApp.includes(featureA.id) &&
        !pinnedInApp.includes(featureB.id)
      )
        return -1;
      if (
        !pinnedInApp.includes(featureA.id) &&
        pinnedInApp.includes(featureB.id)
      )
        return 1;
      // Alphabetical
      if (featureA.name.substring(2) < featureB.name.substring(2)) return -1;
      if (featureA.name.substring(2) > featureB.name.substring(2)) return 1;
      return 0;
    });
    this.setState({ features });
  }

  /* Class function: componentDidMount()
   * Queries the guide's features on component mount.
   * Called after the component renders for the first time.
   */
  async componentDidMount() {
    // Query all features from the selected app
    const querySnapshot = await getDocs(
      collection(db, "guides", this.state.appId, "features")
    );
    const features = querySnapshot.docs.map((featureSnap) => {
      let feature = featureSnap.data();
      feature.id = featureSnap.id; // Set the id prop on the feature object
      return feature;
    });
    this.sortFeatures(features);
  }

  /* Class function: componentDidUpdate()
   * Resorts the features list of the guide.
   * Called after the component rerenders.
   */
  async componentDidUpdate() {
    this.sortFeatures(this.state.features);
  }

  /* Class function: render()
   * Renders the component.
   */
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          searchPhrase={this.state.searchPhrase}
          setSearchPhrase={(s) => this.setState({ searchPhrase: s })}
          clicked={this.state.clicked}
          setClicked={(b) => this.setState({ clicked: b })}
          placeHolderText={"Search features of " + this.state.appName + "..."}
        />
        {this.state.features.length > 0?
          <FeatureList
            searchPhrase={this.state.searchPhrase}
            data={this.state.features}
            setClicked={(b) => this.setState({ clicked: b })}
            user={this.state.user}
            appId={this.state.appId}
          /> :
          <Text style={styles.alertText}>This app has no features yet. Check back later!</Text>
        }
      </SafeAreaView>
    );
  }
}

// Style sheet
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 30,
    marginBottom: 6,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
  },
  hamburgerIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
  },
  inputView: {
    flexDirection: "row",
    width: "90%",
    height: 40,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#888888",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  inputText: {
    fontSize: 16,
    fontStyle: "italic",
    paddingLeft: 4,
  },
  sortText: {},
  alertText: {
    marginTop: 10,
    fontSize: 16,
    marginLeft: 25,
  }
});
