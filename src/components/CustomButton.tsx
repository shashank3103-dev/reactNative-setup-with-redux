import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import {  FONTS } from "../resources";
import { useAppTheme } from "../resources/ThemeContext";

interface BtnProps {
  style?: ViewStyle;
  loading?: boolean;
  title: string;
  onPress: () => void;
}

const CustomButton = ({ style, title, onPress, loading = false }: BtnProps) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      onPress={!loading ? onPress : undefined} // disable press when loading
      activeOpacity={loading ? 1 : 0.7} // don't animate when loading
      style={[
        styles.button,
        {backgroundColor: theme.COLORS.primary},
        style,
        loading && styles.disabled, // add dim effect if needed
      ]}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size='small' color={theme.COLORS.background} />
      ) : (
        <Text style={[styles.title, {color: theme.COLORS.background}]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginTop: "5%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
  title: {
    ...FONTS.h3,
  },
  disabled: {
    opacity: 0.7,
  },
});
