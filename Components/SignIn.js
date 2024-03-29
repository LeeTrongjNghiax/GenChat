import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import React from 'react';

import GoogleIcon from '../assets/google.js';
import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import auth from '../firebase/config.js'

export default function SignIn({ navigation }) {
  const provider = new GoogleAuthProvider();
  
  // Ham nay chay lien tuc de kiem tra xem nguoi dung co dang nhap ko
  auth.onAuthStateChanged(user => {
    // Neu nguoi dung da dang nhap thi chuyen huong sang trang khac
    if (user) {
      navigation.navigate('Phone Input', {user: user});
    }
  });

  const signIn = () => {
    console.log("Pressed Sign in");
    signInWithRedirect(auth, provider);

    // getRedirectResult(auth).then((result) => {
    //   // This gives you a Google Access Token. You can use it to access Google APIs.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;

    //   // The signed-in user info.
    //   const user = result.user;
    //   console.log(result);
    //   // IdP data available using getAdditionalUserInfo(result)
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  }

  const styles = GlobalStyle();
  const assets = GlobalAsset();
  
  return (
    <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={{uri:assets.logo}} style={styles.logo}></Image>
        </View>
        
        <Text style={styles.title}>Welcome to Gen Chat</Text>
        
        <View style={styles.inputComponent}>
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            inputMode='tel'
            maxLength={10}
          />
        </View>

        <View style={styles.inputComponent}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            textContentType='password'
          />
        </View>

        <View style={styles.hyperlinkComponent}>
          <Pressable onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.underline}>Sign Up</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('')}>
            <Text style={styles.underline}>Forgot Password</Text>
          </Pressable>
        </View>

        <Pressable style={styles.btnSubmitWrapper}>
          <Text style={styles.btnSubmit}>Sign In</Text>
        </Pressable>

        <View style={styles.continueWrapper}>
          <View style={styles.line}></View>
          <Text>Or continue with</Text>
          <View style={styles.line}></View>
        </View>

        <Pressable style={styles.btnGoogleWrapper} onPress={signIn}>
          <GoogleIcon />
          <Text style={styles.btnGoogle}>Google</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
