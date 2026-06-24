import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useState} from 'react';
import {useAppTheme} from '../../resources/ThemeContext';
import {FONTS, ICONS} from '../../resources';
import CheckBox from 'react-native-check-box';
import URLManager from '../../networkLayer/URLManager';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import {validateSignUpData} from '../../utils/validators';
const SignUp = ({navigation}: any) => {
  const theme = useAppTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'tutor' | 'student' | ''>('');
  const [isTerms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

 
  async function handleSignUp() {
    try {
      setLoading(true);
      const errorMsg = validateSignUpData({
        name,
        email,
        phone,
        password,
        confirmPassword,
        role,
        isTerms,
      });
      if (errorMsg) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG);
        setLoading(false);
        return;
      }
      let urlManager = new URLManager();
      const payload = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        role: role,
      };
      console.log(payload);
      return urlManager
        .userOrTutorSignUp(payload)
        .then(res => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.error) {
            console.log(res);
            navigation.navigate('OTP', {email: payload.email});
          } else {
            ToastAndroid.show(res.error, ToastAndroid.LONG);
          }
          console.log(res);
        })
        .catch(e => {
          ToastAndroid.show(e.message, ToastAndroid.LONG);
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
        {
          flex: 1,
          padding: 20,
        },
        {backgroundColor: theme.COLORS.background},
      ]}>
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
          }}
          resizeMode="contain"
        />
        <Text style={[FONTS.h2, {color: theme.COLORS.text}]}>
          Create Your Account
        </Text>
        <Text
          style={[
            FONTS.body5,
            {color: theme.COLORS.text, textAlign: 'center', marginBottom: 20},
          ]}>
          Sign up as a student or a tutor and start your educational journey
          with us.
        </Text>

        <CustomTextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          leftIcon="account"
        />

        <CustomTextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          leftIcon="email"
          keyboardType='email-address'
        />
        <CustomTextInput
          label="Mobile Number"
          value={phone}
          onChangeText={setPhone}
          leftIcon="phone"
          keyboardType='number-pad'
        />
        <CustomTextInput
          label="Set Password"
          value={password}
          onChangeText={setPassword}
          secure
          leftIcon="lock"
         
        />
        <CustomTextInput
          label="Confirm Password" // ✅ new field
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure
          leftIcon="lock-check"
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            width: '90%',
          }}>
          <CheckBox
            isChecked={role === 'student'}
            onClick={() => setRole('student')}
            checkBoxColor={theme.COLORS.primary}
          />

          <Text
            style={[
              FONTS.h3,
              {color: theme.COLORS.text, marginLeft: 10, flex: 1},
            ]}>
            Student
          </Text>
          <CheckBox
            isChecked={role === 'tutor'}
            onClick={() => setRole('tutor')}
            checkBoxColor={theme.COLORS.primary}
          />
          <Text
            style={[
              FONTS.h3,
              {color: theme.COLORS.text, marginLeft: 10, flex: 1},
            ]}>
            Tutor
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            width: '90%',
          }}>
          <CheckBox
            isChecked={isTerms}
            onClick={() => setTerms(!isTerms)}
            checkBoxColor={theme.COLORS.primary}
          />
          <Text
            style={[
              FONTS.body6,
              {
                color: theme.COLORS.text,
                marginLeft: 10,
                flex: 1,
              },
            ]}>
            I have Read and agree to all Terms & Conditions and Privacy Policy.
          </Text>
        </View>
        <CustomButton
          title="Sign Up"
          onPress={handleSignUp}
          style={{width: '90%', alignSelf: 'center', borderRadius: 8}}
          loading={loading}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={[FONTS.body5, {color: theme.COLORS.text, marginEnd: 5}]}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
            <Text
              style={[
                FONTS.body5,
                {color: theme.COLORS.text, textDecorationLine: 'underline'},
              ]}>
              Sign In Now
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
const styles = StyleSheet.create({});
