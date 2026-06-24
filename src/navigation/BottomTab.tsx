import * as React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import LearnNavigation from "./LearnNavigation";
import Profile from "../screens/profile/Profile";
import BookingNavigation from "./BookingNavigation";
import { ICONS, UTILITIES } from "../resources";
import { useAppTheme } from "../resources/ThemeContext"; // assuming this exists
import UploadNavigation from "./UploadNavigation";
import { useEffect, useState } from "react";
import { storageKeys } from "../resources/Constants";
import Notification from "../screens/notification/Notification";
import { onMessageListener, requestUserPermission } from "../networkLayer/FCMServices";
import TutorDashboard from "../screens/tutorDasboard/TutorDashboard";
import DashboardNavigation from "./DashboardNavigation";

function getIcons(routeName: string) {
  switch (routeName) {
    case "HomeNavigation":
      return ICONS.HOME;
      case "TutorDashboard":
      return ICONS.DASHBOARD;
    case "LearnNavigation":
      return ICONS.LEARN;
    case "UploadNavigation":
      return ICONS.UPLOAD;
    case "BookingNavigation":
      return ICONS.BOOKING;
    case "Profile":
      return ICONS.PROFILE;
    default:
      return ICONS.HOME;
  }
}

function MyTabBar({ state, descriptors, navigation }: any) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: Platform.OS === "ios" ? "5%" : "3%",
        paddingHorizontal: "5%",
        backgroundColor: theme.COLORS.background,
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: theme.COLORS.card,
      }}
    >
      {state.routes.map(
        (route: { key: string | number; name: string }, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={getIcons(route.name)}
                style={{
                  height: 22,
                  width: 22,
                  tintColor: isFocused
                    ? theme.COLORS.primary
                    : theme.COLORS.gray,
                }}
              />
              <Text
                style={{
                  marginTop: 4,
                  color: isFocused ? theme.COLORS.primary : theme.COLORS.gray,
                  fontSize: isFocused ? 14 : 12,
                  fontWeight: isFocused ? "600" : "400",
                  fontFamily: isFocused
                    ? "Quicksand-SemiBold"
                    : "Quicksand-Regular",
                  textAlign: "center",
                }}
              >
                {label.replace("Navigation", "")}
              </Text>
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [role, setRole] = useState<"tutor" | "student" | null>(null);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
   requestUserPermission();
   onMessageListener();
 }, []);
  useEffect(() => {
    (async () => {
      const savedRole = await UTILITIES.getDataFromEncryptedStorage(
        storageKeys.kROLE
      );
      console.log("Loaded role from storage:", savedRole);
      if (savedRole === "tutor" || savedRole === "student") {
        setRole(savedRole);
      } else {
        setRole("student"); // fallback default
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
      tabBar={props => <MyTabBar {...props} />}>
      {/* <Tab.Screen name="HomeNavigation" component={HomeNavigation} /> */}
      {role === 'tutor' ? (
        <Tab.Screen
          name="DashboardNavigation"
          component={DashboardNavigation}
        
        />
      ) : (
        <Tab.Screen name="HomeNavigation" component={HomeNavigation} />
      )}
      {role === 'tutor' ? (
        <Tab.Screen name="UploadNavigation" component={UploadNavigation} />
      ) : (
        <Tab.Screen name="LearnNavigation" component={Notification} />
      )}
      <Tab.Screen name="BookingNavigation" component={BookingNavigation} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
