import UserStatus from "@/components/cards/UserStatus"
import PerlinNoise from "@/components/PerlinNoise"
import { offlineFriends } from "@/data/users"
import { userInfo } from "@/data/user"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View, Dimensions } from "react-native"
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"
import { AnimatedSwitch } from "@/components/AnimatedSwitch"
import { useRef, useState } from "react"
import Signaling, { SignalingRef } from "@/components/lists/Signaling"
import Settings from "@/components/vectors/Settings"
import { theme } from "@/theme"
import Badge from "@/components/ui/Badge"
import ShareIcon from "@/components/vectors/ShareIcon"
import { CustomButton } from "@/components/ui/Button"
import { useNavigation } from "@react-navigation/native"
import { onShare } from "@/utils/share"

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

const { width } = Dimensions.get("window")
export default function HomeScreen() {
  const [_, setIsVisible] = useState(false)
  const isOn = useSharedValue(false)
  const signalingRef = useRef<SignalingRef>(null)
  const navigation = useNavigation<HomeScreenProps>()

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
      {/* <PerlinNoise isOn={isOn} color1="#281713" color2="blue" /> */}
      <View style={styles.header}>
        <Badge variant="primary" name="100" />
        <View style={styles.buttonContainer}>
          <CustomButton style={styles.iconButton} onPress={onShare}>
            <ShareIcon color={theme.colors.white} />
          </CustomButton>
          <CustomButton
            style={styles.iconButton}
            onPress={() => navigation.push("Settings")}>
            <Settings color={theme.colors.white} />
          </CustomButton>
        </View>
      </View>
      <View style={styles.UserStatus}>
        <UserStatus isOn={isOn} friends={offlineFriends} user={userInfo} />
      </View>
      <AnimatedSwitch isOn={isOn} onPress={handlePress} style={styles.switch} />
      <Signaling ref={signalingRef} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  iconButton: {
    borderRadius: 100,
    padding: 12,
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
