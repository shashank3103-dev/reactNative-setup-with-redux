import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseUpload from "../screens/upload/CourseUpload";

const RootStack = createNativeStackNavigator();
const UploadNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="CourseUpload" component={CourseUpload} />
    </RootStack.Navigator>
  );
};

export default UploadNavigation;

const styles = StyleSheet.create({});
