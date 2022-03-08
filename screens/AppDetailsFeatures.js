import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import React, { Component, useState} from 'react';
import FeatureList from "./Components/FeatureList";
import SearchBar from "./Components/SearchBar";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useIsFocused } from "@react-navigation/native";

/* -------- Begin dummy data for testing purposes. Won't use in actual app. -------- */
const FEATURES = [
  { id: "1", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "2", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "3", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "4", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "5", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "6", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "7", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "8", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
  { id: "9", name: "🖥 Share screen", description: "Share your screen to meeting participants." },
];
/* -------- End dummy data for testing purposes. Won't use in actual app. -------- */

export default function(props) {
  const isFocused = useIsFocused();
  return <AppDetailsFeatures {...props} />;
}

class AppDetailsFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: "",
      clicked: false,
      features: [],
    }
  }

  // Query features data on component mount
  async componentDidMount() {
    // Query all features from the selected app
    const querySnapshot = await getDocs(
      collection(db, "guides", this.props.app.id, "features")
    );
    const features = querySnapshot.docs.map((featureSnap) => {
      let feature = featureSnap.data();
      feature.id = featureSnap.id; // Set the id prop on the review object
      return feature;
    });

    // Sort by pinned, then alphabetical
    let app = this.props.app;
    let pinnedInApp = this.props.user.pinned[app.id];
    features.sort(function(featureA, featureB) {
      if (pinnedInApp.includes(featureA.id) && !pinnedInApp.includes(featureB.id)) return -1;
      if (!pinnedInApp.includes(featureA.id) && pinnedInApp.includes(featureB.id)) return 1;
      if (featureA.name.substring(2) < featureB.name.substring(2)) return -1;
      if (featureA.name.substring(2) > featureB.name.substring(2)) return 1;
      return 0;
    });
    this.setState({ features });
  }

  async componentDidUpdate() {
    // Sort by pinned, then alphabetical
    let features = this.state.features;
    let app = this.props.app;
    let pinnedInApp = this.props.user.pinned[app.id];
    features.sort(function(featureA, featureB) {
      if (pinnedInApp.includes(featureA.id) && !pinnedInApp.includes(featureB.id)) return -1;
      if (!pinnedInApp.includes(featureA.id) && pinnedInApp.includes(featureB.id)) return 1;
      if (featureA.name.substring(2) < featureB.name.substring(2)) return -1;
      if (featureA.name.substring(2) > featureB.name.substring(2)) return 1;
      return 0;
    });
    this.setState({ features });
  }

  render() {
    return <SafeAreaView style={styles.container}>
    <SearchBar
      searchPhrase={this.state.searchPhrase}
      setSearchPhrase={(s) => this.setState({ searchPhrase: s })}
      clicked={this.state.clicked}
      setClicked={(b) => this.setState({ clicked: b })}
      placeHolderText={"Search features of " + this.props.app.name + "..."}
    />
    {
      <FeatureList
        searchPhrase={this.state.searchPhrase}
        data={this.state.features}
        setClicked={(b) => this.setState({ clicked: b })}
        user={this.props.user}
        app={this.props.app}
      />
    }
  </SafeAreaView>
  }
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: 'white',
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
    fontWeight: "700",
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
    borderColor: '#888888',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 12,
    alignItems: "center",
    backgroundColor: 'white',
  },
  inputText: {
    fontSize: 16,
    fontStyle: "italic",
    paddingLeft: 4,
  },
  sortText: {},
});

