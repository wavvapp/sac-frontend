import UserStatus from "@/components/cards/UserStatus"
// import PerlinNoise from "@/components/PerlinNoise"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View, Dimensions } from "react-native"
import { runOnJS, useDerivedValue } from "react-native-reanimated"
import { AnimatedSwitch } from "@/components/AnimatedSwitch"
import { useCallback, useRef, useState } from "react"
import Signaling, { SignalingRef } from "@/components/lists/Signaling"
import Settings from "@/components/vectors/Settings"
import { theme } from "@/theme"
import Badge from "@/components/ui/Badge"
import ShareIcon from "@/components/vectors/ShareIcon"
import { CustomButton } from "@/components/ui/Button"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { onShare } from "@/utils/share"
import NoFriends from "@/components/cards/NoFriends"
import { useAuth } from "@/contexts/AuthContext"
import { useSignal } from "@/hooks/useSignal"
import { useFriends } from "@/hooks/useFriends"
import { useQuery, useMutation } from "@tanstack/react-query"
import { BadgeSkeleton } from "@/components/cards/BadgeSkeleton"
import { fetchPoints } from "@/libs/fetchPoints"
import { SafeAreaView } from "react-native-safe-area-context"

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

const { width } = Dimensions.get("window")
export default function HomeScreen() {
  const [_, setIsVisible] = useState(false)
  const {
    isOn,
    turnOffSignalStatus,
    turnOnSignalStatus,
    fetchMySignal,
    signalFriends,
  } = useSignal()
  const signalingRef = useRef<SignalingRef>(null)
  const navigation = useNavigation<HomeScreenProps>()
  const {
    hasFriends,
    availableFriends,
    offlineFriends,
    fetchAllFriends,
    fetchAvailableFriends,
  } = useFriends()
  const { user, isAuthenticated } = useAuth()
  const {
    data,
    isLoading,
    refetch: refetchPoints,
    isRefetching,
  } = useQuery({
    queryKey: ["points"],
    queryFn: fetchPoints,
  })

  const fetchInitialData = useCallback(async () => {
    if (!isAuthenticated) return
    await fetchAllFriends()
    await fetchAvailableFriends()
    await fetchMySignal()
    await refetchPoints()
  }, [
    fetchAllFriends,
    fetchAvailableFriends,
    fetchMySignal,
    isAuthenticated,
    refetchPoints,
  ])
  const handlePress = useMutation({
    mutationFn: isOn.value ? turnOffSignalStatus : turnOnSignalStatus,
    onMutate: () => {
      isOn.value = !isOn.value
    },
    onError: () => {
      isOn.value = !isOn.value
    },
  })

  useFocusEffect(
    useCallback(() => {
      fetchInitialData()
    }, [fetchInitialData]),
  )

  useDerivedValue(() => {
    if (isOn.value) {
      return runOnJS(setIsVisible)(true)
    }
    return runOnJS(setIsVisible)(false)
  }, [isOn.value])

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
            <UserStatus isOn={isOn} friends={signalFriends} user={user} />
          </View>
          <AnimatedSwitch
            isOn={isOn}
            onPress={() => handlePress.mutate()}
            style={styles.switch}
          />
          <Signaling
            availableFriends={availableFriends}
            offlineFriends={offlineFriends}
            ref={signalingRef}
          />
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
