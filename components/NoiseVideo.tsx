import { ResizeMode, Video } from "expo-av"
import { useRef } from "react"
import { Dimensions, StyleSheet } from "react-native"
const { width, height } = Dimensions.get("window")
export default function NoiseVideo() {
  const videoRef = useRef<Video>(null)

  return (
    <Video
      videoStyle={{ backgroundColor: "green", padding: 3 }}
      ref={videoRef}
      source={require("@/assets/videos/signal_background.mp4")}
      style={styles.video}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
    />
  )
}

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
  },
})
