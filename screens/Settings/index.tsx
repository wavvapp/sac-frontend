import { View, StyleSheet, TextInput } from "react-native"
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
import BottomModal from "@/components/BottomModal"
import EditActivity from "@/screens/EditActivity"
import { useRef, useState } from "react"
import { useUpdateUserInfo } from "@/queries/user"

export default function SettingScreen() {
  const { signOut, user } = useAuth()
  const [editUserInfo, setEditUserInfo] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const updateUser = useUpdateUserInfo()

  const handleSignOut = async () => {
    await signOut()
  }
  const updateUserInfo = (newNames: string) => {
    updateUser.mutate({ names: newNames })
    setEditUserInfo(false)
  }
  const toggleEditInfoModal = () => {
    setEditUserInfo(!editUserInfo)
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
          inputRef={inputRef}
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
