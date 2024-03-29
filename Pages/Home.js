import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, useWindowDimensions  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import PhoneInput from '../Components/PhoneInput.js';
import SignIn from '../Components/SignIn.js';
import SignUp from '../Components/SignUp.js';
import OTP from '../Components/OTP.js';

export default function Home() {
  const styles = GlobalStyle();
  const assets = GlobalAsset();
  const layout = useWindowDimensions();

  let coverImageView = <View style={styles.coverImageWrapper} >
    <Image style={styles.coverImage} source={{uri:assets.coverImage}}></Image>
  </View>;

  if (layout.width < layout.height * 3 / 2) {
    coverImageView = <></>
  }

  const Stack = createNativeStackNavigator();

  return (
    <View style={{
      flex: 1,
      flexDirection: "row", 
      backgroundColor: '#ecf0f1',
    }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Phone Input" component={PhoneInput} />
          <Stack.Screen name="OTP" component={OTP} />
        </Stack.Navigator>

        {coverImageView}
      </NavigationContainer>
    </View>
  )
}