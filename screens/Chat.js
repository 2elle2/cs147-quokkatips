/**
 * Sample code from https://www.npmjs.com/package/react-native-gifted-chat
 */

import React, { useState, useCallback, useEffect } from 'react'
import { render } from 'react-dom';
import { TextPropTypes } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from "@react-navigation/native";

const quokkaAvatar = require('../assets/Quokkas/neutral-standing.png');
const quokka = {
  _id: 2,
  name: 'Quokka',
  avatar: quokkaAvatar,
}

export default function (props) {
  const navigation = useNavigation();
  return <Chat {...props} navigation={navigation} />;
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        )
      }
    }, () => {
      this.props.setMessages(this.state.messages);
    })
  }

  onQuickReply(quickReplies) {
    const createdAt = new Date()
    if (quickReplies.length >= 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: quickReplies[0].title,
          user: {
            _id: 1
          },
        },
      ]);
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: "Got it, thanks! Sending you back to the camera view for more instructions.",
          user: quokka,
        },
      ]);
      this.props.setView(2);
      setTimeout(() => {
        this.onSend([{
          _id: Math.round(Math.random() * 1000000),
          text: "Once you have Zoom open, click the green \"Share Screen\" button.",
          createdAt: new Date(),
          user: quokka,
        }]);
        this.props.navigation.goBack();
      }, 3000);
    } else {
      console.warn('replies param is not set correctly')
    }
    // var sendBotResponsetxt = "Thanks";
    // this.sendBotResponse(sendBotResponsetxt);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        onQuickReply={this.onQuickReply.bind(this)}
      />
    )
  }
}