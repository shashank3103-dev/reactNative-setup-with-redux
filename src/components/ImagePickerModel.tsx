import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from "react-native-image-picker";
import { useAppTheme } from "../resources/ThemeContext";
import { FONTS, SHADOW } from "../resources/Theme";
import CustomButton from "./CustomButton";

const ImageSelectionModal = ({ visible, onClose, onImageSelected }: any) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const theme = useAppTheme();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs camera access to take photos.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleCameraLaunch();
      } else {
        Alert.alert("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: "photo" as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: "photo" as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchCamera(options, handleResponse);
  };

  const handleResponse = (response: any) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("Image picker error: ", response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      let imageFile = {
        uri: imageUri,
        type: response.type || response.assets?.[0]?.type,
        name: response.fileName || response.assets?.[0]?.fileName,
      };
      onImageSelected(imageFile);
    }
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.modalContent,
          {
            backgroundColor: theme.COLORS.card,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={[FONTS.body2, { color: theme.COLORS.text }]}>
          Upload Photo
        </Text>
        <Text
          style={[
            FONTS.body4,
            { color: theme.COLORS.gray, height: 30, marginBottom: 10 },
          ]}
        >
          Choose Your Profile Picture
        </Text>

        <CustomButton
          style={{
            width: "80%",
            backgroundColor: theme.COLORS.primary,
            borderRadius: 50,
            ...SHADOW,
          }}
          title="Take Photo"
          onPress={requestCameraPermission}
        />
        <CustomButton
          style={{
            width: "80%",
            borderRadius: 50,
            backgroundColor: theme.COLORS.primary,
            ...SHADOW,
          }}
          title="Choose From Library"
          onPress={openImagePicker}
        />
        <CustomButton
          style={{
            width: "80%",
            borderRadius: 50,
            backgroundColor: theme.COLORS.secondary,
            ...SHADOW,
          }}
          title="Cancel"
          onPress={onClose}
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
});

export default ImageSelectionModal;
