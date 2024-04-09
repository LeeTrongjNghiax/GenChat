import React from 'react'
import { TextInput, ScrollView, Text, View, Image, Pressable } from 'react-native'
import GlobalAsset from "../GlobalAsset.js";

export default function ChatUser({ navigation, userGet, userSend }) {
  console.log(userGet);

  return (
    <Pressable
      onPress={() => {navigation.navigate("ChatUserDetail", {userGet: userGet, userSend: userSend, roomId: userGet.roomId})}}
      style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 10, 
        gap: 10
      }}
    >
      <Image
        source={{
          uri: GlobalAsset.defaultLogoImage
        }}
        style={{
          width: 60, 
          borderRadius: 30, 
          aspectRatio: 1 / 1, 
        }}
      >  
      </Image>
      <View
        style={{
          flex: 1, 
          alignContent: 'space-around', 
          justifyContent: 'space-around', 
          gap: 10
        }}
      >
        <Text style={{fontWeight: 'bold'}}>{userGet.name}</Text>
        <Text>{userGet.phoneNumber}</Text>
        <Text>Room id: {userGet.roomId}</Text>
      </View>
    </Pressable>
  )
}
