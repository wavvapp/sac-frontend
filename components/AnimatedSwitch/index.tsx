import { theme } from "@/theme"
import { useState } from "react"
import { Pressable, StyleSheet, ViewStyle } from "react-native"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  runOnJS,
  SharedValue,
} from "react-native-reanimated"

interface AnimatedSwitchProps {
  isOn: SharedValue<boolean> // The shared value (0 or 1) for the switch state
  onPress: () => void // Callback for when the switch is pressed
  style?: ViewStyle // Optional style for the switch container
  duration?: number // Optional animation duration, defaults to 400
  isLoading: boolean // Loading state to show the thumb in the middle
}

export const AnimatedSwitch = ({
  isOn,
  onPress,
  style,
  duration = 400,
  isLoading,
}: AnimatedSwitchProps) => {
  const [text, setText] = useState(isOn.value ? "ON" : "OFF")
  const height = useSharedValue(130)
  const width = useSharedValue(65)

  const updateTextWithDelay = (newText: string) => {
    setTimeout(() => {
      runOnJS(setText)(newText)
    }, duration / 2)
  }

  // This will listen for changes in the shared value and update the text accordingly with a delay
  useDerivedValue(() => {
    if (isLoading) return
    const text = isOn.value ? "ON" : "OFF"
    runOnJS(updateTextWithDelay)(text)
  }, [isOn.value, isLoading])

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    if (isLoading)
      return {
        transform: [{ translateY: height.value * 0.25 }],
        borderRadius: 4,
      }
    const moveValue = interpolate(
      Number(isOn.value),
      [0, 1],
      [0, height.value - width.value],
    )
    const translateValue = withTiming(moveValue, { duration })

    return {
      transform: [{ translateY: translateValue }],
      borderRadius: 4,
    }
  })

  const textAnimatedStyle = useAnimatedStyle(() => {
    if (isLoading)
      return {
        transform: [{ translateY: height.value * 0.4 }],
      }
    const moveValue = interpolate(
      Number(isOn.value),
      [0, 1],
      [height.value * 0.65, height.value * 0.25],
    )
    const translateValue = withTiming(moveValue, { duration })

    return {
      transform: [{ translateY: translateValue }],
    }
  })

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height
          width.value = e.nativeEvent.layout.width
        }}
        style={[switchStyles.track, style]}>
        <Animated.Text style={[switchStyles.text, textAnimatedStyle]}>
          {!isLoading ? text : " "}
        </Animated.Text>
        <Animated.View style={[switchStyles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  )
}

const switchStyles = StyleSheet.create({
  track: {
    alignItems: "flex-start",
    width: 100,
    height: 40,
    padding: 5,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
  },
  thumb: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: theme.colors.black,
  },
  text: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: theme.fontWeight.bold,
  },
})
