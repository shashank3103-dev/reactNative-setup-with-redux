import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useAppTheme} from '../../resources/ThemeContext';
import {FONTS} from '../../resources/Theme';
import {ICONS, UTILITIES} from '../../resources';
import URLManager from '../../networkLayer/URLManager';
import {storageKeys} from '../../resources/Constants';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../stateManagement/slices/authSlice';
import CustomTextInput from '../../components/CustomTextInput';
const Login = ({navigation}: any) => {
  const dispatch = useDispatch();
  const theme = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  async function handleLogin() {
    try {
      setLoading(true);
      if (!password || !email) {
        ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
        setLoading(false);
        return;
      }
      let urlManager = new URLManager();
      const payload = {email, password};
      return urlManager
        .loginTutorOrStudent(payload)
        .then(res => res.json())
        .then((res: any) => {
          if (!res.error) {
            const user = res.user;
            const role = user.tutor ? 'tutor' : 'student';
            dispatch(
              setUserData({
                user,
                token: res.token,
                role: role as 'student' | 'tutor' | 'admin',
              }),
            );
            UTILITIES.setDataInEncryptedStorage(storageKeys.kTOKEN, res.token);
            UTILITIES.setDataInEncryptedStorage(storageKeys.kROLE, role);
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabStack'}],
            });
          } else {
            ToastAndroid.show(res.error || 'Login failed', ToastAndroid.SHORT);
          }
        })
        .catch(e => {
          Alert.alert(e.name, e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (er) {
      console.log(er);
    }
  }
  return (
    // <KeyboardAvoidingView
    //   style={{flex: 1}}
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    //     <ScrollView
    //       contentContainerStyle={{flexGrow: 1}}
    //       keyboardShouldPersistTaps="handled"
    //       keyboardDismissMode="on-drag">
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.COLORS.background}]}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={10} // pushes input a bit above keyboard
        keyboardShouldPersistTaps="handled">
        <Image
          source={ICONS.APP_LOGO_ICON}
          style={{
            width: 200,
            height: 200,
            tintColor: theme.COLORS.secondary,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Text style={[FONTS.h2, styles.centerText, {color: theme.COLORS.text}]}>
          Login To Your Account
        </Text>
        <Text
          style={[FONTS.body5, styles.centerText, {color: theme.COLORS.text}]}>
          Access courses, manage your schedule, and stay connected
        </Text>
        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          leftIcon="email"
        />
        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          leftIcon="lock"
          secure
        />
        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginRight: '5%'}}
          onPress={() => navigation.navigate('FORGOT_PASSWORD')}>
          <Text style={[FONTS.body5, {color: theme.COLORS.text}]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          style={{width: '90%', alignSelf: 'center', borderRadius: 8}}
          loading={loading}
        />
        <View style={styles.separatorContainer}>
          <View
            style={[styles.separatorLine, {backgroundColor: theme.COLORS.text}]}
          />
          <Text
            style={[
              FONTS.body4,
              {color: theme.COLORS.text, marginHorizontal: 15},
            ]}>
            or
          </Text>
          <View
            style={[styles.separatorLine, {backgroundColor: theme.COLORS.text}]}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: googleLoading ? 'gray' : theme.COLORS.card,
              opacity: googleLoading ? 0.6 : 1,
            },
          ]}>
          <Image
            source={ICONS.GOOGLE}
            style={{width: 20, height: 20, marginRight: 10}}
            resizeMode="contain"
          />
          <Text style={{color: theme.COLORS.text, ...FONTS.h4}}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('SIGN_UP')}>
          <Text style={[FONTS.body4, {color: theme.COLORS.text}]}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
    //     </ScrollView>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginHorizontal: 40,
  },
  separatorLine: {
    height: 1,
    width: '40%',
  },
});
