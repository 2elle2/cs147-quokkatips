//Based off of examples from:
// https://snack.expo.dev/embedded/@aboutreact/example-of-search-bar-in-react-native?iframeId=ewbug1wk1e&preview=true&platform=ios&theme=dark
// https://reactnative-examples.com/show-divider-separator-between-flatlist-items-in-react-native/

import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import Colors from "../Themes/colors";
import List from "./Components/List";
import SearchBar from "./Components/SearchBar";

// export default function MyGuidesScreen() {
const MyGuidesScreen = ({ user, guides, toggleDrawer }) => {
  const DATA = [
    { id: "1", title: "Desmos", image: "https://syracuseuniversity.zoom.us/" },
    { id: "2", title: "Canvas", image: "https://syracuseuniversity.zoom.us/" },
    {
      id: "3",
      title: "QuokkaTips",
      image: "https://syracuseuniversity.zoom.us/",
    },
    {
      id: "4",
      title: "Google Docs",
      image: "https://syracuseuniversity.zoom.us/",
    },
    { id: "5", title: "Slack", image: "https://syracuseuniversity.zoom.us/" },
    {
      id: "6",
      title: "Google Sheets",
      image: "https://syracuseuniversity.zoom.us/",
    },
    {
      id: "7",
      title: "Google Slides",
      image: "https://syracuseuniversity.zoom.us/",
    },
    {
      id: "8",
      title: "Microsoft PowerPoint",
      image: "https://syracuseuniversity.zoom.us/",
    },
    {
      id: "9",
      title: "Microsoft Word",
      image: "https://syracuseuniversity.zoom.us/",
    },
    {
      id: "10",
      title: "Microsoft Excel",
      image: "https://syracuseuniversity.zoom.us/",
    },
    {
      id: "11",
      title: "Microsoft Teams",
      image: "https://syracuseuniversity.zoom.us/",
    },
  ];

  // const DATA = ['Desmos', 'Canvas', 'QuokkaTips', 'Google Docs', 'Slack'];

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  console.log(guides);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.hamburgerIcon} onPress={() => toggleDrawer()}>
          <Ionicons name="ios-menu-outline" size={40} color="#E3A444" />
        </Pressable>
        <Text style={styles.headerText}>My Guides</Text>
      </View>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        placeHolderText={"Search my saved guides..."}
      />
      {
        <List
          searchPhrase={searchPhrase}
          data={guides.filter(function (app) {
            return user.guides.includes(app.id);
          })}
          setClicked={setClicked}
          //reRenderMyGuides={rerenderParentCallback}
        />
      }
    </SafeAreaView>
  );
};

export default MyGuidesScreen;

//     return (
//         // List of the user's guides
//         <SafeAreaView style={styles.container}>

//           <View style={styles.inputView}>
//             <Feather name="search" size={24} color={Colors.gray} />
//             <TextInput
//               style={styles.inputText}
//               onChangeText={filterSearchResults}
//               value={text}
//               placeholder='Search my saved guides...'
//             />
//             {/* {appNames.map((appName) => {
//               return <Text>{appName}</Text>;
//             })}  */}
//           </View>

//           {/* "Sort by..." picker */}
//           <RNPickerSelect
//               onValueChange={(value) => console.log(value)}
//               placeholder={{label: "Sort by...", value: null, color: 'gray'}}
//               items={[
//                     { label: "Recenty Added", value: "Recently Added" },
//                     { label: "Most Used", value: "Most Used" },
//                     { label: "Alphabetical", value: "Alphabetical" }
//               ]}
//               style={pickerSelectStyles}
//           />
//           <FlatList
//               data={DATA}
//               keyExtractor={item => item.id}
//               ItemSeparatorComponent={ItemSeparatorView}
//               // renderItem={ItemView}
//               renderItem={({item}) =>
//                 <ItemRender
//                   title={item.title}
//                   image={item.image}
//                 />
//               }
//           />
//         </SafeAreaView>
//     );
// }

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.white,
    // minHeight: 300,
  },

  // item: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   marginVertical: 5,
  //   marginHorizontal: 10,
  //   borderRadius: 10,
  //   elevation: 2,
  // },
  // shadowProp: {
  //   shadowColor: 'gray',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
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
    borderColor: Colors.gray,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 12,
    alignItems: "center",
    backgroundColor: Colors.white,
  },

  inputText: {
    fontSize: 16,
    fontStyle: "italic",
    paddingLeft: 4,
  },

  sortText: {},
});
