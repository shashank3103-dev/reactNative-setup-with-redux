// import React, { useState } from "react";
// import {
//   Alert,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ToastAndroid,
//   ScrollView,
// } from "react-native";
// import { useAppTheme } from "../../resources/ThemeContext";
// import { FONTS } from "../../resources/Theme";
// import { ICONS } from "../../resources";
// import CommonHeader from "../../components/header/CommonHeader";

// const PaymentScreen = ({ navigation, route }: any) => {
//   const theme = useAppTheme();
//   const { course } = route.params || {};
//   const [paymentMethod, setPaymentMethod] = useState("UPI");
//   const [upiId, setUpiId] = useState("");
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });
//   const [walletBalance, setWalletBalance] = useState(1000); // Example wallet balance
//   const handlePayNow = () => {
//     if (paymentMethod === "UPI" && !upiId.trim()) {
//       return Alert.alert("Error", "Please enter your UPI ID");
//     }

//     ToastAndroid.show("Payment processing...", ToastAndroid.SHORT);
//     setTimeout(() => {
//       ToastAndroid.show("Payment Successful!", ToastAndroid.SHORT);
//       navigation.navigate("HOME");
//     }, 1500);
//   };

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.COLORS.background }]}
//     >
//       <CommonHeader title="Payment Screen" />
//       <ScrollView contentContainerStyle={{ paddingBottom: 100, padding:10, }}>
//         <Text
//           style={[FONTS.h2, { color: theme.COLORS.text, marginBottom: 20 }]}
//         >
//           Payment Summary
//         </Text>
//         <View style={[styles.card, { backgroundColor: theme.COLORS.card }]}>
//           <Text style={[FONTS.body4, { color: theme.COLORS.text }]}>
//             Course:
//           </Text>
//           <Text style={[FONTS.body3, { color: theme.COLORS.primary }]}>
//             {course?.title || "N/A"}
//           </Text>

//           <Text
//             style={[FONTS.body4, { marginTop: 10, color: theme.COLORS.text }]}
//           >
//             Total Price:
//           </Text>
//           <Text style={[FONTS.h3, { color: theme.COLORS.primary }]}>
//             ₹{parseFloat(course?.price || "0").toLocaleString()}
//           </Text>
//         </View>

//         <Text style={[FONTS.h3, { color: theme.COLORS.text, marginTop: 20 }]}>
//           Select Payment Method
//         </Text>

//         <View style={styles.methodRow}>
//           {["UPI", "CARD", "WALLET"].map((method) => (
//             <TouchableOpacity
//               key={method}
//               onPress={() => setPaymentMethod(method)}
//               style={[
//                 styles.paymentOption,
//                 {
//                   borderColor:
//                     paymentMethod === method
//                       ? theme.COLORS.primary
//                       : theme.COLORS.card,
//                 },
//               ]}
//             >
//               <Text style={[FONTS.body4, { color: theme.COLORS.text }]}>
//                 {method}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {paymentMethod === "UPI" && (
//           <TextInput
//             placeholder="Enter your UPI ID"
//             placeholderTextColor={theme.COLORS.gray}
//             style={[
//               styles.input,
//               {
//                 backgroundColor: theme.COLORS.card,
//                 color: theme.COLORS.text,
//                 borderColor: theme.COLORS.primary,
//               },
//             ]}
//             value={upiId}
//             onChangeText={setUpiId}
//           />
//         )}

//         <TouchableOpacity
//           onPress={handlePayNow}
//           style={[styles.payButton, { backgroundColor: theme.COLORS.primary }]}
//         >
//           <Text style={[FONTS.body3, { color: theme.COLORS.white }]}>
//             Pay Now
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PaymentScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 20,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   methodRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 16,
//   },
//   paymentOption: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     borderWidth: 1,
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 8,
//   },
//   payButton: {
//     marginTop: 30,
//     borderRadius: 10,
//     paddingVertical: 14,
//     alignItems: "center",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { useAppTheme } from "../../resources/ThemeContext";
import { FONTS } from "../../resources/Theme";
import CommonHeader from "../../components/header/CommonHeader";
import URLManager from "../../networkLayer/URLManager";

const PaymentScreen = ({ navigation, route }: any) => {
  const theme = useAppTheme();
  const { course } = route.params || {};
  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [upi, setUpi] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  async function checkoutCourseAPI() {
    try {
      setLoading(true);
      let urlManager = new URLManager();
      return urlManager
        .checkoutCourse({
          paymentMethod: method,
          shippingAddress: "",
        })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!res.error) {
            console.log(res);

            Alert.alert("Success", res.message);
          } else {
            Alert.alert("Error", res.error);
            if (res.error == "Failed to send ") Alert.alert("Error", res.error);
          }
          console.log("API response", res);
        })
        .catch((e) => {
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
  const handlePay = () => {
    if (method === "UPI" && !upi) {
      return ToastAndroid.show("Enter UPI ID", ToastAndroid.SHORT);
    }
    if (method === "CARD" && (!cardNumber || !expiry || !cvv)) {
      return ToastAndroid.show("Enter all card details", ToastAndroid.SHORT);
    }

    checkoutCourseAPI();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.COLORS.background }]}
    >
      <CommonHeader title="Payment Screen" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100, padding: 10 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text
              style={[FONTS.h2, { color: theme.COLORS.text, marginBottom: 20 }]}
            >
              Payment Summary
            </Text>
            <View
              style={[
                {
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                },
                { backgroundColor: theme.COLORS.card },
              ]}
            >
              <Text style={[FONTS.body4, { color: theme.COLORS.text }]}>
                Course:
              </Text>
              <Text style={[FONTS.body3, { color: theme.COLORS.primary }]}>
                {course?.title || "N/A"}
              </Text>

              <Text
                style={[
                  FONTS.body4,
                  { marginTop: 10, color: theme.COLORS.text },
                ]}
              >
                Total Price:
              </Text>
              <Text style={[FONTS.h3, { color: theme.COLORS.primary }]}>
                ₹{parseFloat(course?.price || "0").toLocaleString()}
              </Text>
            </View>

            <Text style={[FONTS.h3, { color: theme.COLORS.text }]}>
              Choose Payment Method
            </Text>

            <View style={styles.methodRow}>
              {["UPI", "CARD", "WALLET"].map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMethod(m)}
                  style={[
                    styles.option,
                    {
                      borderColor:
                        method === m ? theme.COLORS.primary : theme.COLORS.card,
                    },
                  ]}
                >
                  <Text style={{ color: theme.COLORS.text }}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {method === "UPI" && (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.COLORS.card,
                    color: theme.COLORS.text,
                  },
                ]}
                placeholder="Enter UPI ID"
                placeholderTextColor={theme.COLORS.gray}
                value={upi}
                onChangeText={setUpi}
              />
            )}

            {method === "CARD" && (
              <>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.COLORS.card,
                      color: theme.COLORS.text,
                    },
                  ]}
                  placeholder="Card Number"
                  keyboardType="numeric"
                  maxLength={16}
                  placeholderTextColor={theme.COLORS.gray}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.COLORS.card,
                      color: theme.COLORS.text,
                    },
                  ]}
                  placeholder="Expiry MM/YY"
                  placeholderTextColor={theme.COLORS.gray}
                  value={expiry}
                  onChangeText={setExpiry}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.COLORS.card,
                      color: theme.COLORS.text,
                    },
                  ]}
                  placeholder="CVV"
                  keyboardType="numeric"
                  maxLength={3}
                  placeholderTextColor={theme.COLORS.gray}
                  value={cvv}
                  onChangeText={setCvv}
                />
              </>
            )}

            {method === "WALLET" && (
              <Text style={[FONTS.body4, { color: theme.COLORS.gray }]}>
                Wallet balance will be used to complete this payment.
              </Text>
            )}

            <TouchableOpacity
              onPress={handlePay}
              style={[styles.payBtn, { backgroundColor: theme.COLORS.primary }]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.COLORS.white} />
              ) : (
                <Text style={[FONTS.body3, { color: theme.COLORS.white }]}>
                  Pay Now
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  payBtn: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});
