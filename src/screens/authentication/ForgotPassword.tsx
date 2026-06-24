import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppTheme } from "../../resources/ThemeContext";
import { FONTS, ICONS } from "../../resources";
import { TextInput } from "react-native-paper";

const ForgotPassword = ({ navigation }: any) => {
  const theme = useAppTheme();
  const [input, setInput] = useState("");
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          padding: 20,
          
        },
        { backgroundColor: theme.COLORS.background },
      ]}
    >
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => navigation.navigate("BottomTabStack")}
      >
        <Text style={[FONTS.h3, { color: theme.COLORS.text }]}>Skip</Text>
        <Image
          source={ICONS.RIGHT_ARROW}
          style={{
            width: 13,
            height: 13,
            marginLeft: 5,
            tintColor: theme.COLORS.text,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          // paddingVertical: 20,
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
        <Text style={[FONTS.h2, { color: theme.COLORS.text }]}>
          Reset Password
        </Text>
        <Text
          style={[
            FONTS.body5,
            { color: theme.COLORS.text, textAlign: "center" },
          ]}
        >
          Please enter your email address to reset your account password.
        </Text>
        <TextInput
          label="Email Address"
          mode="outlined"
          keyboardType="email-address"
          value={input}
          // onChangeText={setInput}
          onChangeText={(text) => {
            setInput(text);
          }}
          style={{
            width: "90%",
            marginBottom: 20,
          }}
          theme={{
            colors: {
              text: theme.COLORS.text,
              primary: theme.COLORS.text,
              background: theme.COLORS.background,
              placeholder: "#999",
            },
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={[styles.button, { backgroundColor: theme.COLORS.primary }]}
        >
          <Text style={{ color: theme.COLORS.background, ...FONTS.h4 }}>
            Send Reset Link
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SIGN_UP")}
          style={[styles.button, { backgroundColor: theme.COLORS.card }]}
        >
          <Text style={{ color: theme.COLORS.text, ...FONTS.h4 }}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop:10,
          }}
        >
          <Text
            style={[
              FONTS.body5,
              { color: theme.COLORS.text, marginEnd:5,},
            ]}
          >
           Already have an account?
          </Text>
          <TouchableOpacity
            style={{
              //       marginTop: 20,
              
            }}
            onPress={() => navigation.navigate("LOGIN")}
          >
            <Text
              style={[
                FONTS.body5,
                { color: theme.COLORS.text, textDecorationLine: "underline" },
              ]}
            >
              Sign In Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  button: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
  },
});
