import { TextInput, ScrollView, View, Pressable, Text, Modal, Image } from "react-native";
import ChatUser from "./ChatUser";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import getRequestSend from '../services/getRequestSend'
import getRequestGet from '../services/getRequestGet'
import getInfor from "../services/getInfor.js";
import getListFriend from "../services/getListFriend.js";
import findUserByPhoneNumber from "../services/findUserByPhoneNumber.js";
import findRoomByManyPhoneNumber from "../services/findRoomByManyPhoneNumber.js"

import GlobalStyle from "../GlobalStyle.js";
import GlobalAsset from '../GlobalAsset';

import socket from "../utils/socket.js";

function ChatHistory({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState("");
  const [friends, onChangeFriends] = useState([]);

  const styles = GlobalStyle();

  const route = useRoute();
  const userSend = route.params?.user;
  
  const findUser = async () => {
    let userGet;

    try {
      userGet = await findUserByPhoneNumber(phoneNumber);      
    } catch (error) {
      userGet = null;
      console.error("Error error:", error);
    }

    navigation.navigate("FindingUser", {userSend: userSend, userGet: userGet})
  };

  const goToSentFriendRequestPage = async () => {
    const users = [];
    const userGets = await getRequestGet(userSend.phoneNumber);

    for (let i = 0; i < userGets.data.length; i++) {
      const user = await getInfor(userGets.data[i]);
      users.push(user.data);
    }

    navigation.navigate("SentFriendRequest", {user: userSend, userGets: users})
  }

  const goToReceivedFriendRequestPage = async () => {
    const users = [];
    const userSends = await getRequestSend(userSend.phoneNumber);

    for (let i = 0; i < userSends.data.length; i++) {
      const user = await getInfor(userSends.data[i]);
      user.data.roomId = handleCreateRoom(user.data.id, userSend.id);
      users.push(user.data);
    }

    navigation.navigate("ReceivedFriendRequest", {user: userSend, userSends: users})
  }

  const handleCreateRoom = async (...ids) => {
    // console.log("handleCreateRoom");
    
    // 1. Goi API tao pohng
    const room = await findRoomByManyPhoneNumber(ids)

    console.log("Room");
    console.log(room.data._id);
    
    // 2. Emit id phone len socket
    socket.emit("createRoom", room.data._id);
    
    return room.data._id;
  };

  useEffect(() => {
    (async () => {
      const friends = [];
      const friendList = await getListFriend(userSend.phoneNumber);
  
      for (let i = 0; i < friendList.data.length; i++) {
        const user = await getInfor(friendList.data[i]);
        user.data.roomId = await handleCreateRoom(user.data.phoneNumber, userSend.phoneNumber)
        console.log("User room id");
        console.log(user.data.roomId);
        friends.push(user.data);
      }
  
      onChangeFriends(friends);
    })();
  }, []);

  return (
    <ScrollView>
      <View style={{
        gap: 10
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          gap: 10
        }}>
          <TextInput
            style={{
              backgroundColor: "#eeeeee",
              padding: 16, 
              flex: 5
            }}
            placeholder='Find new friend here' 
            onChangeText={onChangePhoneNumber}
          >
          </TextInput>

          <Pressable
            style={{
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
            onPress={findUser}
          >
            <Image
              source={GlobalAsset.searchIcon}
              style={{
                width: 30, 
                height: 30
              }}
            >

            </Image>
          </Pressable>
        </View>

        <View style={[
          {
            flex: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-around', 
            gap: 10, 
            margin: 10
          }
        ]}>
          <Pressable
            style={[styles.btnSubmitWrapper, {flex: 1, justifyContent: 'center'}]}
            onPress={goToSentFriendRequestPage}
          >
            <Text style={[styles.btnSubmit, {fontSize: 16}]}>
              List of sent friend requests
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btnSubmitWrapper, {flex: 1, justifyContent: 'center'}]}
            onPress={goToReceivedFriendRequestPage}
          >
            <Text style={[styles.btnSubmit, {fontSize: 16}]}>
              List of received friend requests
            </Text>
          </Pressable>
        </View>

        <View>
          {friends.map((elem, i) => <ChatUser navigation={navigation} key={i} userGet={elem} userSend={userSend} />)}
        </View>
      </View>
    </ScrollView>
  );
}

export default ChatHistory;