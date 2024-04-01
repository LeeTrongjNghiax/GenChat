import React, { useState, useEffect } from 'react';
import { Button, TextInput, View } from 'react-native';
// import auth from '../firebase/config.js';
import auth from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  //   If null, no SMS has been sent
  console.log(auth);
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

  
  // Handle the button press
  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber('0374858237');
      setConfirm(confirmation);    
    } catch (error) {
      console.log("Error signing in with phone number: " + error);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Error confirming code: ' + error);
    }
  }

  signInWithPhoneNumber();

  return (
      
    <View>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>

    //   <View></View>
  );
}