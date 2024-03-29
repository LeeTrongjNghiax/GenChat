import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

import * as React from 'react';

import Profile from '../Components/Profile';

const renderScene = SceneMap({
  tab_1: Profile,
  tab_2: Profile,
});

export default function Main() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tab_1', title: 'Message' },
    { key: 'tab_2', title: 'Profile' },
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
