import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import RollingBar from "react-native-rolling-bar";
import { useAppTheme } from "../resources/ThemeContext";
import { ICONS } from "../resources";
import CustomText from "./ui/CustomText";
const SearchBar: FC = () => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.COLORS.card,
          borderColor: theme.COLORS.card || "#ccc",
        },
      ]}
      activeOpacity={0.8}
    >
      <Image
        style={{ width: 20, height: 20, tintColor: theme.COLORS.text }}
        source={ICONS.SEARCH}
        resizeMode="contain"
      />

      <RollingBar
        interval={3000}
        defaultStyle={false}
        customStyle={styles.textContainer}>
    
     </RollingBar>
      <View
        style={[
          styles.divider,
          { backgroundColor: theme.COLORS.text || "#ccc" },
        ]}
      />
      <Image
        style={{ width: 20, height: 20 , tintColor: theme.COLORS.text }}
        source={ICONS.MICROPHONE}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 0.6,
    marginTop: 10,
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  textContainer: {
    width: "90%",
    paddingLeft: 10,
    height: 50,
  },
  divider: {
    width: 1,
    height: 24,
    //     backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
});
