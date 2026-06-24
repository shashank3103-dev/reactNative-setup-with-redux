import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useAppTheme} from '../../resources/ThemeContext';
import HomeHeader from '../../components/header/HomeHeader';
import AdCarousal from '../../components/AdCarousal';
import {adData, eduServices} from '../../resources/DummyData';
import {FONTS} from '../../resources/Theme';
import URLManager from '../../networkLayer/URLManager';
import {Course} from '../../stateManagement/modals/HomeScreenModal';
import {ICONS} from '../../resources';

const SERVICES = eduServices;
const HomeScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [banners, setBanners] = useState([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCourseDetailApi();
    fetchBannersDetailApi();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchCourseDetailApi(), fetchBannersDetailApi()]).finally(() =>
      setRefreshing(false),
    );
  };

  const renderService = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        {
          backgroundColor: theme.COLORS.primary,
        },
      ]}>
      <Image
        style={[
          {
            width: 20,
            height: 20,
            tintColor: theme.COLORS.white,
          },
        ]}
        resizeMode="contain"
        source={item.image}></Image>

      <Text
        style={[FONTS.body5, {color: theme.COLORS.white}]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const theme = useAppTheme();

  async function fetchCourseDetailApi() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      return urlManager
        .getAllCourses()
        .then(res => {
          console.log(res);
          return res.json() as Promise<any>;
        })
        .then(async (res: any) => {
          console.log(res.data, 'COURSE DETAILS');
          if (res?.data) {
            setCourses(res.data);
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
  async function fetchBannersDetailApi() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      return urlManager
        .getBanners()
        .then(res => {
          console.log(res);
          return res.json() as Promise<any>;
        })
        .then(async (res: any) => {
          console.log(res, 'BANNERS DETAILS');
          if (res?.banners && Array.isArray(res.banners)) {
            setBanners(res.banners);
          } else {
            console.log('Banners not in expected format');
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

  async function handleAddToCart(courseId: string) {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      return urlManager
        .addToCart({courseId: courseId})
        .then(res => {
          return res.json() as Promise<any>;
        })
        .then((res: any) => {
          if (!res.error) {
            console.log(res);

            ToastAndroid.show(res.message, ToastAndroid.SHORT);
            setCartItems(prev => [...prev, courseId]);
          } else {
            if (res.error == 'Failed to Add to Cart')
              // Alert.alert("Error", res.error);
              ToastAndroid.show(
                res.error || 'Failed to Add to Cart',
                ToastAndroid.SHORT,
              );
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
  if (loading && !refreshing) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {backgroundColor: theme.COLORS.background},
        ]}>
        <ActivityIndicator size="large" color={theme.COLORS.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.COLORS.background}]}>
      <HomeHeader
        title="Home"
        onBackPress={() => navigation.navigate('PROFILE')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.COLORS.primary]}
            tintColor={theme.COLORS.primary}
          />
        }>
        <AdCarousal adData={banners} />

        <Text style={[FONTS.h3, {color: theme.COLORS.text, marginStart: 20}]}>
          Our Services
        </Text>

        <View style={[styles.card, {backgroundColor: theme.COLORS.card}]}>
          <FlatList
            data={SERVICES}
            renderItem={renderService}
            // keyExtractor={({ item }: any) => item.id}
            // horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.serviceList}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={[FONTS.h3, {color: theme.COLORS.text}]}>
            Our Courses
          </Text>

          <TouchableOpacity onPress={() => setShowAllCourses(!showAllCourses)}>
            <Text
              style={[
                FONTS.body4,
                {
                  color: theme.COLORS.primary,
                  textDecorationLine: 'underline',
                },
              ]}>
              {showAllCourses ? 'View Less' : 'View More'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={showAllCourses ? courses : courses.slice(0, 4)}
          keyExtractor={item => item.courseId.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('COURSE_DETAILS', {course: item})
              }
              style={{
                backgroundColor: theme.COLORS.background,
                borderRadius: 12,
                borderColor: theme.COLORS.card,
                borderWidth: 1,
                padding: 12,
                // height: 250,
                width: '47%', // Two cards per row with margin
                margin: '1.5%',
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: '100%',
                  height: 80,
                  borderRadius: 8,
                  borderColor: theme.COLORS.card,
                  borderWidth: 0.5,
                }}
                resizeMode="cover"
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    color: theme.COLORS.text,
                    marginTop: 8,
                    textTransform: 'capitalize',
                  },
                ]}
                numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                style={[FONTS.body5, {color: theme.COLORS.gray}]}
                numberOfLines={1}>
                Tutor: {item.tutor}
              </Text>
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: theme.COLORS.lightGreen,
                  paddingHorizontal: 8,
                  // paddingVertical: 4,
                  borderRadius: 10,
                  // marginTop: 8,
                }}>
                <Text
                  style={[FONTS.body6, {color: theme.COLORS.gray}]}
                  numberOfLines={1}>
                  {item.category}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text style={[FONTS.body5, {color: theme.COLORS.primary}]}>
                  ₹{parseFloat(item.price).toLocaleString()}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!cartItems.includes(item.courseId)) {
                      handleAddToCart(item.courseId);
                    }
                  }}
                  style={{
                    marginLeft: 'auto',
                  }}>
                  <Image
                    source={
                      cartItems.includes(item.courseId)
                        ? ICONS.ADD_TO_CART
                        : ICONS.CART
                    }
                    style={{
                      width: 20,
                      height: 20,
                      // marginLeft: "auto",
                      tintColor: theme.COLORS.primary,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  serviceList: {
    flexDirection: 'row',
    gap: 25,
  },
  container: {
    flex: 1,
  },
  card: {
    padding: 7,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceCard: {
    flexDirection: 'column',
    borderRadius: 10,
    width: 70,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
