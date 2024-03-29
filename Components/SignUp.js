import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, { useState } from 'react';

import GlobalStyle from '../GlobalStyle.js'
import GlobalAsset from '../GlobalAsset.js';

export default function SignUp({ navigation }) {
  const [name, onChangeName] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [password, onChangePassword] = useState('');
  const [repeatedPassword, onChangeRepeatedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false); 
  const [errors, setErrors] = useState({}); 

  const styles = GlobalStyle();
  const assets = GlobalAsset();

  const toggleShowPassword = () => setShowPassword(!showPassword); 

  const toggleShowRepeatedPassword = () => setShowRepeatedPassword(!showRepeatedPassword); 

  const submit = () => {
    let errors = {};

    console.log(name);
    console.log(phoneNumber);
    console.log(password);
    console.log(repeatedPassword);

    if (!password)
      errors.error = 'Password is required.';
    else if (password.length < 8)
      errors.error = 'Password must be at least 8 characters.';
    else if (password !== repeatedPassword)
      errors.error = 'Password does not match Repeated Password.';

    if (!phoneNumber)
      errors.error = 'Phone Number is required.';
    else if (!/0[0-9]{9}/.test(phoneNumber))
      errors.error = 'Phone Number must have exactly 10 numbers and started with 0.';

    if (!name)
      errors.error = 'Name is required.';

    if (errors.error)
      setErrors(errors);
    else
      navigation.navigate('OTP', {user: {
        displayName: name, phoneNumber, password
      }});
  }

  return (
    <ScrollView style={{marginTop: 20, marginBottom: 20}}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={{uri:assets.logo}} style={styles.logo}></Image>
        </View>
        
        <Text style={styles.title}>Sign Up to Gen Chat</Text>

        <View style={styles.inputComponent}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={onChangeName}
            value={name}
          />
        </View>
        
        <View style={styles.inputComponent}>
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            inputMode='tel'
            maxLength={10}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
          />
        </View>

        <View style={[styles.inputComponent]}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
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

        <View style={styles.inputComponent}>
          <Text>Repeat Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
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

        <Text style={styles.error}> {errors.error} </Text> 

        <Pressable style={styles.btnSubmitWrapper} onPress={submit}>
          <Text style={styles.btnSubmit}>Sign Up</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
