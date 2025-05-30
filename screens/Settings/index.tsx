import { View, StyleSheet, Text } from "react-native"
import { theme } from "@/theme"
import { useAuth } from "@/contexts/AuthContext"
import LogoutIcon from "@/components/vectors/LogoutIcon"
import Header from "@/components/cards/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import ActionCard from "@/components/cards/Action"
import ShareIcon from "@/components/vectors/ShareIcon"
import UserIcon from "@/components/vectors/UserIcon"
import BellIcon from "@/components/vectors/BellIcon"
import TrashIcon from "@/components/vectors/TrashIcon"
import UserProfile from "@/components/cards/UserProfile"
import { SettingOption } from "@/types"
import AlertDialog from "@/components/AlertDialog"
import BottomModal from "@/components/BottomModal"
import EditActivity from "@/screens/EditActivity"
import useUpdateUser from "@/hooks/useUpdateUser"
import { useDeleteUser } from "@/queries/user"
import { useRef, useState } from "react"
import NotificationPreferences from "@/screens/NotificationPreferences"
import BottomDrawer, { BottomDrawerRef } from "@/components/BottomDrawer"
import { ScrollView } from "react-native-gesture-handler"
import UsersIcon from "@/components/vectors/UsersIcon"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/types"
import QRCodeModal from "@/components/QRCodeModal"
import Constants from "expo-constants"

export type SettingsScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Settings"
>

export default function SettingScreen() {
  const [_, setIsBottomSheetOpen] = useState(false)
  const { signOut, user } = useAuth()
  const { editUserInfo, toggleEditInfoModal, updateUserInfo, namesInputRef } =
    useUpdateUser()
  const deleteUserMutation = useDeleteUser()
  const bottomDrawerRef = useRef<BottomDrawerRef>(null)
  const [QRCodeModalVisible, setQRCodeModalVisible] = useState(false)
  const navigation = useNavigation<SettingsScreenProps>()

  const handleOpenNotificationPreferences = () => {
    bottomDrawerRef.current?.openBottomSheet()
  }

  const handleSignOut = async () => {
    await signOut()
  }
  const handleDeleteAccount = async () => {
    await deleteUserMutation.mutateAsync()
  }

  const settingOptions: SettingOption[] = [
    {
      title: "Personal information",
      description: "Update your data",
      icon: <UserIcon />,
      onPress: toggleEditInfoModal,
    },
    {
      title: "Manage groups",
      description: "Organize your friends",
      icon: <UsersIcon width={24} height={24} />,
      onPress: () => navigation.navigate("Groups"),
    },
    {
      title: "Your friends are not here?",
      description: "Invite friends on Wavv",
      icon: <ShareIcon />,
      onPress: () => setQRCodeModalVisible(true),
    },
    {
      title: "Push notifications",
      description: "Manage preferences",
      icon: <BellIcon />,
      onPress: handleOpenNotificationPreferences,
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
            "This action is permanent and can not be undone. All your data, including profile and username, will be permanently deleted. Do you wish to proceed?",
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
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
      </ScrollView>
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
      <BottomDrawer
        ref={bottomDrawerRef}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        fullyHiddenOnClose={true}>
        <NotificationPreferences />
      </BottomDrawer>
      {!!user && QRCodeModalVisible && (
        <QRCodeModal
          isVisible={QRCodeModalVisible}
          onClose={() => setQRCodeModalVisible(false)}
          user={user}
          sheetContainerStyle={styles.sheetContainerStyle}
        />
      )}
      <View
        style={{
          borderTopColor: theme.colors.black_100,
          borderTopWidth: 1,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ textAlign: "center", color: theme.colors.black_500 }}>
          {process.env.APP_ENVIRONMENT === "staging" ? "Stage" : "Beta"} v
          {Constants.expoConfig?.version}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  sheetContainerStyle: {
    marginBottom: -10,
  },
})
