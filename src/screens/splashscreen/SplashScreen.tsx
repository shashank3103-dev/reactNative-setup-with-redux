import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAppTheme } from "../../resources/ThemeContext";
import { ICONS } from "../../resources";
import { getDataFromEncryptedStorage } from "../../resources/Utilities";
import { storageKeys } from "../../resources/Constants";

const SplashScreen = ({ navigation }: any) => {
  const theme = useAppTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNavigation();
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  const handleNavigation = async () => {
    const token = await getDataFromEncryptedStorage(storageKeys.kTOKEN);
    if (token) {
      navigation.replace("BottomTabStack");
    } else {
      navigation.replace("LOGIN");
    }
  };
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
        {backgroundColor: theme.COLORS.background},
      ]}>
      <Image
        source={ICONS.APP_LOGO_ICON}
        style={{
          width: 200,
          height: 200,
          tintColor: theme.COLORS.primary,
        }}
        resizeMode="contain"
      />
      <ActivityIndicator
        size="large"
        color={theme.COLORS.primary}
        style={{
          position: 'absolute',
          bottom: 50, // adjust spacing from bottom
          alignSelf: 'center',
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
