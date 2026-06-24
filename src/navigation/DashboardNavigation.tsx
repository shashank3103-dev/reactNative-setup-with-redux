import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TutorDashboard from '../screens/tutorDasboard/TutorDashboard';
import ScheduleLiveClass from '../screens/tutorDasboard/ScheduleLiveClass';
const RootStack = createNativeStackNavigator();
const DashboardNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="TutorDashboard" component={TutorDashboard} />
      <RootStack.Screen
        name="ScheduleLiveClass"
        component={ScheduleLiveClass}
      />
    </RootStack.Navigator>
  );
};

export default DashboardNavigation;

const styles = StyleSheet.create({});
