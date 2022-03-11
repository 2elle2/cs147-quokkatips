// Based off of https://blog.logrocket.com/create-react-native-search-bar-from-scratch/
// SearchBar.js
import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Pressable,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import Colors from "../../Themes/colors";

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  placeHolderText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar__clicked}>
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color={Colors.darkgray}
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder={placeHolderText}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {/* {clicked && (
        <View>
            <Pressable 
                onPress={() => {
                Keyboard.dismiss();
                setClicked(false);}}>
                <Entypo name="cross" size={20} color={Colors.gray} style={{ padding: 1 }} onPress={() => {
                    setSearchPhrase("")
            }}/>
          </Pressable>
        </View>
        )}
      </View> */}
        {/* cancel button, depending on whether the search bar is clicked or not */}
        {/* {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )} */}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.gray,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },
});
