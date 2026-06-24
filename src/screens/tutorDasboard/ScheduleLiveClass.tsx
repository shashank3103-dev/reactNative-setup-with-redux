import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAppTheme} from '../../resources/ThemeContext';
import CommonHeader from '../../components/header/CommonHeader';
import {useRoute} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import URLManager from '../../networkLayer/URLManager';

const ScheduleLiveClass = ({navigation}:any) => {
  const theme = useAppTheme();
  const route = useRoute<any>();
  const {courseId} = route.params;
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [title, setTitle] = useState('');

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      let updated = new Date(date);
      updated.setFullYear(selectedDate.getFullYear());
      updated.setMonth(selectedDate.getMonth());
      updated.setDate(selectedDate.getDate());
      setDate(updated);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      let updated = new Date(date);
      updated.setHours(selectedTime.getHours());
      updated.setMinutes(selectedTime.getMinutes());
      updated.setSeconds(0);
      setDate(updated);
    }
  };

  async function handleSchedule() {
    try {
      setLoading(true);
      if (!date || !title) {
        Alert.alert(
          'Validation Error',
          'Please fill all fields and accept terms.',
        );
        setLoading(false);
        return;
      }
      let urlManager = new URLManager();
      const isoDate = date.toISOString(); // final combined
      const payload = {
        courseId,
        startsAt: isoDate,
        title: title,
      };

      console.log(payload);
      return urlManager
        .createTutorLiveSessions(payload)
        .then(res => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.error) {
            console.log(res);
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
            // navigation.navigate("LOGIN");
             navigation.navigate('LiveClassScreen', {roomId: res.roomId});
          } else {
            if (res.error == 'Failed to SignUp')
              Alert.alert('Error', res.error);
          }
          console.log(res);
        })
        .catch(e => {
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
      style={[styles.container, {backgroundColor: theme.COLORS.background}]}>
      <CommonHeader title="Schedule Live Class" />

      <View style={styles.form}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <CustomTextInput
            label="Select Date"
            value={date.toDateString()}
            leftIcon="calendar"
            onChangeText={() => {}}
            editable={false} // keep it read-only
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}

        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <CustomTextInput
            label="Select Time"
            value={date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            onChangeText={() => {}}
            leftIcon="clock-outline"
            editable={false}
          />
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}
        <CustomTextInput
          label={'Title'}
          value={title}
          onChangeText={setTitle}
          leftIcon="pencil"
        />

        <CustomButton
          title={'Schedule Class'}
          onPress={handleSchedule}
          style={{width: '90%', alignSelf: 'center', borderRadius: 8}}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScheduleLiveClass;

const styles = StyleSheet.create({
  container: {flex: 1},
  form: {padding: 20},
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
