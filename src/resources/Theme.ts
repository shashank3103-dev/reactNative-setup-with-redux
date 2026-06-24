// src/theme/theme.ts
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COMMON = {
  SIZES: {
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 10,
    width,
    height,
  },
};

export const lightTheme = {
  COLORS: {
    primary: "#009688",
    secondary: "#00BFA5",
    fbBlue: "#4366B7",
    lightBlue: "#D4EFFF",
    darkBlue: "#0318CE",
    lightGreen: "#E0F2F1",  
    white: "#FFFFFF",
    black: "#000000",
    green: "#0B9D30",
    red: "#CC0000",
    gray: "#6A6A6A",
    lightGray: "#D2D2D2",
    lightGray1: "#999898",
    unSelectedGray: "#C0C0C0",
    background: "#FFFFFF",
    text: "#000000",
    card: "#F6F6F6",
    primaryColor: '#0af',
    courseDetails: "#444",
    bottomBarBackground: '#121212',
   courseGray:"#999",
    textSecondary: '#ccc',
    iconInactive: '#777',
    border: '#222',
    golden:'#E5C100'
  },
  ...COMMON,
};

export const darkTheme = {
  COLORS: {
    ...lightTheme.COLORS,
    background: "#000000",
    text: "#FFFFFF",
    card: "#1E1E1E",
    lightGray: "#444444",
    gray: "#888888",
  },
  ...COMMON,
};

export const FONTS = {
  h1: {
    fontFamily: "Quicksand-Medium",
    fontSize: COMMON.SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: "Quicksand-Medium",
    fontSize: COMMON.SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: "Quicksand-Medium",
    fontSize: COMMON.SIZES.h3,
    lineHeight: 22,
  },
  h4: {
    fontFamily: "Quicksand-Medium",
    fontSize: COMMON.SIZES.h4,
    lineHeight: 22,
  },
  body1: {
    fontFamily: "Quicksand-Regular",
    fontSize: COMMON.SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Quicksand-Regular",
    fontSize: COMMON.SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Quicksand-Regular",
    fontSize: COMMON.SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Quicksand-Regular",
    fontSize: COMMON.SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Quicksand-Regular",
    fontSize: COMMON.SIZES.body5,
    lineHeight: 22,
  },
  body6: {
    fontFamily: "Quicksand-Regular",
    fontSize: COMMON.SIZES.body6,
    lineHeight: 18,
  },
};

export const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 1.84,
  elevation: 1,
};

export const SHADOW_BLUE = {
  shadowColor: lightTheme.COLORS.primary,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
