# CS 147 High-Fidelity Prototype

## App Name
QuokkaTips


## Table of Contents
1. [Video Demo](#video-demo)
1. [Overview](#overview)
1. [Product Spec](#product-spec)
1. [Wireframes](#wireframes)
2. [Schema](#schema)

## Video Demo
[![Watch the video](https://i.imgur.com/5Q22r9c.jpg)](https://web.stanford.edu/class/cs147/projects/TheVirtualLearnscape/QuokkaTips/assets/files/quokkatips_demo_video.mp4)

## Overview
### Description
QuokkaTips is an AR application designed for teachers that superimposes tutorials of classroom software over the user’s field of vision. The app revolves around empathy, as a cute quokka guides the user in real-time learning, discovering, and staying up to date with a set of trending classroom software.

### App Evaluation
- **Category:** Utilities
- **Platform:** Mobile-first experience, utilizes camera view, best used on a smartphone or tablet, iOS or Android
- **Market:** Teachers who need assistance with using classroom software
- **Scope:** V1 allows the user explore classroom software related to their interests/subjects, learn specific features of classroom software (through AR, videos, or text with images), and stay up-to-date with new features of classroom software. V2 can include a social network, where users can follow each other and build their profiles.
- **Habit:** Users can form a habit to check this app (summon Quokka) whenever they encounter technical issues with classroom software for real-time troubleshooting, rather than calling the school's IT. The explore feature of this app can also direct the user in planning lessons and learning from other teachers.

## Product Spec

### 1. User Stories (Required and Optional)

#### Required must-have stories
* User can create a new account, login, and logout
* User can navigate between 3 tabs
* User can view a list of saved guides ("My Guides" tab)
* User can explore a list of unsaved apps ("Explore" tab)
* User can ask Quokka for help in their camera view ("Ask Quokka" tab)
* User can click an app to view its details
* User can navigate between the "Info" and "Features" tabs of an app
* User can add an app to their saved guides
* User can remove an app from their saved guides
* User can see a list of features of an app
* User can click a feature to view its details
* User can view a camera tutorial of a feature
* User can view a video demo of a feature
* User can view text/image instructions of a feature
* User can identify and review new features
* User can pin/unpin a feature
* User can see their chat history with Quokka
* User can explore apps with categorization
* User can click "View All" to expand a category
* User can use a search bar to filter saved guides, unsaved apps, or features of an app
* User can click a review to see its details
* User can view a QuokkaTips walkthrough
* User can view the about page of QuokkaTips


#### Optional stories
* User can write a review for an app
* User can edit their account info
* User can sort guides in different orders
* User can sort features in different orders



### 2. Screen Archetypes

* Login Screen
    * User can login
* Signup Screen
    * User can create a new account
* Saved Guides Screen (Tab)
    * User can view a list of saved guides
    * User can user a search bar to filter saved guides
    * User can click an app to view its details
    * (User can sort their guides in different orders)
* Explore Screen (Tab)
    * User can explore a list of unsaved apps
    * User can explore apps with categorization
    * User can click "View All" to expand a category
    * User can use a search bar to filter unsaved apps
* Help Screen (Tab)
    * User can see Quokka and their camera view
    * User can chat with Quokka
* Chat History Screen
    * User can see their chat history with Quokka
* App Detail Screen
    * User can navigate between the "Info" and "Features" tab of an app
    * User can add an app to their saved guides
    * User can remove an app from their saved guides
    * User can see a list of features of an app
    * User can click a feature to view its details
    * User can use a search bar to filter features of an app
    * User can identify and review new features
    * User can click a review to see its details
    * (User can sort features in different orders)
    * (User can write a review for an app)
* Feature Detail Screen
    * User can view a video demo of a feature
    * User can view a camera tutorial of a feature
    * User can view text/image instructions of a feature
    * User can pin/unpin a feature
* Drawer
    * User can view a QuokkaTips walkthrough
    * User can view the about page of QuokkaTips
    * User can logout
    * (User can edit their account info)

### 3. Navigation

**Screen-to-screen Navigation**

* Login Screen
=> Saved Guides Screen
* Signup Screen
=> Saved Guides Screen
* Saved Guides Screen
=> App Detail Screen
* Explore Screen
=> App Detail Screen
* Help Screen
=> Chat History Screen
* Chat History Screen
=> None
* App Detail Screen
=> Feature Detail Screen
* Feature Detail Screen
=> None
* Drawer
=> None

## Wireframes

### Digital
<img src="https://i.imgur.com/zqyoI7w.png" width="100"><img src="https://i.imgur.com/pTkOmwZ.png" width="100"><img src="https://i.imgur.com/VNfq3Hz.png" width="100"><img src="https://i.imgur.com/L9A7fLN.png" width="100"><img src="https://i.imgur.com/7Fdfsuy.png" width="100"><img src="https://i.imgur.com/dWmlxoc.png" width="100"><img src="https://i.imgur.com/muEzDi7.png" width="100"><img src="https://i.imgur.com/GHCjcnq.png" width="100"><img src="https://i.imgur.com/Mo8aMXY.png" width="100"><img src="https://i.imgur.com/Iixby88.png" width="100"><img src="https://i.imgur.com/D7Mom9G.png" width="100"><img src="https://i.imgur.com/21J2SFO.png" width="100"><img src="https://i.imgur.com/9mzU4dW.png" width="100"><img src="https://i.imgur.com/IXACGy7.png" width="100"><img src="https://i.imgur.com/jUSvFVl.png" width="100"><img src="https://i.imgur.com/Yi4bFT5.png" width="100"><img src="https://i.imgur.com/LumyHwV.png" width="100"><img src="https://i.imgur.com/0llFD1v.png" width="100"><img src="https://i.imgur.com/6LKXBGO.png" width="100"><img src="https://i.imgur.com/nLskBwa.png" width="100">

### Interactive Prototype
https://www.figma.com/proto/9pOVphglbGSdI2kzPdryGK/Med-Fi-Prototype?node-id=21%3A691&scaling=scale-down&page-id=5%3A8&starting-point-node-id=9%3A727

## Schema 
### Models
Guide
| Property   | Type       | Description                                      |
| ---------- | ---------- | ------------------------------------------------ |
| id      | Integer    | Unique id for a classroom software               |
| name       | String     | The name of the classroom software               |
| slogan     | String     | The slogan of the classroom software             |
| description| String     | Short description of the classroom software      |
| rating     | Double     | Rating (out of 5) of the classroom software      |
| ratingEngagement| Double  | Rating of student engagement (out of 5)            |
| ratingEase      | Double  | Rating of ease of use (out of 5)                   |
| logo       | String     | URL of the logo of the classroom software     
| numRatings | Integer    | Number of ratings                               |
| numRatingsEngagement | Integer    | Number of ratings                               |
| numRatingsEase | Integer    | Number of ratings                               |
| tags       | String[]   | tags of the classroom software                   |
| screenshots| String[]   | URLs of screenshots of the classroom software    |
| reviews    | Review[]   | Reviews of the classroom software                |
| features   | Feature[]  | Features of the classroom software               |

User
| Property    | Type     | Description                                    |
| ----------- | -------- | ---------------------------------------------- |
| id      | String   | Unique id for the user                         |
| email	  | String   | Email of the user                           |
| name | String | Name of the user |
| password	  | String   | Password of the user (protected)               |
| subjects    | String[] | Subjects that the user teaches                 |
| gradeLevels | String[] | Grade levels that the user teaches             |
| guides        | String[]| List of guideIds that the user uses              |
| picture     | String   | URL of the profile picture of the user         |
| pinned     | Map<String, String[]>     | Map of guideId -> list of featureIds|
| unread     | Map<String, String[]>     | Map of guideId -> list of featureIds|

Feature
| Property    | Type    | Description                                         |
| ----------- | ------- | --------------------------------------------------- |
| id   | Integer | Unique id for the feature                           |
| name        | String  | The name of the feature                             |
| description | String  | Short description of the feature                    |
| updates     | String  | Newest updates of the feature                       |
| guide         | Integer     | The guideId of the guide that the feature belongs to                 |
| videoId	  | String  | Video ID of the Youtube video (e.g., `C4sptqFb0Bk`)        |
| instructions| String[]  | Text tutorial of the feature (image URL or text) |

Review
| Property        | Type    | Description                                        |
| --------------- | ------- | -------------------------------------------------- |
| id        | Integer | Unique id for the review                           |
| createdAt       | Date    | Date at which the review was created               |
| title           | String  | Short title for the review                         |
| user            | String    | The userId of the user who wrote the review                      |
| guide             | Integer     | The guideId of the guide that the review is about                   |
| rating          | Double  | Overall rating (out of 5)                          |
| ratingEngagement| Double  | Rating of student engagement (out of 5)            |
| ratingEase      | Double  | Rating of ease of use (out of 5)                   |
| usage 	      | String  | How the user uses the app                          |
| myTake          | String  | The user's take on the app                         |

### Networking
#### Reference
| CRUD    | HTTP Verb | Example                          |
| ------- | --------- | -------------------------------- |
| Create  | POST      |	Creating a new post              |
| Read    | GET	      | Fetching posts for a user's feed |
| Update  | PUT	      | Changing a user's profile image  |
| Delete  | DELETE	  | Deleting a comment               |

#### Network Requests by Screen
Saved Guides Screen
* **Read/GET**: Query all the user's saved guides

Explore Screen
* **Read/GET**: Query all classroom software

Help Screen
* **Read/GET**: Query the Quokka AR tutorial
* **Create/POST**: Add to the user's chat history with Quokka

Chat History Screen
* **Read/GET**: Query the user's chat history with Quokka

App Detail Screen
* **Read/GET**: Query basic info, reviews, and features of an app
* **Create/POST**: User writes an review for the app
* **Create/POST**: Add an app to the user's saved guides
* **Delete/DELETE**: Remove an app from the user's saved guides

Feature Detail Screen
* **Read/GET**: Query basic info of a feature
* **Read/GET**: Query the Quokka AR tutorial
* **Update/PUT**: Mark the feature as read or unread
* **Update/PUT**: Mark the feature as pinned or unpinned
