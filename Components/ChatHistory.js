import { TextInput, ScrollView, View, Pressable, Image, Text } from 'react-native'
import React from 'react'
import ChatUser from './ChatUser';
import GlobalAsset from '../GlobalAsset';
import GlobalStyle from '../GlobalStyle';

export default function ChatHistory({ navigation }) {
  const styles = GlobalStyle();

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
          >
          </TextInput>

          <Pressable
            style={{
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
            onPress={() => navigation.navigate("FindingUser")}
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
            onPress={() => navigation.navigate("SentFriendRequest")}
          >
            <Text style={[styles.btnSubmit, {fontSize: 16}]}>
              List of sent friend requests
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btnSubmitWrapper, {flex: 1, justifyContent: 'center'}]}
            onPress={() => navigation.navigate("ReceivedFriendRequest")}
          >
            <Text style={[styles.btnSubmit, {fontSize: 16}]}>
              List of received friend requests
            </Text>
          </Pressable>
        </View>

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
