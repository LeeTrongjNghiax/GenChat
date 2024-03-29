import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import React from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

export default function PhoneInput({ navigation }) {
  const route = useRoute()
  const user = route.params?.user;
  // console.log(user);

  const styles = GlobalStyle();
  const assets = GlobalAsset();

  return (
    <ScrollView style={{marginTop: 20, marginBottom: 20}}>
      <View style={styles.container}>
        <View style={styles.twoLogoWrapper}>
          <Image source={{uri:assets.logo}} style={styles.logo}></Image>
          <Image source={{uri:user.photoURL}} style={styles.logo}></Image>
        </View>
        
        <Text style={styles.title}>Welcome, {user.displayName}</Text>

        <Text style={styles.description}>Please enter the phone number that we can use to send the SMS code:</Text>

        <View style={styles.inputComponent}>
          <TextInput
            style={styles.input}
            inputMode='tel'
            placeholder="Phone Number"
            maxLength={10}
          />
        </View>

        <Pressable style={styles.btnSubmitWrapper} onPress={() => navigation.navigate('OTP', {user: user})}>
          <Text style={styles.btnSubmit}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
