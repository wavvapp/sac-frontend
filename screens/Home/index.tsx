import UserStatus from "@/components/cards/UserStatus"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View, StatusBar, Platform } from "react-native"
import { runOnJS, useDerivedValue } from "react-native-reanimated"
import { useCallback, useRef, useState } from "react"
import Signaling from "@/components/lists/signaling"
import Settings from "@/components/vectors/Settings"
import { theme } from "@/theme"
import Badge from "@/components/ui/Badge"
import ShareIcon from "@/components/vectors/ShareIcon"
import SearchIcon from "@/components/vectors/SearchIcon"
import { CustomButton } from "@/components/ui/Button"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { onShare } from "@/utils/share"
import NoFriends from "@/components/cards/NoFriends"
import { useAuth } from "@/contexts/AuthContext"
import * as WebBrowser from "expo-web-browser"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useStatus } from "@/contexts/StatusContext"
import { useFriends } from "@/queries/friends"
import { useOfflineHandler } from "@/hooks/useOfflineHandler"
import { height } from "@/utils/dimensions"
import { CopiableText } from "@/components/cards/CopiableText"
import AlertDialog from "@/components/AlertDialog"
import NoiseVideo from "@/components/NoiseVideo"
import TapWavv from "@/components/cards/TapWavv"
import { useFetchPoints } from "@/queries/points"
import { useQueryClient } from "@tanstack/react-query"
import { BottomDrawerRef } from "@/components/BottomDrawer"

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

export default function HomeScreen() {
  const [_, setIsVisible] = useState(false)
  const { isOn } = useStatus()
  const signalingRef = useRef<BottomDrawerRef>(null)
  const navigation = useNavigation<HomeScreenProps>()
  const { data: allFriends } = useFriends()
  const { user, isAuthenticated } = useAuth()
  const { handleOfflineAction } = useOfflineHandler()

  const { data, refetch: refetchPoints } = useFetchPoints()

  const queryClient = useQueryClient()
  const refetchFriendsData = useCallback(async () => {
    await queryClient.refetchQueries({ queryKey: ["friend-signals"] })
    await queryClient.refetchQueries({ queryKey: ["friends"] })
  }, [queryClient])

  const openSearch = () => {
    refetchFriendsData()
    navigation.navigate("Search")
  }

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) return
      refetchPoints()
    }, [isAuthenticated, refetchPoints]),
  )

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

  console.log({ isOn: isOn.value })
  return (
    <View style={styles.container}>
      <NoiseVideo />
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => handleOfflineAction(handleWebsiteOpen)}>
            <Badge
              variant="primary"
              name={(data as any)?.points?.toFixed(1) || 0}
            />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.SearchIcon} onPress={openSearch}>
              <SearchIcon color={theme.colors.white} strokeWidth={1.5} />
            </TouchableOpacity>
            <CustomButton
              style={styles.settingsButton}
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
              <TouchableOpacity style={styles.shareButton}>
                <ShareIcon color={theme.colors.white} strokeWidth={1.5} />
              </TouchableOpacity>
            </CustomButton>
            <CustomButton
              style={styles.settingsButton}
              onPress={() => navigation.push("Settings")}>
              <Settings color={theme.colors.white} strokeWidth={1.5} />
            </CustomButton>
          </View>
        </View>
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
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 4,
  },
  settingsButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  StatusContainer: {
    marginBottom: height * 0.2,
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
  shareButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  SearchIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
})
