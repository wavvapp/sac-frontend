import UserStatus from "@/components/cards/UserStatus"
import PerlinNoise from "@/components/PerlinNoise"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View, Dimensions, StatusBar, Platform } from "react-native"
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
import { fetchPoints } from "@/libs/fetchPoints"
import * as WebBrowser from "expo-web-browser"
import { TouchableOpacity } from "react-native-gesture-handler"

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
  const { hasFriends } = useFriends()
  const { user, isAuthenticated } = useAuth()
  const {
    data,
    refetch: refetchPoints,
    isLoading,
  } = useQuery({
    queryKey: ["points"],
    queryFn: fetchPoints,
  })

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
      if (!isAuthenticated) return
      refetchPoints()
    }, [refetchPoints, isAuthenticated]),
  )

  const handleWebsiteOpen = async () => {
    await WebBrowser.openBrowserAsync(
      "https://7axab-zyaaa-aaaao-qjv7a-cai.icp0.io/",
    )
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handleWebsiteOpen}>
          <Badge variant="primary" name={data?.points?.toFixed(1)} />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.iconButton}
            onPress={() => onShare(user?.username || "me")}>
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
            <UserStatus isOn={isOn} user={user} />
          </View>
          <AnimatedSwitch
            isOn={isOn}
            isLoading={isLoading}
            onPress={() => handlePress.mutate()}
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
    paddingTop:
      Platform.OS === "ios"
        ? Dimensions.get("window").height >= 812
          ? 47
          : 27
        : StatusBar.currentHeight || 0,
    backgroundColor: theme.colors.black_50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    borderRadius: 100,
  },
  UserStatus: {
    marginHorizontal: 20,
    height: 220,
    marginBottom: 52,
  },
  switch: {
    width: width * 0.18,
    height: width * 0.35,
    padding: 10,
    marginHorizontal: "auto",
  },
})
