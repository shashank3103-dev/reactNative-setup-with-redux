// import { StyleSheet, Text, View, Image } from "react-native";
// import React, { FC } from "react";
// import Carousel from "react-native-reanimated-carousel";

// import { Dimensions } from "react-native";
// import ScalePress from "./ScalePress";


// const AdCarousal: FC<{ adData: any }> = ({ adData }) => {
//   const screenWidth = Dimensions.get("window").width;
//   const baseOptions = {
//     vertical: false,
//     width: screenWidth,
//     height: screenWidth * 0.5,
//   };

//   return (
//     <View style={{  marginVertical: 20 }}>
//       <Carousel
//         {...baseOptions}
//         loop
//         pagingEnabled
//         snapEnabled
//         autoPlay
//         autoPlayInterval={3000}
//         mode='parallax'
//         data={adData}
//         modeConfig={{
//           parallaxScrollingScale: 0.9,
//           parallaxScrollingOffset: 0,
//         }}
//         renderItem={({ item }: any) => {
//           return (
//             <ScalePress
//               style={{
//                 width: screenWidth,
               
//               }}
//               onPress={() => {
//                 // TODO: handle press event, e.g., navigate or show details
//               }}
//             >
//               <Image source={{ uri: item.images }} style={{
//                 width: screenWidth,
//                 height: screenWidth * 0.5,
//                 borderRadius: 20,
//                 overflow: "hidden",
               
//               }} />
//             </ScalePress>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default AdCarousal;

// const styles = StyleSheet.create({});
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { FC } from "react";
import Carousel from "react-native-reanimated-carousel";
import ScalePress from "./ScalePress";
import { useNavigation } from "@react-navigation/native";

const AdCarousal: FC<{ adData: any[] }> = ({ adData }) => {
    const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  };

  // if no data, show a friendly fallback
  if (!adData || adData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🚫 No Banners Available</Text>
      </View>
    );
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 0,
        }}
        renderItem={({ item }) => (
          <ScalePress
            style={{
              width: screenWidth,
            }}
            onPress={() => {
            //  if (item.screen) {
            //     navigation.navigate(item.screen);
            //   } else {
            //     console.warn("No screen defined in banner");
            //   }
            }}
          >
            <Image
              source={{ uri: item.images }}
              style={{
                width: screenWidth,
                height: screenWidth * 0.5,
                borderRadius: 20,
                overflow: "hidden",
              }}
              resizeMode="cover"
            />
           
          </ScalePress>
        )}
      />
    </View>
  );
};

export default AdCarousal;

const styles = StyleSheet.create({
   debugLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  debugText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    marginVertical: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
});
