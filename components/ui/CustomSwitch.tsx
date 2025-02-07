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
  isOn: boolean
}
export default function CustomSwitch({
  onPress,
  switchTrackBackground,
  thumbBackground,
  isOn,
}: CustomSwitchProp) {
  const translateX = new Animated.Value(isOn ? 24 : 0)
  const toggleSwitch2 = () => {
    Animated.timing(translateX, {
      toValue: isOn ? 0 : 24,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onPress())
  }
  return (
    <TouchableWithoutFeedback onPress={toggleSwitch2}>
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
