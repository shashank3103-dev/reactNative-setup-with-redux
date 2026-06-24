import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppTheme} from '../../resources/ThemeContext';
import {FONTS, UTILITIES} from '../../resources';
import {fetchUserNotifications} from '../../networkLayer/FCMServices';

interface NotificationItem {
  notificationId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>();
  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchUserNotifications();
      setNotifications(data);
    };

    loadNotifications();
  }, []);
  const renderItem = ({item}: any) => (
    <View
      style={{
        backgroundColor: theme.COLORS.card,
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
      }}>
      <Text style={[FONTS.h2, {color: theme.COLORS.text, marginBottom: 20}]}>
        {item.type}
      </Text>
      <Text style={[FONTS.h2, {color: theme.COLORS.text, marginBottom: 20}]}>
        {item.message}
      </Text>
      <Text style={[FONTS.h2, {color: theme.COLORS.text, marginBottom: 20}]}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );
  const theme = useAppTheme();
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        {backgroundColor: theme.COLORS.background},
      ]}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.notificationId}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={[FONTS.h2, {color: theme.COLORS.text}]}>
            No notifications 💤
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
