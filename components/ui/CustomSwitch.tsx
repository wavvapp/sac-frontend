import { useEffect, useMemo } from "react"
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"

interface CustomSwitchProp {
  onPress: () => void
  switchTrackBackground: string
  thumbBackground: string
  isOn?: boolean
}
export default function CustomSwitch({
  onPress,
  switchTrackBackground,
  thumbBackground,
  isOn = false,
}: CustomSwitchProp) {
  const translateX = useMemo(() => new Animated.Value(isOn ? 24 : 0), [isOn])

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOn ? 24 : 0,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  }, [isOn, translateX])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.switchTrack,
          {
            backgroundColor: switchTrackBackground,
          },
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX }], backgroundColor: thumbBackground },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  switchTrack: {
    width: 48,
    height: 28,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
})
