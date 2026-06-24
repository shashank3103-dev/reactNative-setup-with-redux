import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {useAppTheme} from '../../resources/ThemeContext';
import CommonHeader from '../../components/header/CommonHeader';
import URLManager from '../../networkLayer/URLManager';
import {Card} from 'react-native-paper';
import {BarChart, PieChart, LineChart} from 'react-native-chart-kit';
import {FONTS} from '../../resources';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../stateManagement/Store';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const TutorDashboard = () => {
  const tutor = useSelector((state: RootState) => state.auth.user);
  console.log(tutor, '00');
  const theme = useAppTheme();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const navigation = useNavigation();
  useEffect(() => {
    fetchTutorBooking();
  }, []);

  async function fetchTutorBooking() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      const res = await urlManager.getTutorDashboard();
      const json = await res.json();
      if (json?.data) {
        setDashboardData(json.data);
      }
    } catch (e) {
      console.log('Error:', e);
    } finally {
      setLoading(false);
    }
  }

  const renderCharts = () => {
    if (!dashboardData?.stats) return null;
    const {totalCourses, publishedCourses, draftCourses} = dashboardData.stats;

    const barData = {
      labels: ['Total', 'Published', 'Draft'],
      datasets: [{data: [totalCourses, publishedCourses, draftCourses]}],
    };

    const pieData = [
      {
        name: 'Published',
        population: publishedCourses,
        color: '#4CAF50',
        legendFontColor: '#1bb1e7ff',
        legendFontSize: 13,
      },
      {
        name: 'Draft',
        population: draftCourses,
        color: '#FFC107',
        legendFontColor: '#1bb1e7ff',
        legendFontSize: 13,
      },
    ];

    const enrollmentLabels = dashboardData.courses.map((c: any) =>
      c.title.length > 6 ? c.title.substring(0, 6) + '…' : c.title,
    );
    const enrollmentCounts = dashboardData.courses.map(
      (c: any) => c.Enrollments?.length || 0,
    );

    const lineData = {
      labels: enrollmentLabels,
      datasets: [
        {
          data: enrollmentCounts,
          strokeWidth: 2,
          color: () => '#3f51b5',
        },
      ],
    };

    return (
      <View>
        {/* <Text style={[FONTS.h3, {color: theme.COLORS.text, marginBottom: 10}]}>
          📊 Course Overview
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Icon name="bar-chart" size={22} color={theme.COLORS.primary} />
          <Text style={[FONTS.h3, {color: theme.COLORS.text, marginLeft: 8}]}>
            Course Overview
          </Text>
        </View>
        <BarChart
          data={barData}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          yAxisLabel={''}
          yAxisSuffix={''}
        />

        {/* <Text
          style={[FONTS.h3, {color: theme.COLORS.text, marginVertical: 10}]}>
          🥧 Published vs Draft
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Icon name="pie-chart" size={22} color={theme.COLORS.primary} />
          <Text style={[FONTS.h3, {color: theme.COLORS.text, marginLeft: 8}]}>
            Published vs Draft
          </Text>
        </View>
        <PieChart
          data={pieData}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />

        {/* <Text
          style={[FONTS.h3, {color: theme.COLORS.text, marginVertical: 10}]}>
          📈 Enrollments Per Course
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Icon name="show-chart" size={22} color={theme.COLORS.primary} />
          <Text style={[FONTS.h3, {color: theme.COLORS.text, marginLeft: 8}]}>
            Enrollments Per Course
          </Text>
        </View>
        <LineChart
          data={lineData}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.COLORS.background}]}>
      <CommonHeader title="Tutor Dashboard" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.COLORS.card,
          padding: 15,
          borderRadius: 12,
          marginBottom: 20,
        }}>
        <View style={{flex: 1}}>
          <Text style={[FONTS.h2, {color: theme.COLORS.text}]}>
            Welcome, {tutor?.name || 'Tutor'} 👋
          </Text>
          <Text style={[FONTS.body4, {color: theme.COLORS.text, marginTop: 4}]}>
            Here’s your teaching overview. Track your courses, enrollments, and
            performance in one place.
          </Text>
        </View>
        <Icon
          name="school"
          size={48}
          color={theme.COLORS.primary}
          style={{marginLeft: 10}}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.COLORS.primary}
          style={{marginTop: 50}}
        />
      ) : (
        <ScrollView contentContainerStyle={{padding: 15}}>
          {renderCharts()}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Icon name="menu-book" size={22} color={theme.COLORS.primary} />
            <Text style={[FONTS.h2, {color: theme.COLORS.text, marginLeft: 8}]}>
              Your Courses
            </Text>
          </View>
          {dashboardData?.courses?.map((course: any) => (
            <Card
              key={course.courseId}
              style={styles.courseCard}
              onPress={() =>
                navigation.navigate('ScheduleLiveClass', {
                  courseId: course.courseId,
                })
              }>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
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
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TutorDashboard;

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: () => '#444',
  style: {borderRadius: 12},
  propsForDots: {r: '5', strokeWidth: '2', stroke: '#3f51b5'},
};

const styles = StyleSheet.create({
  container: {flex: 1},
  chart: {borderRadius: 12, marginBottom: 20},
  courseCard: {marginBottom: 12, padding: 15, borderRadius: 12},
});
