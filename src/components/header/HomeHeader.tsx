import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAppTheme } from "../../resources/ThemeContext";
import { FONTS, ICONS } from "../../resources";
import SearchBar from "../SearchBar";

const HomeHeader = ({
  title,
  onBackPress,
  showBack = true,
}: {
  title: string;
  onBackPress?: () => void;
  showBack?: boolean;
}) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.COLORS.background,
          borderBottomColor: theme.COLORS.card || "#ccc",
        },
      ]}
    >
      <SearchBar />
      <View style={styles.spacer} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'center',
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  spacer: {
    width: 32,
  },
});
