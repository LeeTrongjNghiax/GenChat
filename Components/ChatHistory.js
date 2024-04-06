import { TextInput, ScrollView, View } from 'react-native'
import React from 'react'
import ChatUser from './ChatUser';

export default function ChatHistory({ navigation }) {
  return (
    <ScrollView>
      <View>
        <TextInput
          style={{
            backgroundColor: "#eeeeee",
            padding: 10
          }}
          placeholder='Find new friend here'
        >
        </TextInput>
        <View>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
          <ChatUser navigation={navigation}/>
        </View>
      </View>
    </ScrollView>
  )
}
