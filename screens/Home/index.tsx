import UserStatus from "@/components/cards/UserStatus"
import PerlinNoise from "@/components/PerlinNoise"
import { availableFriends, offlineFriends } from "@/data/users"
import { userInfo } from "@/data/user"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native"
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { AnimatedSwitch } from "@/components/AnimatedSwitch"
import { useMemo, useRef, useState } from "react"
import Signaling, { SignalingRef } from "@/components/lists/Signaling"
import Settings from "@/components/vectors/Settings"
import { theme } from "@/theme"
import NoFriends from "@/components/cards/NoFriends"

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

const { width } = Dimensions.get("window")
export default function HomeScreen() {
  const [_, setIsVisible] = useState(false)
  const isOn = useSharedValue(false)
  const signalingRef = useRef<SignalingRef>(null)

  const hasFriends = useMemo(() => {
    // TODO: Use the actual friends list, once BE is integrated */
    const friends = [...availableFriends, ...offlineFriends]
    return friends.length !== 0
  }, [])

  const handlePress = () => {
    isOn.value = !isOn.value
  }

  useDerivedValue(() => {
    if (isOn.value) {
      return runOnJS(setIsVisible)(true)
    }
    return runOnJS(setIsVisible)(false)
  }, [isOn.value])

  return (
    <View style={styles.container}>
      <PerlinNoise isOn={isOn} color1="#281713" color2="blue" />
      <View style={{ width: "100%" }}>
        <TouchableOpacity style={styles.iconContainer}>
          <Settings />
        </TouchableOpacity>
      </View>
      {!hasFriends ? (
        <NoFriends />
      ) : (
        <>
          <View style={styles.UserStatus}>
            <UserStatus isOn={isOn} friends={offlineFriends} user={userInfo} />
          </View>
          <AnimatedSwitch
            isOn={isOn}
            onPress={handlePress}
            style={styles.switch}
          />
          <Signaling ref={signalingRef} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    paddingTop: 44,
    paddingHorizontal: 21,
  },
  iconContainer: {
    backgroundColor: theme.colors.gray,
    borderRadius: 100,
    padding: 4,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  UserStatus: {
    marginVertical: 4,
    width: "100%",
  },
  switch: {
    width: width * 0.18,
    height: width * 0.35,
    padding: 10,
    marginVertical: 94,
  },
})
