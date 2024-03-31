import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { logo } from '../assets/logo.png';

// import GoogleIcon from '../assets/google.js';
import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import auth from '../firebase/config.js'

export default function SignIn({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [password, onChangePassword] = useState('');

  const provider = new GoogleAuthProvider();
  
  // Ham nay chay lien tuc de kiem tra xem nguoi dung co dang nhap ko
  auth.onAuthStateChanged(user => {
    // Neu nguoi dung da dang nhap thi chuyen huong sang trang khac
    if (user) {
      navigation.navigate('Main', {user: user});
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
            maxLength={10}
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

          <Pressable onPress={() => navigation.navigate('')}>
            <Text style={[styles.underline, styles.fontColor]}>Forgot Password</Text>
          </Pressable>
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]}>
          <Text style={styles.btnSubmit}>Sign In</Text>
        </Pressable>

        <View style={[styles.continueWrapper, styles.marginSide]}>
          <View style={styles.line}></View>
          <Text style={[styles.fontColor]}>Or continue with</Text>
          <View style={styles.line}></View>
        </View>

        <Pressable style={[styles.btnGoogleWrapper, styles.marginSide]} onPress={signIn}>
          {/* <GoogleIcon /> */}
          <Text style={styles.btnGoogle}>Google</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
