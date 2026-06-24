import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppTheme} from '../../resources/ThemeContext';
import CommonHeader from '../../components/header/CommonHeader';
import {FONTS, ICONS} from '../../resources';
import URLManager from '../../networkLayer/URLManager';
import RazorpayCheckout from 'react-native-razorpay';
const {width} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import {RootState} from '../../stateManagement/Store';
import {CourseData} from '../../stateManagement/modals/CourseDetails';
import {useFocusEffect} from '@react-navigation/native';
const CourseDetails = ({route, navigation}: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useAppTheme();
  const {course} = route.params;
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseDetails, setCourseDetails] = useState<CourseData | null>(null);
  const courseId = course.courseId;

  useFocusEffect(
    React.useCallback(() => {
      fetchCourseDetails();
    }, [courseId]),
  );
  const toggleSection = (id: number) => {
    if (expandedSections.includes(id)) {
      setExpandedSections(prev => prev.filter(sectionId => sectionId !== id));
    } else {
      setExpandedSections(prev => [...prev, id]);
    }
  };
  async function fetchCourseDetails() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      return urlManager
        .getCourseDetailsByCourseID(courseId)
        .then(res => res.json())
        .then((res: any) => {
          console.log(res, 'COURSES DETAILS');
          if (res?.data) {
            setCourseDetails(res.data);
            setIsEnrolled(res.data?.enrolled);
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
  async function handleBuyNow() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      const payload = {
        courseId: course.courseId,
      };
      console.log('Creating order with payload:', payload);
      return urlManager
        .paymentOrder(payload)
        .then(res => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.success) {
            console.log('Order creation failed:', res);
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
            return res;
          }
          console.log('Order created successfully:', res);
          const options = {
            description: 'Course Purchase',
            image: 'https://example.com/logo.png', // Replace with your logo URL
            currency: res.currency,
            key: 'rzp_test_xfEzJaTVaegrbQ',
            amount: res.amount,
            name: 'EduTech App',
            order_id: res.orderId,
            prefill: {
              email: user?.email || '',
              contact: user?.phone || '',
              name: user?.name || 'Guest User',
            },
            theme: {color: '#F37254'},
            methods: {
              upi: true, // Explicitly enable UPI
            },
          };
          console.log('Razorpay options:', options);
          return RazorpayCheckout.open(options)
            .then(paymentResult => {
              console.log('Payment success:', paymentResult);
              return verifyPayment(paymentResult);
            })
            .catch(error => {
              console.log('Razorpay error:', error);
              ToastAndroid.show(
                'You cancelled the payment.',
                ToastAndroid.SHORT,
              );
              throw error;
            });
        })
        .catch(e => {
          console.log('Order error:', e);
          ToastAndroid.show(
            e.message || 'Failed to process payment.',
            ToastAndroid.SHORT,
          );
          return e.response;
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (er) {
      console.log('Unexpected error:', er);
      ToastAndroid.show('An unexpected error occurred.', ToastAndroid.SHORT);
    }
  }
  async function verifyPayment(paymentData: any) {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      const payload = {
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_signature: paymentData.razorpay_signature,
        courseId: course.courseId,
      };
      console.log('Verifying payment with payload:', payload);
      return urlManager
        .paymentVerify(payload)
        .then(res => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.success) {
            console.log('Verification failed:', res);
            ToastAndroid.show(
              'Payment verification failed.',
              ToastAndroid.SHORT,
            );
            return res;
          }
          console.log('Verification success:', res);
          ToastAndroid.show('You have been enrolled.', ToastAndroid.SHORT);
          return res;
        })
        .catch(e => {
          console.log('Verification error:', e);
          ToastAndroid.show('Failed to verify payment.', ToastAndroid.SHORT);
          return e.response;
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (er) {
      console.log('Unexpected error:', er);
      ToastAndroid.show('An unexpected error occurred.', ToastAndroid.SHORT);
    }
  }
  const formatDuration = (durationInSec: string) => {
    const total = Math.round(parseFloat(durationInSec));
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    let result = '';
    if (hours > 0) result += `${hours} hr `;
    if (minutes > 0) result += `${minutes} mins `;
    if (seconds > 0 || result === '') result += `${seconds} sec`;
    return result.trim();
  };
  if (loading) {
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          {backgroundColor: theme.COLORS.background},
        ]}>
        <ActivityIndicator size="large" color={theme.COLORS.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.COLORS.background}]}>
      <CommonHeader title="Course detail" />
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Image
          source={{uri: courseDetails?.image}}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={[styles.priceBar, {backgroundColor: theme.COLORS.card}]}>
          <Text
            style={[
              FONTS.h2,
              {color: theme.COLORS.text, textTransform: 'capitalize'},
            ]}>
            ₹ {parseFloat(courseDetails?.price).toFixed(2).replace(/\.00$/, '')}
          </Text>
        </View>
        <View style={styles.content}>
          <Text
            style={[
              FONTS.body3,
              {
                color: theme.COLORS.text,
                marginTop: 8,
                textTransform: 'capitalize',
              },
            ]}>
            {courseDetails?.category} course
          </Text>
          <Text
            style={[
              FONTS.h2,
              {
                color: theme.COLORS.text,
                marginTop: 8,
                textTransform: 'capitalize',
              },
            ]}>
            {courseDetails?.title}
          </Text>
          <Text
            style={[
              FONTS.body4,
              {
                color: theme.COLORS.text,
                marginTop: 8,
                textTransform: 'capitalize',
              },
            ]}>
            {courseDetails?.description}
          </Text>
          <View style={styles.badge}>
            <Text
              style={[
                FONTS.body6,
                {color: theme.COLORS.black, textTransform: 'capitalize'},
              ]}>
              {courseDetails?.category}
            </Text>
          </View>
          <Text
            style={[
              FONTS.h4,
              {color: theme.COLORS.text, textTransform: 'capitalize'},
            ]}>
            This course includes:
          </Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Image
                source={ICONS.TIMER}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <Text
                style={[
                  FONTS.body4,
                  {color: theme.COLORS.gray, textTransform: 'capitalize'},
                ]}>
                {courseDetails?.learning_minutes}
               
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Image
                source={ICONS.SECTION}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <Text
                style={[
                  FONTS.body4,
                  {color: theme.COLORS.gray, textTransform: 'capitalize'},
                ]}>
                3 sections
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Image
                source={ICONS.LECTURES}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <Text
                style={[
                  FONTS.body4,
                  {color: theme.COLORS.gray, textTransform: 'capitalize'},
                ]}>
                {courseDetails?.lectures} lectures
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Image
                source={ICONS.MARK}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <Text
                style={[
                  FONTS.body4,
                  {color: theme.COLORS.gray, textTransform: 'capitalize'},
                ]}>
                Mark of completion
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Image
                source={ICONS.GLOBE}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <Text
                style={[
                  FONTS.body4,
                  {color: theme.COLORS.gray, textTransform: 'capitalize'},
                ]}>
                Anywhere access
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Image
                source={ICONS.ACCESS}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <Text
                style={[
                  FONTS.body4,
                  {color: theme.COLORS.gray, textTransform: 'capitalize'},
                ]}>
                Lifetime access
              </Text>
            </View>
          </View>
          <Text
            style={[
              FONTS.h3,
              {color: theme.COLORS.text, textTransform: 'capitalize'},
            ]}>
            This course require:
          </Text>
          <Text style={[styles.desc, {color: theme.COLORS.gray}]}>
            {courseDetails?.requirements}
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.COLORS.text}]}>
            This course target:
          </Text>
          <Text style={[styles.desc, {color: theme.COLORS.gray}]}>
            • {courseDetails?.target}
          </Text>
          <Text style={[styles.sectionTitle, {color: theme.COLORS.text}]}>
            Sections:
          </Text>

          {courseDetails?.Sections.map((section, sectionIndex) => {
            const isExpanded = expandedSections.includes(section.sectionId);
            return (
              <View
                key={section.sectionId}
                style={{
                  marginBottom: 16,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => toggleSection(section.sectionId)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: theme.COLORS.card,
                    padding: 20,
                    // marginTop: 10,
                    // marginVertical: 10,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={[
                      FONTS.h4,
                      {
                        color: theme.COLORS.text,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {sectionIndex + 1} - {section.title}
                  </Text>
                  <Image
                    source={isExpanded ? ICONS.UP_ARROW : ICONS.DOWN_ARROW}
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: theme.COLORS.text,
                      marginLeft: 12,
                    }}
                  />
                </TouchableOpacity>

                {isExpanded &&
                  section.Videos.map((video, videoIndex) => {
                    const isFirstVideo = sectionIndex === 0 && videoIndex === 0;
                    const isEnrolled = courseDetails.enrolled;
                    const canPlay = isFirstVideo || isEnrolled;

                    return (
                      <TouchableOpacity
                        key={video.videoId}
                        style={{
                          // marginVertical: 6,
                          padding: 12,
                          borderRadius: 12,
                          // backgroundColor: theme.COLORS.card,
                          borderBottomColor: theme.COLORS.card,
                          borderBottomWidth: 2,
                          opacity: canPlay ? 1 : 0.5,
                        }}
                        onPress={() => {
                          if (canPlay) {
                            navigation.navigate('VIDEO_PLAYER', {
                              videoUrl: video.videoUrl,
                              title: video.title,
                            });
                          } else {
                            Alert.alert(
                              'Locked',
                              'Enroll to unlock this video.',
                            );
                          }
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View>
                            <Text
                              style={[
                                FONTS.h4,
                                {
                                  color: theme.COLORS.text,
                                  textTransform: 'capitalize',
                                },
                              ]}>
                              {videoIndex + 1}. {video.title}
                            </Text>
                            <Text style={{color: theme.COLORS.gray}}>
                              Video - {formatDuration(video.duration)}
                            </Text>
                          </View>
                          <Image
                            source={
                              canPlay ? ICONS.VIDEO_PLAY : ICONS.SUBSCRIPTION
                            }
                            style={{
                              width: 24,
                              height: 24,
                              tintColor: canPlay
                                ? theme.COLORS.primary
                                : theme.COLORS.golden,
                              marginLeft: 12,
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            );
          })}
        </View>
      </ScrollView>
      {/* {!isEnrolled && ( */}
      <View style={[styles.footer, {backgroundColor: theme.COLORS.card}]}>
        <Text
          style={[
            FONTS.h1,
            {
              color: theme.COLORS.text,
              textTransform: 'capitalize',
              padding: 12,
              // borderRadius: 8,

              alignItems: 'center',
            },
          ]}>
          ₹ {parseFloat(courseDetails?.price).toFixed(2).replace(/\.00$/, '')}
        </Text>
        <TouchableOpacity
          onPress={handleBuyNow}
          style={[
            {
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 10,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              flexDirection: 'row',
            },
            {backgroundColor: theme.COLORS.primary},
          ]}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.COLORS.background} />
          ) : (
            <Text style={{color: theme.COLORS.background, ...FONTS.h3}}>
              Buy Now
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* // )} */}
    </SafeAreaView>
  );
};
export default CourseDetails;
const styles = StyleSheet.create({
  container: {flex: 1},
  banner: {width: '100%', height: 180, backgroundColor: '#e3e3e3'},
  priceBar: {flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10},
  content: {padding: 16},
  desc: {fontSize: 14, marginTop: 8, lineHeight: 20},
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#d0d8f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  sectionTitle: {marginTop: 20, fontSize: 16, fontWeight: '600'},
  features: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 16},
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    gap: 6,
    marginBottom: 10,
  },
  iconStyle: {width: 20, height: 20, tintColor: 'gray', marginRight: 6},
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    // alignItems: 'center',
    gap: 10,
  },
  btn: {flex: 1, padding: 12, borderRadius: 8, alignItems: 'center'},
});
