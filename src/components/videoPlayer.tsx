import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Video from "react-native-video";

const VideoPlayer = ({ route }: any) => {
  const { videoUrl } = route.params;
  console.log(videoUrl, "VIDEO URL");

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl}}
        style={styles.video}
        controls
        resizeMode="contain"
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.6,
  },
});
