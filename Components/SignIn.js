import { GoogleAuthProvider } from "firebase/auth";
import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { collection, getDocs } from "firebase/firestore"; 
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import config from '../firebase/config.js';

export default function SignIn({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [password, onChangePassword] = useState('');
  const [errors, setErrors] = useState({});

  const db = config.db;
  const auth = config.auth;
  const provider = new GoogleAuthProvider();
  
  // Ham nay chay lien tuc de kiem tra xem nguoi dung co dang nhap ko
  // auth.onAuthStateChanged(async user => {

  //   // Neu nguoi dung da dang nhap thi chuyen huong sang trang khac
  //   // console.log(user);
  //   if (user) {
  //     navigation.navigate('Main', { user: user });
  //   }
  // });

  // const signInGoogle = async () => {
  //   const userCred = await signInWithPopup(auth, provider);
  //   const user = userCred.user;
  //   console.log(userCred);
    
  //   // Them nguoi dung

  //   let isNewUser = true;

  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     if ( doc.data().uid == user.uid ) {
  //       isNewUser == false;
  //       return;
  //     } 
  //   });

  //   if (isNewUser) addUser(user);
  // }

  const signIn = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach(doc => {
      const user = doc.data();

      // console.log(user.phoneNumber);
      // console.log(phoneNumber);
      // console.log(user.password);
      // console.log(password);
      
      if ( 
        user.phoneNumber == phoneNumber &&
        user.password == password
      ) {
        const user2 = {
          displayName: user.displayName, 
          phoneNumber: user.phoneNumber, 
          password: user.password
        }
        navigation.navigate('Main', { user: user2 });
      } 
    });

    let errors = {};
    errors.error = 'Login information does not exists.';
    setErrors(errors);
  }

  const styles = GlobalStyle();
  
  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={[styles.container]}>
        <View style={[styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Welcome to Gen Chat</Text>
        
        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={[styles.fontColor]}>Phone Number</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Phone number"
            inputMode='tel'
            maxLength={11}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
          />
        </View>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={[styles.fontColor]}>Password</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Password"
            textContentType='password'
            onChangeText={onChangePassword}
            value={password}
          />
        </View>

        <View style={[styles.hyperlinkComponent, styles.marginSide]}>
          <Pressable onPress={() => navigation.navigate('Sign Up')}>
            <Text style={[styles.underline, styles.fontColor]}>Sign Up</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Sign Up')}>
            <Text style={[styles.underline, styles.fontColor]}>Forgot Password</Text>
          </Pressable>
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} onPress={signIn}>
          <Text style={styles.btnSubmit}>Sign In</Text>
        </Pressable>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text> 

        {/* <View style={[styles.continueWrapper, styles.marginSide]}>
          <View style={styles.line}></View>
          <Text style={[styles.fontColor]}>Or continue with</Text>
          <View style={styles.line}></View>
        </View>

        <Pressable style={[styles.btnGoogleWrapper, styles.marginSide]} onPress={signInGoogle}>
          <Image source={GlobalAsset.googleIcon} style={styles.googleIcon}></Image>
          <Text style={styles.btnGoogle}>Google</Text>
        </Pressable> */}
      </View>
    </ScrollView>
  )
}