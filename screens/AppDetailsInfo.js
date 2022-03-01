import React from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Chip } from 'react-native-paper';
import { Rating } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

/* -------- Begin dummy data. TODO: replace with firestore data. -------- */
const APP_DATA = {
  name: "Desmos",
  slogan: "Meet Happy",
  logo: "https://picsum.photos/100/100",
  tags: ["Communication", "Meetings", "Video"],
  previewImages: [
    { id: "1", link: "https://picsum.photos/300/200" },
    { id: "2", link: "https://picsum.photos/300/200" },
    { id: "3", link: "https://picsum.photos/300/200" },
    { id: "4", link: "https://picsum.photos/300/200" },
    { id: "5", link: "https://picsum.photos/300/200" },
  ],
  summary: "Zoom's secure, reliable video platform powers all your communication needs, " + 
            "including meetings, chat, phone, webinars, and online events.",
  ratingOverall: 4.6,
  ratingEngagement: 5.0,
  ratingEase: 4.0,
  reviews: [
    { 
      id: "1",
      title: "I really recommend it! It’s awesomely amazing!",
      date: "Apr 13",
      ratingOverall: 5.0,
      ratingEngagement: 5.0,
      ratingEase: 4.0,
      user: 
      { 
        name: "Mr. Arnold",
        subjects: ["math"],
        gradeLevels: ["High school"]
      },
      usage: "I’ve held ALL of my classes on Zoom since "
              + "COVID-19 made us go into online teaching!",
      myTake: "Zoom is a really great app for all teachers! I really really recommend it especially if you’re "
              + "doing online school. Zoom is a great way to do online school and has actually been part of my "
              + "new life now that COVID-19 started. It helped me and made me interact with my students and colleagues! "
              + "I really really recommend. You can make a Zoom and you’ll automatically be the host! I also really really "
              + "like the Annotation feature, it can make me write on my powerpoint, and pull up a virtual whiteboard :) Zoom "
              + "may have some technical difficulties from time to time but it’s all right we all have technical difficulties! "
              + "Zoom works with Internet as well so you need Wi-Fi and Internet to do Zoom."
    },
    { 
      id: "2",
      title: "I really recommend it! It’s awesomely amazing!",
      date: "Apr 13",
      ratingOverall: 5.0,
      ratingEngagement: 5.0,
      ratingEase: 4.0,
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
    },
  ]
}
/* -------- End dummy data. TODO: replace with firestore data. -------- */

const addToMyGuides = () => {console.log("Added to my guides!")}; // TODO: replace this
const writeReviewClicked = () => {console.log("Write a review!")}; // TODO: replace this

// PREVIEW SECTION: Rendering a preview image
const PreviewImageItem = (props) => {
  console.log(props.imageLink);
  return (
    <Image 
      style={styles.itemImage}
      source={{uri: props.imageLink}}
    />
  );
};
const renderPreviewImg = ({ item }) => <PreviewImageItem imageLink={item.link} />;

// RATINGS & REVIEWS SECTION: Rendering a rating category (overall, engagement, or ease of use)
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
          tintColor="#F2F2F2"
          imageSize={20}
        />
      </View>
    </View>
  )
}

// RATINVS & REVIEWS SECTION: Rendering a review
const ReviewItem = (props) => {
  const navigation = useNavigation(); // To handle click on "View More"
  return (
    <View style={styles.itemReview}>
      <View style={styles.reviewTitleDate}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
        <Text style={{textAlign: 'right', marginLeft: 5, fontSize: 16, color: '#888888'}}>{props.date}</Text>
      </View>
      <Rating
        type="star"
        fractions={1}
        startingValue={props.ratingOverall}
        readonly
        tintColor="#E3E3E3"
        imageSize={20}
        style={{ alignItems: 'left'}}
      />
      <View style={styles.reviewUser}>
        <Image style={styles.userPicture} source={{uri: "https://picsum.photos/50/50"}}/>
        <View style={styles.userNameTags}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>{props.user.name}</Text>
          <Text style={{fontSize: 16, color: '#888888', marginLeft: 10}}>{props.user.gradeLevels[0]} {props.user.subjects[0]} teacher</Text>
        </View>
      </View>
      <Text ellipsizeMode='tail' numberOfLines={3} style={{fontSize: 16}}>{props.myTake}</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("Home", { review: props }); // Todo: change this to navigate to review details screen
        }}
      >
        <Text style={{fontSize: 16, color: "#E3A444", textAlign: 'right', marginVertical: 5}}>View More</Text>
      </Pressable>
    </View>
  );
};
const renderReview = ({ item }) => <ReviewItem 
  title={item.title} 
  date={item.date} 
  user={item.user} 
  myTake={item.myTake} 
  ratingOverall={item.ratingOverall} 
/>;

// FINAL OUTPUT
class AppDetailsInfo extends React.Component {
  render() {
    return <SafeAreaView>
      <ScrollView style={styles.scrollView}>
      <View style={styles.basicInfo}>
        <Image style={styles.logo} source={{uri: APP_DATA.logo}} />
        <View style={styles.nameSloganButton}>
          <Text style={styles.appName}>{this.props.appName}</Text>
          <Text style={styles.appSlogan}>{APP_DATA.slogan}</Text>
          <Pressable style={styles.addRemoveButton} onPress={addToMyGuides}>
            <Text style={styles.buttonText}>Add to My Guides</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.tags}>
        {APP_DATA.tags.map((item, index) => {
          return (
            <View style={{marginHorizontal: 3, marginTop: 3}}>
              <Chip
                key={index}
                height={30} // Give desirable height to chip
                textStyle={{ color:'white', fontSize: 16 }} // Label properties
                style={{ backgroundColor: '#C4C4C4' }} // Display diff color BG
              >
                {item}
              </Chip>
            </View>
          );
        })}
      </View>
      <View style={{borderBottomColor: '#C4C4C4', borderBottomWidth: 1, marginLeft: 15}} />
      <View style={styles.preview}>
        <Text style={styles.sectionTitleText}>Preview</Text>
        <FlatList
          style={{marginLeft: 15}}
          horizontal
          data={APP_DATA.previewImages}
          renderItem={renderPreviewImg}
          keyExtractor={(previewImage) => previewImage.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{borderBottomColor: '#C4C4C4', borderBottomWidth: 1, marginLeft: 15}} />
      <View style={styles.summary}>
        <Text style={styles.sectionTitleText}>Summary</Text>
        <Text style={styles.summaryText}>{APP_DATA.summary}</Text>
      </View>
      <View style={{borderBottomColor: '#C4C4C4', borderBottomWidth: 1, marginLeft: 15}} />
      <View style={styles.ratingsAndReviews}>
        <View style={styles.ratingsAndReviewsHeader}>
          <Text style={styles.sectionTitleText}>Ratings &amp; Reviews</Text>
          <Pressable style={styles.writeReviewButton} onPress={writeReviewClicked}>
            <Text style={styles.buttonText}>WRITE A REVIEW</Text>
          </Pressable>
        </View>
        <RatingCategory category="Overall rating" value="4.6" />
        <RatingCategory category="Student engagement" value="5.0" />
        <RatingCategory category="Ease of use" value="4.0" />
        <FlatList
          style={{marginLeft: 15}}
          horizontal
          data={APP_DATA.reviews}
          renderItem={renderReview}
          keyExtractor={(review) => review.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  }
}

// Style sheet
const styles = StyleSheet.create({
  basicInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
    margin: 15
  },
  nameSloganButton: {
    flex: 1
  },
  appName: {
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
  },
  appSlogan: {
    marginLeft: 15,
    fontSize: 16,
    color: "#888888"
  },
  addRemoveButton: {
    marginLeft: 15,
    marginTop: 5,
    alignItems: 'center',
    alignSelf:'baseline',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#E3A444',   
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 15,
    marginBottom: 15,
  },
  sectionTitleText: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  preview: {
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
    height: 180
  },
  summary: {
    flex: 1,
    marginVertical: 15,
  },
  summaryText: {
    fontSize: 16,
    marginHorizontal: 15
  },
  ratingsAndReviews: {
    flex: 1,
    marginTop: 15,
    height: 340
  },
  reviewTitleDate: {
    display: "flex",
    flexDirection: "row",
  },
  reviewUser: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userPicture: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: "#E3A444"
  },
  userNameTags: {
    flex: 1
  },
  logo: {
    backgroundColor: "#E3A444",
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  itemImage: {
    marginRight: 10,
    backgroundColor: "#E3A444",
    width: 240,
    height: "100%",
    borderRadius: 20,
  },
  itemReview: {
    flex: 1,
    marginRight: 10,
    marginTop: 5,
    backgroundColor: '#E3E3E3',
    borderRadius: 20,
    padding: 15,
    width: 300,
    height: "90%",
  },
  ratingCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 5
  },
  ratingValue: {
    display: "flex",
    flexDirection: "row"
  },
  ratingsAndReviewsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  writeReviewButton: {
    marginRight: 15,
    alignItems: 'center',
    transform: [{ translateY: -5 }],
    alignSelf:'baseline',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#201947',   
  }
});

export default AppDetailsInfo;
