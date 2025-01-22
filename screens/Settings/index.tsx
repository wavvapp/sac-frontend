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
import { SettingOption } from "@/types"
import { CopiableText } from "@/components/cards/CopiableText"
import { onShare } from "@/utils/share"
import AlertDialog from "@/components/AlertDialog"
import BottomModal from "@/components/BottomModal"
import EditActivity from "@/screens/EditActivity"
import useUpdateUser from "@/hooks/useUpdateUser"

export default function SettingScreen() {
  const { signOut, user } = useAuth()
  const { editUserInfo, toggleEditInfoModal, updateUserInfo, namesInputRef } =
    useUpdateUser()

  const handleSignOut = async () => {
    await signOut()
  }

  const settingOptions: SettingOption[] = [
    {
      title: "Personal information",
      description: "Update your data",
      icon: <UserIcon />,
      onPress: toggleEditInfoModal,
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
      onPress: () => {},
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
              titleStyle={option.titleStyle || {}}
              onPress={option.onPress}
            />
          ))}
        </View>
      </View>
      <BottomModal visible={editUserInfo} onClose={toggleEditInfoModal}>
        <EditActivity
          closeModal={toggleEditInfoModal}
          title="Name"
          placeholderText="Enter your name to continue"
          buttonText="SAVE"
          initialInputValue={user?.names || ""}
          onPress={updateUserInfo}
          inputRef={namesInputRef}
          multiLineInput={false}
        />
      </BottomModal>
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
