// src/services/fcmService.ts
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import URLManager from "./URLManager";
import { storageKeys } from "../resources/Constants";
import { UTILITIES } from "../resources";

// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log("🔐 FCM permission granted:", authStatus);
//     getFcmToken();
//   }
// };
export const requestUserPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("✅ Notification permission granted");
      await getFcmToken();
    } else {
      Alert.alert(
        "⚠️ Permission Denied",
        "Notification permission is required for push notifications"
      );
    }
  } else {
    await getFcmToken();
  }
};

export const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("📱 FCM Token:", fcmToken);
      UTILITIES.setDataInEncryptedStorage(storageKeys.kDEVICETOKEN, fcmToken);
      let urlManager = new URLManager();
      const payload = {
        token: fcmToken,
      };
      console.log(payload);
      return urlManager
        .sendFCMToken(payload)
        .then((res) => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.error) {
            console.log("FCM Token sent successfully:", res);
          } else {
            console.error(res.error);
          }
        });
    }
  } catch (error) {
    console.log("❌ Error fetching FCM token:", error);
  }
};

export const onMessageListener = () => {
  messaging().onMessage(async (remoteMessage: any) => {
    console.log("📩 FCM Foreground Message:", remoteMessage);
    showLocalNotification(remoteMessage);
  });
};

export const showLocalNotification = async (remoteMessage: any) => {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || "🔔 New Notification",
    body: remoteMessage.notification?.body || "You have a new message!",
    android: {
      channelId: "default",
      smallIcon: "ic_stat_logo", // ensure you have this in android
      largeIcon: "ic_launcher",
      sound: "default", // system notification sound
      vibrationPattern: [300, 500], // vibrate 300ms, pause 500ms
      pressAction: {
        id: "default", // handles what happens when clicked
      },
    },
  });
};

export const backgroundMessageHandler = async (remoteMessage: any) => {
  console.log("📩 FCM Background Message:", remoteMessage);
  
};

export async function fetchUserNotifications() {
  try {
    let urlManager = new URLManager();
    return urlManager
      .getNotification()
      .then((res) => {
        console.log(res);
        return res.json() as Promise<any>;
      })
      .then(async (res: any) => {
        console.log(res.notifications, "NOTIFICATION");
        if (res?.notifications) {
                return res?.notifications;
        }
      })
      .catch((e) => {
        Alert.alert(e.name, e.message);
        return e.response;
      })
      .finally(() => {
        //    setLoading(false);
      });
  } catch (er) {
    console.log(er);
  }
}
