import { ResizeMode, Video } from "expo-av"
import { useRef } from "react"
import { StyleSheet } from "react-native"
export default function NoiseVideo() {
  const videoRef = useRef<Video>(null)

  return (
    <Video
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
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
})
