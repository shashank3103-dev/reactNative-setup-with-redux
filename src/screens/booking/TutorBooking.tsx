import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useAppTheme} from '../../resources/ThemeContext';
import {FONTS} from '../../resources';
import {useSelector} from 'react-redux';
import {RootState} from '../../stateManagement/Store';
import URLManager from '../../networkLayer/URLManager';
import CommonHeader from '../../components/header/CommonHeader';

const TutorBooking = () => {
  const theme = useAppTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetchTutorBooking();
  }, []);

    async function fetchTutorBooking() {
        try {
          setLoading(true);
          let urlManager = new URLManager();
          return urlManager
            .getTutorDashboard()
            .then(res => res.json())
            .then((res: any) => {
              console.log(res, 'COURSES DETAILS');
              if (res?.data?.courses) {
                const enrolledCourses = res.data.courses.filter((course: any) =>
                  course.Enrollments?.some(
                    (enrollment: any) => enrollment.User?.name === user?.name, // ✅ check by email
                  ),
                );
                console.log(enrolledCourses,'ddd')
                setCourses(enrolledCourses);
              }
            })
            .catch(e => {
              Alert.alert(e.name, e.message);
            })
            .finally(() => setLoading(false));
        } catch (er) {
          console.log(er);
        }
      }

  //   try {
  //     setLoading(true);
  //     let urlManager = new URLManager();
  //     const res = await urlManager.getTutorBooking(); // 📌 Replace with "student dashboard API" if you have one
  //     const json = await res.json();

  //     if (json?.data?.courses) {
  //       const enrolled = json.data.courses.filter((course: any) =>
  //         course.Enrollments?.some(
  //           (enrollment: any) => enrollment.userId === user.name,
  //         ),
  //       );
  //       setCourses(enrolled);
  //     }
  //   } catch (err) {
  //     console.log('Error fetching my courses:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.COLORS.background}]}>
      <CommonHeader title="My Courses" />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.primary}
          style={{marginTop: 50}}
        />
      ) : (
        <ScrollView contentContainerStyle={{padding: 15}}>
          {courses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text
                style={[
                  FONTS.h2,
                  {color: theme.COLORS.text, marginBottom: 10},
                ]}>
                😕 No Enrolled Courses
              </Text>
              <Text style={[FONTS.body4, {color: theme.COLORS.text}]}>
                You haven’t enrolled in any courses yet. Start learning now!
              </Text>
            </View>
          ) : (
            courses.map(course => (
              <Card key={course.courseId} style={styles.courseCard}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* Left side - text */}
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={[FONTS.h3, {color: theme.COLORS.text}]}>
                      {course.title}
                    </Text>
                    <Text style={[FONTS.body4, {color: theme.COLORS.text}]}>
                      {course.category} • ₹{course.price}
                    </Text>
                    <Text style={[FONTS.body5, {color: theme.COLORS.primary}]}>
                      Enrollments: {course.Enrollments?.length || 0}
                    </Text>
                  </View>

                  {/* Right side - image */}
                  {course.image ? (
                    <Image
                      source={{uri: course.image}}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        marginLeft: 12,
                      }}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
              </Card>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TutorBooking;

const styles = StyleSheet.create({
  container: {flex: 1},
  courseCard: {marginBottom: 12, padding: 15, borderRadius: 12},
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
});
