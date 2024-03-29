import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from 'react'

import GlobalStyle from '../GlobalStyle.js';
import auth from '../firebase/config.js'

export default function Profile({ navigation }) {
  const route = useRoute();
  const user = route.params?.user;

  const styles = GlobalStyle();
    
  const appSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate('Sign In', {user: null});
    }).catch((error) => {
      console.log(error);
    });
  }
  
  return (
    <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={[styles.logoWrapper, {
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center'
        }]}>
          <Image source={{ uri: user.photoURL }} style={{
            width: 100, 
            borderRadius: 50, 
            aspectRatio: 1 / 1
          }}></Image>
        </View>
        
        <View style={{
          marginLeft: 40, 
          marginRight: 40, 
          flexDirection: 'row', 
        }}>
          <Text style={[styles.flex1]}>Name:</Text>
          <Text style={[styles.flex1, styles.bolder]}>{user.displayName}</Text>
        </View>

        <View style={{
          marginLeft: 40, 
          marginRight: 40, 
          flexDirection: 'row', 
        }}>
          <Text style={[styles.flex1]}>Phone Number</Text>
          <Text style={[styles.flex1, styles.bolder]}>0938225745</Text>
        </View>

        <Pressable style={styles.btnSubmitWrapper} onPress={appSignOut}>
          <Text style={styles.btnSubmit}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
