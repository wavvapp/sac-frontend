import UserStatus from "@/components/cards/UserStatus"
// import PerlinNoise from "@/components/PerlinNoise"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View, Dimensions } from "react-native"
import { runOnJS, useDerivedValue } from "react-native-reanimated"
import { AnimatedSwitch } from "@/components/AnimatedSwitch"
import { useEffect, useRef, useState } from "react"
import Signaling, { SignalingRef } from "@/components/lists/Signaling"
import Settings from "@/components/vectors/Settings"
import { theme } from "@/theme"
import Badge from "@/components/ui/Badge"
import ShareIcon from "@/components/vectors/ShareIcon"
import { CustomButton } from "@/components/ui/Button"
import { useNavigation } from "@react-navigation/native"
import { onShare } from "@/utils/share"
import NoFriends from "@/components/cards/NoFriends"
import { useAuth } from "@/contexts/AuthContext"
import { useSignal } from "@/hooks/useSignal"
import { useFriends } from "@/hooks/useFriends"
import { useQuery } from "@tanstack/react-query"
import { BadgeSkeleton } from "@/components/cards/BadgeSkeleton"
import { useStatus } from "@/contexts/StatusContext"
import { fetchPoints } from "@/libs/fetchPoints"
import { SafeAreaView } from "react-native-safe-area-context"

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

const { width } = Dimensions.get("window")
export default function HomeScreen() {
  const [_, setIsVisible] = useState(false)
  const { isOn, turnOffSignalStatus, turnOnSignalStatus } = useSignal()
  const signalingRef = useRef<SignalingRef>(null)
  const navigation = useNavigation<HomeScreenProps>()
  const { hasFriends, availableFriends } = useFriends()
  const { user } = useAuth()
  const { statusMessage, friends, timeSlot } = useStatus()

  const handlePress = async () => {
    if (isOn.value) {
      await turnOffSignalStatus()
      return
    }
    await turnOnSignalStatus()
  }

  useDerivedValue(() => {
    if (isOn.value) {
      return runOnJS(setIsVisible)(true)
    }
    return runOnJS(setIsVisible)(false)
  }, [isOn.value])

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["points"],
    queryFn: fetchPoints,
  })

  useEffect(() => {
    refetch()
  }, [timeSlot, statusMessage, friends, refetch])

  return (
    <SafeAreaView style={styles.container}>
      {/* <PerlinNoise isOn={isOn} color1="#281713" color2="blue" /> */}
      <View style={styles.header}>
        {isLoading || isRefetching ? (
          <BadgeSkeleton />
        ) : (
          <Badge variant="primary" name={data?.points} />
        )}
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
      {!hasFriends ? (
        <NoFriends />
      ) : (
        <>
          <View style={styles.UserStatus}>
            <UserStatus isOn={isOn} friends={availableFriends} user={user} />
          </View>
          <AnimatedSwitch
            isOn={isOn}
            onPress={handlePress}
            style={styles.switch}
          />
          <Signaling ref={signalingRef} />
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    paddingTop: 7,
    paddingHorizontal: 21,
    backgroundColor: theme.colors.black_50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
