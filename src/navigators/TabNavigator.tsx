import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BlurView} from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="home"
              size={30}
              color={
                focused ? COLORS.primaryWhiteHex : COLORS.primaryLightGreyHex
              }
            />
          ),
          tabBarIconStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="cart"
              size={32}
              color={
                focused ? COLORS.primaryWhiteHex : COLORS.primaryLightGreyHex
              }
            />
          ),
          tabBarIconStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="bell"
              size={30}
              color={
                focused ? COLORS.primaryWhiteHex : COLORS.primaryLightGreyHex
              }
            />
          ),
          tabBarIconStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Favourite"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="like"
              size={30}
              color={
                focused ? COLORS.primaryWhiteHex : COLORS.primaryLightGreyHex
              }
            />
          ),
          tabBarIconStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome5
              name="user-alt"
              size={28}
              color={
                focused ? COLORS.primaryWhiteHex : COLORS.primaryLightGreyHex
              }
            />
          ),
          tabBarIconStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 68,
    position: 'absolute',
    backgroundColor: COLORS.primarySpringGreenHex,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
