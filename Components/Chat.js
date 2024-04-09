import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Chat(props) {
  const isSender = props.isSender; 
  const text = props.data.text;
  
  // console.log("Data");
  // console.log(props.data);

  return (
    <View
      style={{
        backgroundColor: '#dddddd', 
        padding: 10, 
        margin: 10, 
        alignSelf: (isSender == true ? 'flex-start' : 'flex-end' ), 
        borderRadius: 10
      }}
    >
      <Text>{text}</Text>
    </View>
  )
}
