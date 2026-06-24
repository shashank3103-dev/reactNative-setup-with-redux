import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { useAppTheme } from "../../resources/ThemeContext";
// import { useAppTheme } from "../resources/ThemeContext";

interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ style, children, ...rest }) => {
  const theme = useAppTheme();

  return (
    <Text
      style={[
        { color: theme.COLORS.text, fontSize: 14 }, // default text style
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CustomText;
