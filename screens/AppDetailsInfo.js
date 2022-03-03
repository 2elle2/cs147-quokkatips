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
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Chip } from "react-native-paper";
import { Rating } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

/* -------- Begin dummy data for testing purposes. Won't use in actual app. -------- */
const APP_DATA = {
  name: "Desmos",
  slogan: "Meet Happy",
  logo: "https://picsum.photos/100/100",
  tags: ["Communication", "Meetings", "Video"],
  screenshots: [
    "https://picsum.photos/300/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/300/200",
  ],
  description:
    "Zoom's secure, reliable video platform powers all your communication needs, " +
    "including meetings, chat, phone, webinars, and online events.",
  rating: 4.6,
  ratingEngagement: 5.0,
  ratingEase: 4.0,
  reviews: [
    {
      id: "1",
      title: "I really recommend it! It’s awesomely amazing!",
      createdAt: new Date().toLocaleDateString("en-US"),
      rating: 5.0,
      ratingEngagement: 5.0,
      ratingEase: 4.0,
      user: {
        name: "Mr. Arnold",
        subjects: ["math"],
        gradeLevels: ["High school"],
      },
      usage:
        "I’ve held ALL of my classes on Zoom since " +
        "COVID-19 made us go into online teaching!",
      myTake:
        "Zoom is a really great app for all teachers! I really really recommend it especially if you’re " +
        "doing online school. Zoom is a great way to do online school and has actually been part of my " +
        "new life now that COVID-19 started. It helped me and made me interact with my students and colleagues! " +
        "I really really recommend. You can make a Zoom and you’ll automatically be the host! I also really really " +
        "like the Annotation feature, it can make me write on my powerpoint, and pull up a virtual whiteboard :) Zoom " +
        "may have some technical difficulties from time to time but it’s all right we all have technical difficulties! " +
        "Zoom works with Internet as well so you need Wi-Fi and Internet to do Zoom.",
    },
    {
      id: "2",
      title: "I really recommend it! It’s awesomely amazing!",
      createdAt: new Date().toLocaleDateString("en-US"),
      rating: 5.0,
      ratingEngagement: 5.0,
      ratingEase: 4.0,
      user: {
        name: "Mr. Arnold",
        subjects: ["math"],
        gradeLevels: ["High school"],
      },
      usage:
        "I’ve held ALL of my classes on Zoom since " +
        "COVID-19 made us go into online teaching!",
      myTake:
        "Zoom is a really great app for teachers! I really really recommend it especially if you’re " +
        "doing online school. Zoom is a great way to do online school and has actually been part of my " +
        "new life now that COVID-19 started. It helped me and made me interact with my students and colleagues! " +
        "I really really recommend. You can make a Zoom and you’ll automatically be the host! I also really really " +
        "like the Annotation feature, it can make me write on my powerpoint, and pull up a virtual whiteboard :) Zoom " +
        "may have some technical difficulties from time to time but it’s all right we all have technical difficulties! " +
        "Zoom works with Internet as well so you need Wi-Fi and Internet to do Zoom.",
    },
  ],
};
/* -------- End dummy data for testing purposes. Won't use in actual app. -------- */

// PREVIEW SECTION: Rendering a preview image
const PreviewImageItem = (props) => {
  return (
    <Image
      style={styles.itemImage}
      source={{ uri: props.imageLink }}
      resizeMode="cover"
    />
  );
};
const renderPreviewImg = ({ item }) => <PreviewImageItem imageLink={item} />;

// RATINGS & REVIEWS SECTION: Rendering a rating category (overall, engagement, or ease of use)
const RatingCategory = (props) => {
  return (
    <View style={styles.ratingCategory}>
      <Text style={{ fontSize: 16 }}>{props.category}</Text>
      <View style={styles.ratingValue}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.value}</Text>
        <Text
          style={{
            fontSize: 12,
            color: "#888888",
            marginTop: 3,
            marginRight: 5,
          }}
        >
          /5
        </Text>
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
  );
};

// RATINGS & REVIEWS SECTION: Rendering a review
const ReviewItem = (props) => {
  const navigation = useNavigation(); // To handle click on "View More"
  return (
    <View style={styles.itemReview}>
      <View style={styles.reviewTitleDate}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{ flex: 1, fontSize: 16, fontWeight: "bold" }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            textAlign: "right",
            marginLeft: 5,
            fontSize: 16,
            color: "#888888",
          }}
        >
          {props.createdAt}
        </Text>
      </View>
      <Rating
        type="star"
        fractions={1}
        startingValue={props.rating}
        readonly
        tintColor="#E3E3E3"
        imageSize={20}
        style={{ alignItems: "left" }}
      />
      <View style={styles.reviewUser}>
        <Image
          style={styles.userPicture}
          source={{ uri: props.user.picture }}
        />
        <View style={styles.userNameBio}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>
            {props.user.name}
          </Text>
          <Text style={{ fontSize: 16, color: "#888888", marginLeft: 10 }}>
            {props.user.gradeLevels[0]} {props.user.subjects[0]} teacher
          </Text>
        </View>
      </View>
      <Text ellipsizeMode="tail" numberOfLines={3} style={{ fontSize: 16 }}>
        {props.myTake}
      </Text>
      <Pressable
        onPress={() => {
          navigation.navigate("ReviewDetails", { review: props });
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#E3A444",
            textAlign: "right",
            marginVertical: 5,
          }}
        >
          View More
        </Text>
      </Pressable>
    </View>
  );
};
const renderReview = ({ item }) => (
  <ReviewItem
    title={item.title}
    createdAt={item.createdAt}
    user={item.user}
    usage={item.usage}
    myTake={item.myTake}
    rating={item.rating}
    ratingEngagement={item.ratingEngagement}
    ratingEase={item.ratingEase}
  />
);

const writeReviewClicked = () => {
  console.log("Write a review!");
}; // TODO: replace this click handler

const writeReviewClicked = () => {
  console.log("Write a review!");
}; // TODO: replace this click handler

// MODAL OVERLAY: Add to my guides
const AddModal = (props) => {
  const navigation = useNavigation();
  const parent = props.parent;
  const app = props.parent.props.app;
  const user = props.parent.props.user;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={parent.state.showAddAlert}
      onRequestClose={() => {
        parent.setState({ showAddAlert: false });
      }}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => {
          parent.setState({ showAddAlert: false });
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Image
              style={styles.quokkaImage}
              source={require("../assets/Quokkas/yes-quokka.png")}
            />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalMessage}>
              {app.name + " has been added to your guides."}
            </Text>
            <TouchableOpacity
              style={[{ backgroundColor: "#E3A444" }, styles.modalButton]}
              onPress={() => {
                // When "Keep viewing App Info" is clicked
                parent.setState({ showAddAlert: false }); // Hide the modal window
              }}
            >
              <Text style={styles.modalButtonText}>Keep viewing App Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ backgroundColor: "#201947" }, styles.modalButton]}
              onPress={() => {
                // When "Go to My Guides" is pressed
                parent.setState({ showAddAlert: false }); // Hide the modal view
                navigation.navigate("Home", { screen: "My Guides" }); // Navigate to the My Guides screen
              }}
            >
              <Text style={styles.modalButtonText}>Go to My Guides</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

// MODAL OVERLAY: Remove from my guides
const RemoveModal = (props) => {
  const parent = props.parent;
  const app = props.parent.props.app;
  const user = props.parent.props.user;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={parent.state.showRemoveAlert}
      onRequestClose={() => {
        parent.setState({ showRemoveAlert: false });
      }}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => {
          parent.setState({ showRemoveAlert: false });
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Remove {app.name}?</Text>
            <Text style={styles.modalMessage}>
              You will no longer be able to see this app in your guides, but you
              can always add it back later.
            </Text>
            <TouchableOpacity
              style={[{ backgroundColor: "#D01010" }, styles.modalButton]}
              onPress={async () => {
                // When "Yes, I want to remove" is pressed
                // Remove this guide from the user's guides locally
                let index = user.guides.indexOf(app.id);
                if (index > -1) {
                  user.guides.splice(index, 1);
                }
                // Update firestore:
                const userRef = doc(db, "users", user.id);
                await updateDoc(userRef, { guides: user.guides });

                parent.setState({ showRemoveAlert: false }); // Hide the modal window
                parent.props.parentCallback(); // Rerender the parent
              }}
            >
              <Text style={styles.modalButtonText}>Yes, I want to remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ backgroundColor: "#201947" }, styles.modalButton]}
              onPress={() => {
                // When "No, keep this app" is pressed
                parent.setState({ showRemoveAlert: false }); // Hide the modal window
              }}
            >
              <Text style={styles.modalButtonText}>No, keep this app</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

// FINAL OUTPUT
class AppDetailsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemoveAlert: false, // Control visibility of modal windows
      showAddAlert: false,
      reviews: [],
    };
  }

  // Query review data on component mount
  async componentDidMount() {
    // Query all reviews from the selected app
    const querySnapshot = await getDocs(
      collection(db, "guides", this.props.app.id, "reviews")
    );
    const reviewsToBe = querySnapshot.docs.map((reviewSnap) => {
      let review = reviewSnap.data();
      review.id = reviewSnap.id; // Set the id prop on the review object
      return review;
    });

    // Add the user object to each review
    let reviews = [];
    for (let i = 0; i < reviewsToBe.length; i++) {
      let review = reviewsToBe[i];
      const userSnap = await getDoc(doc(db, "users", review.user));
      if (userSnap.exists) {
        let reviewer = userSnap.data();
        reviewer.id = userSnap.id;
        review.createdAt = review.createdAt
          .toDate()
          .toLocaleDateString("en-US");
        review.user = reviewer;
        reviews.push(review);
      }
    }

    // console.log(reviews, "AppDetailsInfo.js");
    this.setState({ reviews });
  }

  render() {
    let appInfo;
    if (this.props.app != null) {
      appInfo = (
        <SafeAreaView>
          <RemoveModal parent={this} />
          <AddModal parent={this} />
          <ScrollView style={styles.scrollView}>
            <View style={styles.basicInfo}>
              <Image
                style={styles.logo}
                source={{ uri: this.props.app.logo }}
              />
              <View style={styles.nameSloganButton}>
                <Text style={styles.appName}>{this.props.app.name}</Text>
                <Text style={styles.appSlogan}>{this.props.app.slogan}</Text>
                {this.props.user.guides.includes(this.props.app.id) ? (
                  <Pressable
                    style={styles.removeButton}
                    onPress={() => {
                      this.setState({ showRemoveAlert: true });
                    }}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.addButton}
                    onPress={async () => {
                      this.props.user.guides.push(this.props.app.id); // Add this guide to the user's guides locally
                      this.setState({ showAddAlert: true }); // Show the modal window

                      // Update firestore:
                      const userRef = doc(db, "users", this.props.user.id);
                      await updateDoc(userRef, {
                        guides: this.props.user.guides,
                      });

                      this.props.parentCallback(); // Rerender the parent
                    }}
                  >
                    <Text style={styles.addText}>Add to My Guides</Text>
                  </Pressable>
                )}
              </View>
            </View>
            <View style={styles.tags}>
              {this.props.app.tags.map((item, index) => {
                return (
                  <View style={{ marginHorizontal: 3, marginTop: 3 }}>
                    <Chip
                      key={index}
                      height={30} // Give desirable height to chip
                      textStyle={{ color: "white", fontSize: 16 }} // Label properties
                      style={{ backgroundColor: "#C4C4C4" }} // Display diff color BG
                    >
                      {item}
                    </Chip>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                borderBottomColor: "#C4C4C4",
                borderBottomWidth: 1,
                marginLeft: 15,
              }}
            />
            <View style={styles.preview}>
              <Text style={styles.sectionTitleText}>Preview</Text>
              <FlatList
                style={{ marginLeft: 15 }}
                horizontal
                data={this.props.app.screenshots}
                renderItem={renderPreviewImg}
                keyExtractor={(_item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View
              style={{
                borderBottomColor: "#C4C4C4",
                borderBottomWidth: 1,
                marginLeft: 15,
                marginBottom: 10,
              }}
            />
            <View style={styles.description}>
              <Text style={styles.sectionTitleText}>Summary</Text>
              <Text style={styles.summaryText}>
                {this.props.app.description}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#C4C4C4",
                borderBottomWidth: 1,
                marginLeft: 15,
                marginTop: 10,
              }}
            />
            <View style={styles.ratingsAndReviews}>
              <View style={styles.ratingsAndReviewsHeader}>
                <Text style={styles.sectionTitleText}>
                  Ratings &amp; Reviews
                </Text>
                {this.props.user.guides.includes(this.props.app.id) ? (
                  <Pressable
                    style={styles.writeReviewButton}
                    onPress={writeReviewClicked}
                  >
                    <Text style={styles.buttonText}>WRITE A REVIEW</Text>
                  </Pressable>
                ) : (
                  <View />
                )}
              </View>
              <RatingCategory
                category="Overall rating"
                value={this.props.app.rating.toFixed(1)}
              />
              <RatingCategory
                category="Student engagement"
                value={this.props.app.ratingEngagement.toFixed(1)}
              />
              <RatingCategory
                category="Ease of use"
                value={this.props.app.ratingEase.toFixed(1)}
              />
              <FlatList
                style={{ marginLeft: 15 }}
                horizontal
                data={this.state.reviews}
                renderItem={renderReview}
                keyExtractor={(review) => review.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      appInfo = <View />;
    }
    return appInfo;
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
    margin: 15,
  },
  nameSloganButton: {
    flex: 1,
  },
  appName: {
    marginLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
  },
  appSlogan: {
    marginLeft: 15,
    fontSize: 16,
    color: "#888888",
  },
  addButton: {
    marginLeft: 15,
    marginTop: 5,
    alignItems: "center",
    alignSelf: "baseline",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#E3A444",
  },
  removeButton: {
    marginLeft: 15,
    marginTop: 5,
    alignItems: "center",
    alignSelf: "baseline",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E3A444",
  },
  addText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  removeText: {
    color: "#E3A444",
    fontSize: 16,
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
  preview: {
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
    height: 360,
  },
  summary: {
    flex: 1,
  },
  summaryText: {
    fontSize: 16,
    marginHorizontal: 15,
  },
  ratingsAndReviews: {
    flex: 1,
    marginTop: 10,
    height: 340,
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
    borderColor: "#C4C4C4",
    borderWidth: 1,
    backgroundColor: "#E3A444",
  },
  userNameBio: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderColor: "#C4C4C4",
    borderWidth: 1,
  },
  itemImage: {
    marginRight: 10,
    width: 200,
    height: "100%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  itemReview: {
    flex: 1,
    marginRight: 10,
    marginTop: 5,
    backgroundColor: "#E3E3E3",
    borderRadius: 20,
    padding: 15,
    width: 300,
    height: "90%",
  },
  ratingCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  ratingValue: {
    display: "flex",
    flexDirection: "row",
  },
  ratingsAndReviewsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  writeReviewButton: {
    marginRight: 15,
    alignItems: "center",
    transform: [{ translateY: -5 }],
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#201947",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "10%",
    marginVertical: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 33,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: -1, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  modalButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalMessage: {
    marginBottom: 10,
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  quokkaImage: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
});

export default AppDetailsInfo;
