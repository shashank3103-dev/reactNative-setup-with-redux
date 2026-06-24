// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React from "react";
// import { useAppTheme } from "../../resources/ThemeContext";
// import { FONTS, UTILITIES } from "../../resources";

// const Profile = ({ navigation }: any) => {
//   const theme = useAppTheme();
//   return (
//     <SafeAreaView
//       style={[
//         {
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "center",
//         },
//         { backgroundColor: theme.COLORS.background },
//       ]}
//     >
//       <Text
//         style={[
//           FONTS.h3,
//           { color: theme.COLORS.text, marginLeft: 10, flex: 1 },
//         ]}
//       >
//         Profile
//       </Text>
//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: theme.COLORS.primary }]}
//         onPress={async () => {
//           UTILITIES.clearEncryptedStorage().then((res) => {
//             navigation.replace("LOGIN");
//           });
//         }}
//       >
//         <Text style={{ color: theme.COLORS.background, ...FONTS.h4 }}>
//          Log Out
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   button: {
//     width: "90%",
//     // height:40,
//     justifyContent: "center",
//     alignItems: "center",
//     // marginTop: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flexDirection: "row",
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {useAppTheme} from '../../resources/ThemeContext';
import {FONTS, UTILITIES} from '../../resources';
import URLManager from '../../networkLayer/URLManager';

const Avatar = ({name, theme}: {name: string; theme: any}) => {
  const firstLetter = name?.charAt(0)?.toUpperCase() || '?';
  return (
    <View
      style={[
        styles.avatar,
        {
          backgroundColor: theme.COLORS.card,
          borderWidth: 1,
          borderColor: theme.COLORS.text,
        },
      ]}>
      <Text style={[FONTS.h2, {color: theme.COLORS.text}]}>{firstLetter}</Text>
    </View>
  );
};

const Profile = ({navigation}: any) => {
  const theme = useAppTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      return urlManager
        .getProfile()
        .then(res => {
          console.log(res);
          return res.json() as Promise<any>;
        })
        .then(async (res: any) => {
          console.log(res, 'PROFILE DETAILS');
          if (res?.user) {
            setUser(res.user);
          }
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={[FONTS.h2, {color: theme.COLORS.text, marginBottom: 20}]}>
          Profile
        </Text>
        {user && <Avatar name={user.name} theme={theme} />}
        {loading ? (
          <ActivityIndicator size="large" color={theme.COLORS.primary} />
        ) : (
          user && (
            <View style={[styles.profileBox, {borderColor: theme.COLORS.card}]}>
              <ProfileRow label="Name" value={user.name} theme={theme} />
              <ProfileRow label="Email" value={user.email} theme={theme} />
              <ProfileRow label="Phone" value={user.phone} theme={theme} />
              <ProfileRow
                label="Role"
                value={user.admin ? 'Admin' : user.tutor ? 'Tutor' : 'Student'}
                theme={theme}
              />
              <ProfileRow
                label="Verified"
                value={user.is_verified ? 'Yes' : 'No'}
                theme={theme}
              />
              <ProfileRow
                label="Blocked"
                value={user.is_blocked ? 'Yes' : 'No'}
                theme={theme}
              />
            </View>
          )
        )}

        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.COLORS.primary}]}
          onPress={async () => {
            UTILITIES.clearEncryptedStorage().then(() => {
              navigation.replace('LOGIN');
            });
          }}>
          <Text style={{color: theme.COLORS.background, ...FONTS.h4}}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileRow = ({label, value, theme}: any) => (
  <View style={styles.row}>
    <Text style={[FONTS.body4, {color: theme.COLORS.gray}]}>{label}</Text>
    <Text style={[FONTS.body3, {color: theme.COLORS.text}]}>{value}</Text>
  </View>
);

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  profileBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  row: {
    marginBottom: 12,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
