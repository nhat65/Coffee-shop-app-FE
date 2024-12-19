import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from './src/screens/Welcome';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import TabNavigator from './src/navigators/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ChooseAccount from './src/screens/ChooseAccount';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="ChooseAccount"
          component={ChooseAccount}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}></Stack.Screen>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}></Stack.Screen>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}></Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}></Stack.Screen>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
