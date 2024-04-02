import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import config from '../firebase/config.js';

export default function SignIn({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
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

  const signInGoogle = async () => {
    const userCred = await signInWithPopup(auth, provider);
    const user = userCred.user;
    console.log(userCred);
    
    // Them nguoi dung
    
    if (userCred.user.phoneNumber == null)
      navigation.navigate('Phone Input', { user: {
        displayName: userCred.user.displayName, 
        photoURL: userCred.user.photoURL, 
      } });
  }

  const addUser = async (user) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        displayName: user.displayName, 
        phoneNumber: user.phoneNumber, 
        photoURL: user.photoURL ? user.photoURL : "default", 
        password: user.password
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const signIn = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach(doc => {
      const user = doc.data();
      
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
  
  const toggleShowPassword = () => setShowPassword(!showPassword); 

  const styles = GlobalStyle();



  const updatePassword = async () => {
    const users = collection(db, "users");

    // const q = query(users, where("phoneNumber", "==", "84932659945"));
    const q = await getDocs(collection(db, "users"));
    
    console.log("1");
    // const querySnapshot = await getDocs(q);
    console.log("2");

    // collection(db, "users").doc(password).update({password: "lmao"});
    q.forEach(doc2 => {
      console.log(doc2);
      updateDoc(doc(db, "users", 
        // "displayName", "Nghia Dan", 
        "password", password
      ), {"password": "lmao"})
    })
    console.log("3");
    
  }

  // updatePassword();


  
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
            secureTextEntry={!showPassword}
            onChangeText={onChangePassword}
            value={password}
          />
          <MaterialCommunityIcons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color="#aaa"
            onPress={toggleShowPassword} 
          /> 
        </View>

        <View style={[styles.hyperlinkComponent, styles.marginSide]}>
          <Pressable onPress={() => navigation.navigate('Sign Up')}>
            <Text style={[styles.underline, styles.fontColor]}>Sign Up</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Forgot Password')}>
            <Text style={[styles.underline, styles.fontColor]}>Forgot Password</Text>
          </Pressable>
        </View>

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]} onPress={signIn}>
          <Text style={styles.btnSubmit}>Sign In</Text>
        </Pressable>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text> 

        <View style={[styles.continueWrapper, styles.marginSide]}>
          <View style={styles.line}></View>
          <Text style={[styles.fontColor]}>Or continue with</Text>
          <View style={styles.line}></View>
        </View>

        <Pressable style={[styles.btnGoogleWrapper, styles.marginSide]} onPress={signInGoogle}>
          <Image source={GlobalAsset.googleIcon} style={styles.googleIcon}></Image>
          <Text style={styles.btnGoogle}>Google</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}