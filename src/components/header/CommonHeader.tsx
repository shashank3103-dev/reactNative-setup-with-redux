// import {
//   Image,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React from "react";
// import { ICONS, SIZES, FONTS } from "../resources";
// import { useNavigation } from "@react-navigation/native";
// import { useAppTheme } from "../resources/ThemeContext";

// interface CommonHeaderProps {
//   title: string;
//   onBackPress?: () => void;
// }

// const CommonHeader = ({ title, onBackPress }: CommonHeaderProps) => {
//   const navigation = useNavigation();
//   const theme = useAppTheme();

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           backgroundColor: theme.COLORS.background,
//           height:
//             Platform.OS === "ios" ? SIZES.height * 0.11 : SIZES.height * 0.08,
//           paddingTop: Platform.OS === "ios" ? "7%" : 0,
//         },
//       ]}
//     >
//       <TouchableOpacity
//         onPress={onBackPress || (() => navigation.goBack())}
//         style={styles.logoContainer}
//       >
//         <Image
//           resizeMode="contain"
//           style={styles.logo}
//           source={ICONS.APP_LOGO_ICON}
//         />
//       </TouchableOpacity>
//       <Text
//         style={[
//           styles.title,
//           {
//             color: theme.COLORS.text,
//           },
//         ]}
//       >
//         {title}
//       </Text>
//     </View>
//   );
// };

// export default CommonHeader;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     paddingHorizontal: "5%",
//     alignItems: "center",
//   },
//   logoContainer: {
//     marginTop: "8%",
//   },
//   logo: {
//     height: 16,
//     width: 16,
//   },
//   title: {
//     flex: 1,
//     marginLeft: 20,
//     marginTop: "7.5%",
//     fontWeight: "600",
//     ...FONTS.body3,
//   },
// });

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAppTheme } from "../../resources/ThemeContext";
import { FONTS, ICONS } from "../../resources";
// import { useAppTheme } from "../resources/ThemeContext";
// import { FONTS, ICONS, SHADOW } from "../resources";


const CommonHeader = ({
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
      {showBack ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image
            source={ICONS.LEFT_ARROW} // Make sure to define this in your ICONS
            style={[
              styles.backIcon,
              {
                tintColor: theme.COLORS.text,
              },
            ]}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      <Text
        style={[
          FONTS.h3,
          {
            color: theme.COLORS.text,
            // textAlign: "center",
            flex: 1,
          },
        ]}
      >
        {title}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
   
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  spacer: {
    width: 32,
  },
});
