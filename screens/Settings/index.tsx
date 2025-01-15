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
  const settingOptions = [
    {
      title: "Personal information",
      description: "Update your data",
      icon: <UserIcon />,
      onPress: () => {},
    },
    {
      title: "Your friends are not on Wavv?",
      description: "Invite them to join you",
      icon: <ShareIcon />,
      onPress: () => {},
    },
    {
      title: "Push notifications",
      description: "Manage preferences",
      icon: <BellIcon />,
      onPress: () => {},
    },
    {
      title: "Push notifications",
      description: "",
      icon: <LogoutIcon />,
      onPress: () => {},
    },
    {
      title: "Delete Account",
      description: "",
      icon: <TrashIcon />,
      onPress: handleSignOut,
      titleStyle: { color: theme.colors.red },
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header title="Settings" />
      <View style={styles.contentContainer}>
        <UserProfile />
        <View style={styles.optionsContainer}>
          {settingOptions?.map((option, index) => (
            <ActionCard
              key={index}
              title={option.title}
              description={option.description}
              icon={option.icon}
              titleStyle={option.titleStyle || undefined}
              onPress={option.onPress}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    paddingBottom: 32,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 10,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
})
