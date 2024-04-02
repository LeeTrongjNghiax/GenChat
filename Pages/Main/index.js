import { TabView, TabBar } from 'react-native-tab-view';
import { useRoute } from "@react-navigation/native";
import { useWindowDimensions, View } from 'react-native';
import * as React from 'react';

import Profile from '../../Components/Profile';

export default function Main({ navigation }) {
  const route = useRoute();
  const user = route.params?.user;

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'tab_2': return <View></View>;
      case 'tab_1': return <Profile user={user} navigation={navigation} />;
      default: return null;
    }
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tab_1', title: 'Profile' },
    { key: 'tab_2', title: 'Message' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition='bottom'
      pagerStyle={{
        backgroundColor: 'white'
      }}
      renderTabBar={props => <TabBar
        {...props}
        activeColor='black'
        inactiveColor='#aaaaaa'
        indicatorContainerStyle={{
          backgroundColor: 'black',
          height: 10
        }}
        indicatorStyle={{
          backgroundColor: 'black'
        }}
        tabStyle={{
          backgroundColor: 'white'
        }}
        labelStyle={{
          fontWeight: 'bold'
        }}
      />}
    />
  );
}
