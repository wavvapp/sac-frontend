import { View, StyleSheet } from "react-native"
import { theme } from "@/theme"
import { useAuth } from "@/contexts/AuthContext"
import LogoutIcon from "@/components/vectors/LogoutIcon"
import Header from "@/components/cards/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import ActionCard from "@/components/cards/Action"
import UserIcon from "@/components/vectors/UserIcon"
import BellIcon from "@/components/vectors/BellIcon"
import TrashIcon from "@/components/vectors/TrashIcon"
import UserProfile from "@/components/cards/UserProfile"
import { SettingOption } from "@/types"
import { CopiableText } from "@/components/cards/CopiableText"
import { onShare } from "@/utils/share"
import AlertDialog from "@/components/AlertDialog"
import ShareIcon from "@/components/vectors/ShareIcon"
import { useDeleteUser } from "@/queries/user"

export default function SettingScreen() {
  const { signOut, user } = useAuth()
  const deleteUserMutation = useDeleteUser()

  const handleSignOut = async () => {
    await signOut()
  }
  const handleDeleteAccount = async () => {
    await deleteUserMutation.mutateAsync()
    await signOut()
  }

  const settingOptions: SettingOption[] = [
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
      onPress: () =>
        AlertDialog.open({
          title: "Share this invite code with your friend",
          description: <CopiableText text={user?.verificationCode || ""} />,
          variant: "confirm",
          confirmText: "Share",
          cancelText: "cancel",
          onConfirm: () => onShare(user?.username, user?.verificationCode),
          closeAutomatically: false,
        }),
    },
    {
      title: "Push notifications",
      description: "Manage preferences",
      icon: <BellIcon />,
      onPress: () => {},
    },
    {
      title: "Log out",
      description: "",
      icon: <LogoutIcon />,
      onPress: handleSignOut,
    },
    {
      title: "Delete Account",
      description: "",
      icon: <TrashIcon />,
      titleStyle: { color: theme.colors.red },
      onPress: () =>
        AlertDialog.open({
          title: "Delete account?",
          description:
            "This action is permanent and cannot be undone. All your data, including profile and username, will be permanently deleted. Do you wish to proceed?",
          variant: "confirm",
          confirmText: "yes, delete",
          cancelText: "cancel",
          onConfirm: handleDeleteAccount,
          buttonStyles: "danger",
        }),
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
              titleStyle={option.titleStyle || {}}
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
