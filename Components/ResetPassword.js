import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { collection, query, where, updateDoc, getDocs  } from "firebase/firestore";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useRoute } from "@react-navigation/native";
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import config from '../firebase/config.js';

export default function ResetPassword({ navigation }) {
  const [password, onChangePassword] = useState('');
  const [repeatedPassword, onChangeRepeatedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const db = config.db;
  const auth = config.auth;
  const styles = GlobalStyle();

  const route = useRoute()
  const phoneNumber = route.params?.phoneNumber;

  const toggleShowPassword = () => setShowPassword(!showPassword); 

  const toggleShowRepeatedPassword = () => setShowRepeatedPassword(!showRepeatedPassword);

  const updatePassword = async () => {
    const users = collection(db, "users");

    const q = query(users, where("phoneNumber", "==", phoneNumber));
    
    const querySnapshot = await getDocs(q);

    await updateDoc(querySnapshot, {password: password});

    // querySnapshot.forEach(doc => {
    //   const user = doc.data();
      
    //   if ( 
    //     user.phoneNumber == phoneNumber &&
    //     user.password == password
    //   ) {
    //     const user2 = {
    //       displayName: user.displayName, 
    //       phoneNumber: user.phoneNumber, 
    //       password: user.password
    //     }
    //     navigation.navigate('Main', { user: user2 });
    //   }
    // });
  }

  const verifyInput = () => {
    let errors = {};

    if (!password)
      errors.error = 'Password is required.';
    else if (password.length < 8)
      errors.error = 'Password must be at least 8 characters.';
    else if (password !== repeatedPassword)
      errors.error = 'Password does not match Repeated Password.';

    if (errors.error)
      setErrors(errors);
    else
        updatePassword();
  }

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1}>
      <View style={styles.container}>
        <View style={[styles.marginSide]}>
          <Image source={GlobalAsset.logo} style={styles.logo}></Image>
        </View>
        
        <Text style={[styles.title, styles.marginSide, styles.fontColor]}>Reset Password</Text>

        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={styles.fontColor}>Password</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="New Password"
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

        <View style={[styles.inputComponent, styles.marginSide]}>
          <Text style={styles.fontColor}>Repeat Password</Text>
          <TextInput
            style={[styles.input, styles.fontColor]}
            placeholder="Repeated New Password"
            secureTextEntry={!showRepeatedPassword}
            onChangeText={onChangeRepeatedPassword}
            value={repeatedPassword}
          />
          <MaterialCommunityIcons 
            name={showRepeatedPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color="#aaa"
            onPress={toggleShowRepeatedPassword} 
          /> 
        </View>

        <Text style={[styles.error, styles.marginSide]}>{errors.error}</Text> 

        <Pressable style={[styles.btnSubmitWrapper, styles.marginSide]}
          onPress={verifyInput}
        >
          <Text style={styles.btnSubmit}>Update Password</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
