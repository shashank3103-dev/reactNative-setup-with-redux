import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppTheme } from "../../resources/ThemeContext";
import { FONTS, ICONS } from "../../resources";
import OtpInputs from "react-native-otp-inputs";
import URLManager from "../../networkLayer/URLManager";
const OtpScreen = ({ route, navigation }: any) => {
  const { email } = route.params;
  const theme = useAppTheme();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => {
      // resendVerifyOTP();
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  async function handleVerifyOTP() {
    try {
      setLoading(true);
      if (!otp || !email) {
        Alert.alert(
          "Validation Error",
          "Please fill all fields and accept terms."
        );
        setLoading(false);
        return;
      }
      let urlManager = new URLManager();
      const payload = {
        email: email,
        otp: otp,
      };
      console.log(payload);
      return urlManager
        .verifyEmailOTP(payload)
        .then((res) => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.error) {
            console.log(res);
            navigation.navigate("LOGIN");
          } else {
            if (res.error == "Failed to SignUp")
              Alert.alert("Error", res.error);
          }
          console.log(res);
        })
        .catch((e) => {
          Alert.alert(e.name, e.message);
          return e.response;
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (er) {
      console.log(er);
    }
  }
  async function resendVerifyOTP() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      return urlManager
        .resendEmailOTP({
          email: email,
        })
        .then((res) => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.error) {
            console.log(res);
            // navigation.navigate("LOGIN");
          } else {
            if (res.error == "Failed to SignUp")
              Alert.alert("Error", res.error);
          }
          console.log(res);
        })
        .catch((e) => {
          Alert.alert(e.name, e.message);
          return e.response;
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <SafeAreaView
      style={[
        { flex: 1, padding: 20 },
        { backgroundColor: theme.COLORS.background },
      ]}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={ICONS.APP_LOGO_ICON}
          style={{
            width: 200,
            height: 200,
            tintColor: theme.COLORS.secondary,
          }}
          resizeMode="contain"
        />
        <Text style={[FONTS.h2, { color: theme.COLORS.text }]}>Enter OTP</Text>
        <Text
          style={[
            FONTS.body5,
            { color: theme.COLORS.text, textAlign: "center", marginTop: 10 },
          ]}
        >
          We've sent a 6-digit verification code to your registered E-mail
          address.
        </Text>
        <OtpInputs
          style={{
            width: "95%",
            alignSelf: "center",
            height: 150,
            flexDirection: "row",
            color: theme.COLORS.primary,
            marginTop: 10,
            justifyContent: "space-evenly",
          }}
          handleChange={(code) => setOtp(code)}
          numberOfInputs={6}
          autofillFromClipboard={false}
          inputStyles={{
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 2,
            fontSize: 20,
            textAlign: "center",
            color: theme.COLORS.primary,
            borderColor: theme.COLORS.border,
          }}
          inputContainerStyles={{
            width: 50,
            height: 50,
            borderRadius: 10,
          }}
          focusStyles={{
            borderColor: theme.COLORS.primary,
          }}
          selectionColor={theme.COLORS.primary}
        />
        <Text
          style={[
            FONTS.body5,
            { color: theme.COLORS.text, textAlign: "center" },
          ]}
        >
          Haven't got the OTP yet ?{timeLeft != 0 ? ` in ${timeLeft} sec` : ""}
        </Text>
        <TouchableOpacity
          onPressIn={resendVerifyOTP}
          disabled={timeLeft != 0}
          onPress={() => {
            setTimeLeft(10);
          }}
          style={{
            alignItems: "flex-end",
            alignSelf: "center",
          }}
        >
          <Text
            style={[
              FONTS.h4,
              { color: theme.COLORS.primary, textAlign: "center" },
            ]}
          >
            Resend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVerifyOTP}
          style={[
            {
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              flexDirection: "row",
            },
            { backgroundColor: theme.COLORS.primary },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.COLORS.background} />
          ) : (
            <Text style={{ color: theme.COLORS.background, ...FONTS.h4 }}>
              Verify
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default OtpScreen;
