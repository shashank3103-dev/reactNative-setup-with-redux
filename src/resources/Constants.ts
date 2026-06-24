// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

export const platform = Platform.OS;
//
export const kHEADERLANGUAGE = "en_US";
export const kCLIENTVERSION = "1.2.1:" + platform;

export const baseUrl = 
"http://10.0.2.2:11000";
// "https://education-plateform-backend-production.up.railway.app"; // Change this to your backend URL                                   

// Used for async storage
export const storageKeys = {
  kFCM_TOKEN: "fcmToken",
  kROLE: "role",
  kTOKEN: "token",
  kEMAIL: "email",
  kPASSWORD: "password",
  kPROFILE_IMAGE: "profileImage",
  kPROFILE_DETAILS: "profileDetails",
  kDEVICETOKEN: "deviceToken",
};

export const EndPoints = {
  GETDATAENDPOINT: "/send-otp",
  VERIFY_OTP: "/api/user/verifyEmail-otp",
  RESEND_OTP: "/api/user/resend-otp",
  SIGN_UP: "/api/user/signup",
  LOGIN: "/api/user/login",
  GET_ALL_COURSE: "/api/course/getall",
  GET_BANNERS: "/api/banner/getall",
  GET_PROFILE: "/api/user/profile",
  ADD_TO_CART: "/api/order/cart/add",
  GET_CART: "/api/order/cart/get",
  UPLOAD_COURSE: "/api/course/upload",
  CHECKOUT: "/api/order/checkout",
  GET_LECTURES: "/api/video/course/",
  PAYMENT_ORDER: "/api/payment/order",
  PAYMENT_VERIFY: "/api/payment/verify",
  GET_COURSE_DETAILS: "/api/course/get-course-details/",
  SEND_FCM_TOKEN: "/api/user/save-fcm-token",
  GET_NOTIFICATION: '/api/notifications/get-notification',
  GOOGLE_AUTH: '/api/user/auth/google-login',
  CREATE_LIVE_CLASS: '/api/live/sessions',
  LIVE_CLASS: '/api/live/sessions/',
  TUTOR_DASHBOARD: '/api/course/tutor/dashboard',
  TUTOR_BOOKING: "/api/enroll/my-enrollments"

};

export default {
  platform,
  kHEADERLANGUAGE,
  kCLIENTVERSION,
  baseUrl,
  EndPoints,
};
