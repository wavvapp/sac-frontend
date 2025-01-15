import { View, StyleSheet } from "react-native"
import { theme } from "@/theme"
import { useAuth } from "@/contexts/AuthContext"
import LogoutIcon from "@/components/vectors/LogoutIcon"
import Header from "@/components/cards/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import ActionCard from "@/components/cards/Action"
import UserIcon from "@/components/vectors/UserIcon"
import ShareIcon from "@/components/vectors/ShareIcon"
import BellIcon from "@/components/vectors/BellIcon"
import TrashIcon from "@/components/vectors/TrashIcon"
import UserProfile from "@/components/cards/UserProfile"

export default function SettingScreen() {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header title="Settings" />
      <View style={styles.contentContainer}>
        <ActionCard
          title="Personal informations"
          description="Update your data"
          icon={<UserIcon />}
          onPress={() => {}}
        />
        <ActionCard
          title="Your friends are not on Wavv?"
          description="Invite them to join you"
          icon={<ShareIcon />}
          onPress={() => {}}
        />
        <ActionCard
          title="Push notifications"
          description="Manage preferences"
          icon={<BellIcon />}
          onPress={() => {}}
        />
        <UserProfile />
        <ActionCard
          title="Log out"
          icon={<LogoutIcon />}
          onPress={handleSignOut}
        />
        <ActionCard
          titleStyle={{ color: theme.colors.red_500 }}
          title="Delete Account"
          description=""
          icon={<TrashIcon />}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    justifyContent: "space-between",
    paddingBottom: 32,
  },
  contentContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
})
