/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Home } from '../screens/Home';
import { Notifications } from '../screens/Notifications';
import { Courses } from '../screens/Courses';
import { Subjects } from '../screens/Subjects';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false,
      }}>
        <Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" size={18} color={color} />,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
        />

        <Screen
          name="courses"
          component={Courses}
          options={{
            tabBarIcon: ({ color }) => <Entypo name="graduation-cap" size={18} color={color} />,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Meu curso',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
          />

        <Screen
          name="subjects"
          component={Subjects}
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="library" size={18} color={color} />,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Disciplinas',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
          />

        <Screen
          name="notifications"
          component={Notifications}
          options={{
            tabBarIcon: ({ color }) => <Entypo name="bell" size={18} color={color} />,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Notificações',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
          />
      </Navigator>
    </NavigationContainer>
  );
}
