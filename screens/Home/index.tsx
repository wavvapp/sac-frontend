import UserStatus from "@/components/cards/UserStatus"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View, StatusBar, Platform } from "react-native"
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPoints } from "@/libs/fetchPoints"
import * as WebBrowser from "expo-web-browser"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useStatus } from "@/contexts/StatusContext"
import api from "@/service"
import { useFriends } from "@/queries/friends"
import { useMySignal } from "@/queries/signal"
import { useOfflineHandler } from "@/hooks/useOfflineHandler"
import { height, width } from "@/utils/dimensions"
import { CopiableText } from "@/components/cards/CopiableText"
import AlertDialog from "@/components/AlertDialog"
import NoiseVideo from "@/components/NoiseVideo"
import TapWavv from "@/components/cards/TapWavv"
import CustomText from "@/components/ui/CustomText"

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

export default function HomeScreen() {
  const [_, setIsVisible] = useState(false)
  const { isOn } = useStatus()
  const signalingRef = useRef<SignalingRef>(null)
  const navigation = useNavigation<HomeScreenProps>()
  const { data: allFriends } = useFriends()
  const { user, isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const { handleOfflineAction } = useOfflineHandler()

  const { data, refetch: refetchPoints } = useQuery({
    queryKey: ["points"],
    queryFn: fetchPoints,
  })
  const handlePress = useMutation({
    mutationKey: ["toggle-signal-change"],
    mutationFn: isOn.value
      ? () => api.post("/my-signal/turn-off")
      : () => api.post("/my-signal/turn-on"),
    networkMode: "online",
    onMutate: () => {
      handleOfflineAction(() => (isOn.value = !isOn.value))
    },
    onError: () => {
      isOn.value = !isOn.value
    },
    onSettled() {
      queryClient.refetchQueries({ queryKey: ["points"] })
      queryClient.refetchQueries({ queryKey: ["fetch-my-signal"] })
    },
  })
  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) return
      refetchPoints()
    }, [isAuthenticated, refetchPoints]),
  )
  const { isPlaceholderData } = useMySignal()
  const handleWebsiteOpen = async () => {
    if (process.env.POINTS_CANISTER_URL) {
      await WebBrowser.openBrowserAsync(process.env.POINTS_CANISTER_URL)
    }
  }

  useDerivedValue(() => {
    if (isOn.value) {
      return runOnJS(setIsVisible)(true)
    }
    return runOnJS(setIsVisible)(false)
  }, [isOn.value])

  return (
    <View style={styles.container}>
      <NoiseVideo />
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => handleOfflineAction(handleWebsiteOpen)}>
            <Badge variant="primary" name={data?.points?.toFixed(1) || 0} />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.iconButton}
              onPress={() =>
                AlertDialog.open({
                  title: "Share this invite code with your friend",
                  description: <CopiableText text={user?.inviteCode || ""} />,
                  variant: "confirm",
                  confirmText: "Share",
                  cancelText: "cancel",
                  onConfirm: () => onShare(user?.username, user?.inviteCode),
                  closeAutomatically: false,
                })
              }>
              <ShareIcon color={theme.colors.white} />
            </CustomButton>
            <CustomButton
              style={styles.iconButton}
              onPress={() => navigation.push("Settings")}>
              <Settings color={theme.colors.white} />
            </CustomButton>
          </View>
        </View>
        {/* TODO: Remove this once the implementation is done */}
        {/* <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => handlePress.mutate()}>
          <CustomText style={{ color: theme.colors.white }}>
            Tap anywhere to Wavv
          </CustomText>
        </TouchableOpacity> */}
        {!allFriends?.length ? (
          <View style={styles.noFriendsContainer}>
            <NoFriends />
          </View>
        ) : (
          <View style={styles.StatusContainer}>
            {isOn.value ? <UserStatus isOn={isOn} user={user} /> : <TapWavv />}
          </View>
        )}
      </View>
      {!!allFriends?.length && <Signaling ref={signalingRef} />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: theme.colors.black,
  },
  content: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    paddingTop:
      Platform.OS === "ios"
        ? height >= 812
          ? 47
          : 27
        : StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 25,
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    borderRadius: 100,
  },
  StatusContainer: {
    marginBottom: 52,
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  noFriendsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
