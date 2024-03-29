import React from 'react';
import { View, Image, useWindowDimensions  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GlobalStyle from '../GlobalStyle.js';
import GlobalAsset from '../GlobalAsset.js';

import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import OTP from './OTP.js';
import PhoneInput from './PhoneInput.js';

export default function Home() {
  const styles = GlobalStyle();
  const assets = GlobalAsset();
  const layout = useWindowDimensions();

  let rightView = <View style={styles.coverImageWrapper} >
    <Image style={styles.coverImage} source={{uri:assets.coverImage}}></Image>
  </View>;

  if (layout.width < layout.height * 3 / 2) {
    rightView = <></>
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

        {rightView}
      </NavigationContainer>
    </View>
  )
}