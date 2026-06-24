import URLService from "./URLServices";
import { EndPoints, baseUrl } from "../resources/Constants";
import {
  cartBody,
  checkoutBody,
  createLiveClassBody,
  googleAuthLoginBody,
  loginBody,
  orderPaymentBody,
  razorpayVerificationBody,
  resendOtpBody,
  sendFCMTokenBody,
  signUpRequestBody,
  uploadCourseBody,
  verifyOtpBody,
} from "./Modals";

export default class URLManager {
  getData(data: number) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GETDATAENDPOINT + `${data}.json`;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "GET")
      .then((res: any) => res);
  }

  userOrTutorSignUp(data: signUpRequestBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.SIGN_UP;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  verifyEmailOTP(data: verifyOtpBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.VERIFY_OTP;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  resendEmailOTP(data: resendOtpBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.RESEND_OTP;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  loginTutorOrStudent(data: loginBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.LOGIN;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  getAllCourses() {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GET_ALL_COURSE;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
  getBanners() {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GET_BANNERS;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
  getProfile() {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GET_PROFILE;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
  addToCart(data: cartBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.ADD_TO_CART;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  uploadCourse(data: uploadCourseBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.UPLOAD_COURSE;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  checkoutCourse(data: checkoutBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.CHECKOUT;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  getLecturesByCourseID(courseId: number) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GET_LECTURES + courseId;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
  paymentOrder(data: orderPaymentBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.PAYMENT_ORDER;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  paymentVerify(data: razorpayVerificationBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.PAYMENT_VERIFY;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  getCourseDetailsByCourseID(courseId: number) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GET_COURSE_DETAILS + courseId;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
  sendFCMToken(data: sendFCMTokenBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.SEND_FCM_TOKEN;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  getNotification() {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GET_NOTIFICATION;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
  googleAuthLogin(data: googleAuthLoginBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.GOOGLE_AUTH;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  createTutorLiveSessions(data: createLiveClassBody) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.CREATE_LIVE_CLASS;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, data, "POST")
      .then((res: any) => res);
  }
  joinLiveSessionStudent(roomId: string) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.LIVE_CLASS + roomId + "/live";
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "POST")
      .then((res: any) => res);
  }
  endLiveSessionStudent(roomId: string) {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.LIVE_CLASS + roomId + "/end";
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "POST")
      .then((res: any) => res);
  }
  getTutorDashboard() {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.TUTOR_DASHBOARD;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
  getTutorBooking() {
    let urlService = new URLService();
    let urlPath = baseUrl + EndPoints.TUTOR_BOOKING;
    console.log(urlPath);
    return urlService
      .fetchAsyncData(urlPath, {}, "GET")
      .then((res: any) => res);
  }
}
