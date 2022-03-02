import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Image
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Rating } from 'react-native-elements';
import { connectFirestoreEmulator } from "firebase/firestore";

/* -------- Begin dummy data for testing purposes. Won't use in actual app. -------- */
const REVIEW_DATA = { 
    id: "2",
    title: "I really recommend it! It’s awesomely amazing!",
    createdAt: new Date().toLocaleDateString("en-US"),
    rating: 5.0,
    ratingEngagement: 5.0,
    ratingEase: 4.6,
    user: 
    { 
        name: "Mr. Arnold",
        subjects: ["math"],
        gradeLevels: ["High school"]
    },
    usage: "I’ve held ALL of my classes on Zoom since "
            + "COVID-19 made us go into online teaching!",
    myTake: "Zoom is a really great app for teachers! I really really recommend it especially if you’re "
            + "doing online school. Zoom is a great way to do online school and has actually been part of my "
            + "new life now that COVID-19 started. It helped me and made me interact with my students and colleagues! "
            + "I really really recommend. You can make a Zoom and you’ll automatically be the host! I also really really "
            + "like the Annotation feature, it can make me write on my powerpoint, and pull up a virtual whiteboard :) Zoom "
            + "may have some technical difficulties from time to time but it’s all right we all have technical difficulties! "
            + "Zoom works with Internet as well so you need Wi-Fi and Internet to do Zoom."
}
/* -------- End dummy data for testing purposes. Won't use in actual app. -------- */

// Rendering a rating category (overall, engagement, or ease of use)
const RatingCategory = (props) => {
    return (
        <View style={styles.ratingCategory}>
        <Text style={{fontSize: 16}}>{props.category}</Text>
        <View style={styles.ratingValue}>
            <Text style={{fontSize: 16, fontWeight:'bold'}}>{props.value}</Text>
            <Text style={{fontSize: 12, color: '#888888', marginTop: 3, marginRight: 5}}>/5</Text>
            <Rating
                type="star"
                fractions={1}
                startingValue={props.value}
                readonly
                tintColor="#E3E3E3"
                imageSize={20}
            />
        </View>
        </View>
    )
}


// FINAL OUTPUT
export default function ReviewDetails({ route }) {
  const { review } = route.params;
  const navigation = useNavigation();

  return (
    // Screen header
    // Review details
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#E3A444" />
          <Text style={styles.backButtonText}> Back</Text>
        </Pressable>
        <Text style={styles.categoryText}>Ratings &amp; Reviews</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.review}>
            <View style={styles.titleDate}>
                <Text style={{fontSize: 16, fontWeight: 'bold', flex: 1}}>{review.title}</Text>
                <Text style={{fontSize: 16, color: '#888888', textAlign: 'right'}}>{review.createdAt}</Text>
            </View>
            <View style={styles.user}>
                <Image style={styles.userPicture} source={{uri: "https://picsum.photos/50/50"}}/>
                <View style={styles.userNameBio}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>{review.user.name}</Text>
                    <Text style={{fontSize: 16, color: '#888888', marginLeft: 10}}>{review.user.gradeLevels[0]} {review.user.subjects[0]} teacher</Text>
                </View>
            </View>
            <Text style={styles.sectionTitleText}>Ratings</Text>
            <RatingCategory category="Overall rating" value={review.rating.toFixed(1)} />
            <RatingCategory category="Student engagement" value={review.ratingEngagement.toFixed(1)} />
            <RatingCategory category="Ease of use" value={review.ratingEase.toFixed(1)} />
            <Text style={styles.sectionTitleText}>How I use it</Text>
            <Text style={styles.reviewText}>{review.usage}</Text>
            <Text style={styles.sectionTitleText}>My take</Text>
            <Text style={styles.reviewText}>{review.myTake}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  container: {
    flex: 1,
    width: "100%",
  },
  backButtonText: {
    color: "#E3A444",
    fontSize: 20,
    fontWeight: "500",
  },
  review: {
    flex: 1,
    margin: 15,
    backgroundColor: "#E3E3E3",
    borderRadius: 20,
    padding: 15
  }, 
  titleDate: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userPicture: {
    borderRadius: 25,
    width: 50,
    height: 50,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    backgroundColor: "#E3A444"
  },
  userNameBio: {
    flex: 1
  },
  ratings: {
    flex: 1
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  reviewText: {
    fontSize: 16,
  },
  ratingCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  ratingValue: {
    display: "flex",
    flexDirection: "row"
  },
});
