import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LearnScreen from "../screens/learn/LearnScreen";
import TutorBooking from "../screens/booking/TutorBooking";
const RootStack = createNativeStackNavigator();
const BookingNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="TutorBooking" component={TutorBooking} />
    </RootStack.Navigator>
  );
};

export default BookingNavigation;

const styles = StyleSheet.create({});
