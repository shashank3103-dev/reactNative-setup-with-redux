import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CommonHeader from '../../components/header/CommonHeader';
import {useAppTheme} from '../../resources/ThemeContext';
import {TextInput} from 'react-native-paper';
import {FONTS, ICONS} from '../../resources';
import {Dropdown} from 'react-native-element-dropdown';
import {COURSE_CATEGORY} from '../../resources/DummyData';
import CustomButton from '../../components/CustomButton';
import {SelectedImage, uploadCourseBody} from '../../networkLayer/Modals';
import ImageSelectionModal from '../../components/ImagePickerModel';
import URLManager from '../../networkLayer/URLManager';
import CustomTextInput from '../../components/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const CourseUpload = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [requirements, setRequirement] = useState('');
  const [duration, setDuration] = useState('');
  const [lectures, setLectures] = useState('');
  const [learning_minutes, setLearningMinutes] = useState('');
  const [courseImage, setCourseImage] = useState<SelectedImage | null>(null);
  const [category, setCategory] = useState('');
  const [currentSelection, setCurrentSelection] = useState(0);
  const [currentSelectionImage, setCurrentSelectionImage] = useState(0);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useAppTheme();
  const courseCategory = COURSE_CATEGORY;

  async function uploadCourseAPI() {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('title', title);
      if (courseImage) {
        formData.append('courseImage', {
          uri: courseImage.uri,
          type: courseImage.type || 'image/jpeg',
          name: courseImage.fileName || `certificate_${Date.now()}.jpg`,
        });
      }
      formData.append('category', category);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('target', target);
      formData.append('requirements', requirements);
      formData.append('duration', duration);
 
      formData.append('is_published', 'true');

      if (
        !title ||
        !category ||
        !price ||
        !description ||
        !target ||
        !requirements ||
        !duration 
      ) {
        Alert.alert('Error', 'Please fill all fields');
        setLoading(false);
        return;
      }

      // Log the formData for debugging

      console.log('Sending data to API:', formData);
      let urlManager = new URLManager();
      return urlManager
        .uploadCourse(formData as unknown as uploadCourseBody)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (!res.error) {
            console.log(res);

            Alert.alert('Success', res.message);
          } else {
            Alert.alert('Error', res.error);
            if (res.error == 'Failed to send ') Alert.alert('Error', res.error);
          }
          console.log('API response', res);
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
      setLoading(false);
    }
  }

  const uploadCourseImage = () => {
    return (
      <View style={{marginVertical: 10}}>
        <TouchableOpacity
          onPress={() => {
            if (currentSelection == 1) {
              setCurrentSelection(-1);
            } else {
              setCurrentSelection(1);
            }
          }}
          style={{
            width: 300,
            borderWidth: 1,
            paddingVertical: '3%',
            alignContent: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            borderColor: theme.COLORS.lightGray,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: '3%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: theme.COLORS.gray,
                ...FONTS.h3,
                flex: 1,
                padding: '2%',
                borderRadius: 5,
                borderColor: theme.COLORS.lightGray,
              }}>
              Course Image
            </Text>
            <Image
              style={{
                height: 10,
                width: 10,
                marginEnd: 5,
                tintColor: theme.COLORS.gray,
              }}
              resizeMode="contain"
              source={currentSelection == 1 ? ICONS.UP_ARROW : ICONS.DOWN_ARROW}
            />
          </View>
          {currentSelection == 1 && (
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: theme.COLORS.lightGray,
                marginTop: 5,
                padding: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 5,
                  padding: '5%',
                }}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    height: theme.SIZES.height * 0.2,
                    // height:'30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    overflow: 'hidden',
                    borderColor: theme.COLORS.lightGray,
                    marginBottom: 10,
                  }}>
                  {courseImage ? (
                    <View style={{overflow: 'hidden'}}>
                      <Image
                        resizeMode="contain"
                        style={{
                          height: theme.SIZES.height * 0.2,
                          // height: 30,
                          width: theme.SIZES.width * 0.6,
                          // width: 40,
                        }}
                        source={{uri: courseImage?.uri}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setCourseImage(null);
                        }}
                        style={{
                          position: 'absolute',
                          height: 45,
                          right: 40,
                          width: 45,
                        }}>
                        <Image
                          source={ICONS.DOWN_ARROW}
                          style={{
                            height: 45,
                            width: 45,
                            tintColor: theme.COLORS.red,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <Text
                        style={{
                          color: theme.COLORS.gray,
                          ...FONTS.h4,
                          padding: '2%',
                          borderRadius: 5,
                          marginBottom: 10,
                          textAlign: 'center',
                          borderColor: theme.COLORS.lightGray,
                        }}>
                        Upload Course Picture
                      </Text>
                      <CustomButton
                        style={{width: '70%', borderRadius: 5}}
                        title={'Upload'}
                        onPress={() => {
                          setCurrentSelectionImage(1);
                          setOpenImagePicker(true);
                        }}
                      />
                    </>
                  )}
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  function handleSelectImage(imageFile: SelectedImage) {
    setOpenImagePicker(false);
    if (currentSelectionImage === 1) {
      setCourseImage(imageFile);
    } else {
      Alert.alert('Warning', 'Invalid selection for image upload');
    }
  }
  return (
    <SafeAreaView
      style={[{flex: 1}, {backgroundColor: theme.COLORS.background}]}>
      <CommonHeader title="Course Upload" />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={10} // pushes input a bit above keyboard
        keyboardShouldPersistTaps="handled">
        <Text
          style={[
            FONTS.h1,
            {color: theme.COLORS.text, marginBottom: 20, marginStart: 20},
          ]}>
          Upload
        </Text>
        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomTextInput
            label="Course Title"
            value={title}
            onChangeText={setTitle}
            leftIcon="book"
          />
          <Dropdown
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              borderColor: theme.COLORS.gray,
              borderRadius: 5,
              marginBottom: 20,
              paddingHorizontal: 10,
              backgroundColor: theme.COLORS.background,
            }}
            containerStyle={{
              borderRadius: 6,
              backgroundColor: theme.COLORS.card,
            }}
            selectedTextStyle={{
              fontSize: 14,
              color: theme.COLORS.text,
            }}
            placeholderStyle={{
              fontSize: 14,
              color: theme.COLORS.gray,
            }}
            itemTextStyle={{
              color: theme.COLORS.primary,
              fontSize: 14,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: theme.COLORS.gray,
            }}
            data={courseCategory}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            searchPlaceholder="Search..."
            search
            maxHeight={300}
            value={category}
            onChange={item => setCategory(item.value)}
          />

          <CustomTextInput
            label="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            leftIcon="currency-inr"
          />

          <CustomTextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            leftIcon="text"
          />

          <CustomTextInput
            label="Target"
            value={target}
            onChangeText={setTarget}
            leftIcon="account-group"
          />

          <CustomTextInput
            label="Requirements"
            value={requirements}
            onChangeText={setRequirement}
            leftIcon="clipboard-list"
          />
          {/* <TextInput
            label="Duration"
            mode="outlined"
            keyboardType="default"
            value={duration}
            onChangeText={text => {
              setDuration(text);
            }}
            style={{
              width: '90%',
              marginBottom: 20,
            }}
            theme={{
              colors: {
                text: theme.COLORS.text,
                primary: theme.COLORS.text,
                background: theme.COLORS.background,
                placeholder: '#999',
              },
            }}
          /> */}
          <CustomTextInput
            label="Duration"
            value={duration}
            onChangeText={setDuration}
            leftIcon="clock"
          />

          {uploadCourseImage()}

          <CustomButton
            title="Upload Course"
            onPress={uploadCourseAPI}
            style={{width: '90%', borderRadius: 8}}
          />
        </View>
        <ImageSelectionModal
          visible={openImagePicker}
          onClose={() => {
            setOpenImagePicker(false);
          }}
          onImageSelected={handleSelectImage}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CourseUpload;

const styles = StyleSheet.create({});
