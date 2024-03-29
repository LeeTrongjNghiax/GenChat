import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import React from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

export default function OTP({ navigation }) {
  const route = useRoute()
  const user = route.params?.user;

  const styles = GlobalStyle();
  const assets = GlobalAsset();

  return (
    <ScrollView style={{marginTop: 20, marginBottom: 20}}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={{uri:assets.logo}} style={styles.logo}></Image>
        </View>
        
        <Text style={styles.title}>Welcome, {user.displayName}</Text>

        <Text style={styles.description}>Enter the code from the sms we send to {user.phoneNumber}</Text>

        <View style={styles.inputComponent}>
          <TextInput
            style={styles.input}
            inputMode='numeric'
            placeholder="OTP"
            maxLength={6}
          />
        </View>

        <Pressable style={styles.btnSubmitWrapper} onPress={() => navigation.navigate('Main', {user})}>
          <Text style={styles.btnSubmit}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
