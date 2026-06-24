import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import CourseDetails from "../screens/courses/CourseDetails";
import PaymentScreen from "../screens/payment/PaymentScreen";

const RootStack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="COURSE_DETAILS" component={CourseDetails} />
      <RootStack.Screen name="PAYMENT_SCREEN" component={PaymentScreen} />
    </RootStack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
