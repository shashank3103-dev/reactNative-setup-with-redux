import React, {useState} from 'react';
import {Text, StyleSheet, StyleProp, ViewStyle, View} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import {useAppTheme} from '../resources/ThemeContext';
import {FONTS} from '../resources/Theme';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean; // if true => show password toggle
  leftIcon?: string;
  style?: StyleProp<ViewStyle>;
}
const getPasswordStrength = (password: string) => {
  if (password.length < 6) return {label: 'Too Short', color: 'red'};
  if (
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    return {label: 'Weak', color: 'orange'};
  }
  if (password.length < 10) {
    return {label: 'Medium', color: 'yellow'};
  }
  return {label: 'Strong', color: 'green'};
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  secure = false,
  leftIcon,
  style,

  ...props
}) => {
  const theme = useAppTheme();
  const [showPassword, setShowPassword] = useState(!secure);
  const strength = secure ? getPasswordStrength(value) : null;
  return (
    <View style={{width: '100%'}}>
      <TextInput
        label={
          <Text style={[FONTS.h3, {color: theme.COLORS.text}]}>{label}</Text>
        }
        mode="outlined"
        secureTextEntry={secure && !showPassword}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style, FONTS.h3]}
        theme={{
          colors: {
            text: theme.COLORS.text,
            primary: theme.COLORS.text,
            background: theme.COLORS.background,
            placeholder: theme.COLORS.lightGray,
          },
          fonts: {
            regular: {
              fontFamily: FONTS.h3.fontFamily,
            },
          },
        }}
        // 👇 left icon added
        left={
          leftIcon ? (
            <TextInput.Icon
              icon={leftIcon}
              size={22}
              color={theme.COLORS.text}
            />
          ) : undefined
        }
        right={
          secure ? (
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              size={24}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : undefined
        }
        {...props}
      />
      {secure && value.length > 0 && (
        <Text
          style={[
            {
              marginLeft: 25,
              marginTop: -5,
              fontSize: 12,
            },
            {color: strength?.color, fontFamily: FONTS.h3.fontFamily},
          ]}>
          {strength?.label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',

  },
});

export default CustomTextInput;
