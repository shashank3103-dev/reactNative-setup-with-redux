import { Animated, StyleSheet,  TouchableOpacity,  ViewStyle } from "react-native";
import React, { FC } from "react";

interface ScalePressProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

const ScalePress: FC<ScalePressProps> = ({ onPress, children, style }) => {
  const styleValue = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(styleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(styleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
 <TouchableOpacity
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    onPress={onPress}
    activeOpacity={1}
    style={{...style}}
  >
        <Animated.View
    style={[{
      transform: [{ scale: styleValue }],
      width: "100%",
    }]}
  >
    {children}
        </Animated.View>
  </TouchableOpacity>
  );
};


export default ScalePress;

const styles = StyleSheet.create({});
