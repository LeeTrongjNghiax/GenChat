import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TextInput, ScrollView, View, Image, Text, Pressable } from 'react-native'
import GlobalAsset from '../GlobalAsset'
import socketIOClient from "socket.io-client";
import { useRoute } from "@react-navigation/native";
import Chat from "./Chat.js";

import socket from '../utils/socket'

export default function ChatUserDetail({ navigation }) {
  // ----------------------

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket;

    socketRef.current.on("1", (mess) => {
      console.log("------------------foundRoom-2--------------------");
      console.log(mess);
      setChatMessages(mess);
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // ----------------------

  const [message, onChangeMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const route = useRoute();

  const roomId = route.params?.roomId
  const userGet = route.params?.userGet
  const userSend = route.params?.userSend
  console.log("User");
  console.log(userGet);
  console.log(userSend);

  useEffect(() => {
    // 5. Tim lai phong vua them vao
    
    // socket.on("roomsList", (chatRooms) => {
    //   console.log("------------------roomsList--------------------");
    //   console.log(chatRooms);
    // })
    
    // socket.emit("findRoom", roomId);

    // socket.on("foundRoom", (roomChats) => {
    //   console.log("------------------foundRoom--------------------");
    //   console.log(roomChats);
    //   setChatMessages(roomChats);
    // });
    
    // socket.on(roomId, (mess) => {
    //   console.log("------------------foundRoom--------------------");
    //   console.log(mess);
    //   setChatMessages(mess);
    // })
    // socket.on(userGet._id, (mess) => {
    //   console.log("------------------foundRoom--------------------");
    //   console.log(mess);
    //   setChatMessages(mess);
    // })
    // previousMess.current = message;

   
  }, []);
  
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    console.log("Message data:");
    console.log({
      userGet: userGet._id,
      userSend: userSend._id,
      message,
      room_id: roomId,
      timestamp: { hour, mins },
      
    });

    // Emit message lai len socket
    socket.emit("newMessage", {
      userGet: userGet._id,
      userSend: userSend._id,
      message,
      room_id: roomId,
      timestamp: { hour, mins },
    });
  };
 
  return (
   
    <View>
      <View
        style={{
          flex: 1, 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 10, 
          padding: 10, 
        }}
      >
        <Image
          source={{
            uri: GlobalAsset.defaultLogoImage
          }}
          style={{
            width: 40, 
            borderRadius: 20, 
            aspectRatio: 1 / 1, 
          }}
        >
        </Image>

        <Text>Nguyen Thanh Khoa</Text>
      </View>

      <View style={{height: 370}}>
        <ScrollView contentContainerStyle={{  }}>
          {
            chatMessages.map(elem => <Chat
              data={elem}
              key={elem.id}
            />
            )
          }
        </ScrollView>
      </View>

      <View style={{
        flexDirection: 'row', 
        alignItems: 'center'
      }}>
        <TextInput
          style={{
            padding: 10, 
            backgroundColor: "#ffffff", 
            flexGrow: 3
          }}
          onChangeText={onChangeMessage}
          placeholder='Message...'
        >
        </TextInput>
        <Pressable
          style={{
            justifyContent: 'center',
            flexGrow: 0, 
            flexDirection: 'row', 
            gap: 20, 
            padding: 10, 
          }}
        >
          <Image
            source={GlobalAsset.paperClipIcon}
            style={{
              width: 25, 
              height: 25, 
            }}
          >
          </Image>
        </Pressable>
        <Pressable
          style={{
            justifyContent: 'center',
            flexGrow: 0, 
            flexDirection: 'row', 
            gap: 20, 
            padding: 10, 
          }}
          onPress={handleNewMessage}
        >
          <Image
            source={GlobalAsset.sendIcon}
            style={{
              width: 25, 
              height: 25, 
            }}
          >
          </Image>
        </Pressable>
      </View>
    </View>
  )
}
