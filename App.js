import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Main from './Pages/Main';

import routes from './Pages/routes';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Routes>
      {
        routes.map(({ component: Component, path, ...rest }) => {
          return <Route component={Component} key={path} {...rest} />
        })
      }
    </Routes>

    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen name="Main" component={Main} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}