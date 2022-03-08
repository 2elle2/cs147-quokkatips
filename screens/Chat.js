/**
 * Sample code from https://www.npmjs.com/package/react-native-gifted-chat
 */

import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const quokkaAvatar = require('../assets/Quokkas/neutral-standing.png');
 
const quokka = {
  _id: 2,
  name: 'Quokka',
  avatar: quokkaAvatar,
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi there! How can I help?',  
        createdAt: new Date(),
        // quickReplies: {
        //   type: 'radio', // or 'checkbox',
        //   keepIt: true,
        //   values: [
        //     {
        //       title: 'I need help sharing my screen',
        //       value: 'help_share',
        //     },
        //     {
        //       title: 'I need help recording my screen',
        //       value: 'help_recording',
        //     },
        //   ],
        // },
        user: quokka,
      },
    ])
  }, [])


  // TODO: Quokka's next message: "Got it! Let's go back to the camera view for more instructions."
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}

