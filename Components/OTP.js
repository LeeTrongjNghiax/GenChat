import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { signInWithPhoneNumber } from "firebase/auth";
import { useRoute } from "@react-navigation/native";
import React, { useState } from 'react';
import registerUser from "../services/registerUser.js";
import config from "../firebase/config.js";

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

export default function OTP({ navigation }) {
  const [OTP, setOTP] = useState('');
  const [errors, setErrors] = useState({});
  const [alerts, setAlerts] = useState({});

  const route = useRoute()
  const user = route.params?.user;

  const styles = GlobalStyle();

  const otps = route.params?.otp;
  const auth = config;
  const formatPh = otps.formatPh;
  const appVerifier = otps.appVerifier;

  console.log(signInWithPhoneNumber)

  const handleSignUp = async () => {
    try {
      await registerUser(user.name, user.phoneNumber, user.password, user.email);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const signIn = () => {
    let errors = {};
    let alerts = {};

    console.log("111");
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alerts.alert = "OTP sended successfully!";
        setAlerts(alerts);
      })
      .catch((error) => {
        errors.error = "Error sending OTP: " + error;
        setErrors(errors);
        console.error("Error sending OTP: " + error);
      });
    console.log("222");
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(OTP)
      .then(async (res) => {
        handleSignUp();
        navigation.navigate("Login");
      })
      .catch((error) => {
        errors.error = "Error verifying OTP: " + error;
        setErrors(errors);
        console.error("Error verifying OTP: " + error);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <View style={[styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Welcome, {user.displayName}</Text>

        <Pressable style={[styles.marginSide]} onPress={
          () => {signIn();}
        }>
          <Text style={[styles.underline, styles.fontColor]}>Sending Code to {user.phoneNumber}</Text>
        </Pressable>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <TextInput
            style={[styles.input, styles.fontColor]}
            inputMode='numeric'
            maxLength={6}
            onChangeText={setOTP}
            value={OTP}
            placeholder={"Enter the code from the sms we send to " + user.phoneNumber}
          />
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} onPress={
          () => {onOTPVerify();}
        }>
          <Text style={styles.btnSubmit}>Submit Code</Text>
        </Pressable>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text>
        <Text style={[styles.success, styles.marginSide]}>{alerts.alert}</Text>
      </View>
    </ScrollView>
  )
}