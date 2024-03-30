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
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <View style={[styles.marginSide]}>
          <Image source={{uri:assets.logo}} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Welcome, {user.displayName}</Text>

        <Text style={[styles.marginSide, styles.fontColor]}>Enter the code from the sms we send to {user.phoneNumber}</Text>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <TextInput
            style={[styles.input, styles.fontColor]}
            inputMode='numeric'
            placeholder="OTP"
            maxLength={6}
          />
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} onPress={() => navigation.navigate('Main', {user})}>
          <Text style={styles.btnSubmit}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
