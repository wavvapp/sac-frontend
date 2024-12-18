import { StyleSheet, View } from "react-native"
import Status from "@/components/cards/Status"
import { CustomButton } from "@/components/ui/Button"
import UserAvatar from "@/components/ui/UserAvatar"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import FriendsList from "@/components/lists/Friends"
import Activity from "@/components/Activity"
import { ScrollView } from "react-native-gesture-handler"
import { theme } from "@/theme"
import { useAuth } from "@/contexts/AuthContext"
import { useStatus } from "@/contexts/StatusContext"
import { RootStackParamList } from "@/navigation"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSignal } from "@/hooks/useSignal"
import { StatusBar } from "expo-status-bar"
import ConfirmAction from "@/components/ConfirmAction"
import { onShare } from "@/utils/share"
import ShareIcon from "@/components/vectors/ShareIcon"
import Header from "@/components/cards/Header"

type EditSignalScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>

export default function EditSignal() {
  const navigation = useNavigation<EditSignalScreenProps>()
  const { updateActivity, saveStatus, clearStatus } = useStatus()
  const { fetchMySignal } = useSignal()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation({
    mutationFn: updateActivity,
    onMutate: () => {
      setIsLoading(true)
      navigation.goBack()
    },
    onError: (error) => {
      // TODO: add toaster
      console.error(error.message)
    },
    onSettled: async () => {
      await fetchMySignal()
      setIsLoading(false)
    },
  })

  const handleSaveStatus = async () => {
    mutation.mutate()
    saveStatus()
  }
  useEffect(() => {
    const removeListener = navigation.addListener("beforeRemove", () =>
      clearStatus(),
    )
    return () => removeListener()
  }, [navigation, clearStatus])

  return (
    <View style={style.container}>
      <StatusBar style="dark" />
      <Header title=" Edit status" />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
          paddingTop: 62,
          paddingBottom: 122,
        }}>
        <UserAvatar
          imageUrl={user?.profilePictureUrl}
          size="large"
          style={{ alignSelf: "center" }}
        />
        <Activity isLoading={isLoading} />
        <Status
          timeSlots={["NOW", "MORNING", "LUNCH", "AFTERNOON", "EVENING"]}
        />
        <FriendsList />
        <ConfirmAction
          title=" Your friends are not on Wavv?"
          description="Invite them to join you"
          onPress={() => onShare(user?.username)}
          icon={<ShareIcon />}
          style={{ marginHorizontal: 20 }}
        />
      </ScrollView>
      <CustomButton
        activeOpacity={0.8}
        containerStyles={{ ...style.saveButton, opacity: isLoading ? 0.8 : 1 }}
        variant="secondary"
        fullWidth
        title={isLoading ? "Saving..." : "Save"}
        textSize="sm"
        onPress={handleSaveStatus}
        disabled={isLoading}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: theme.colors.white,
    position: "relative",
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    zIndex: 10,
    width: "90%",
    marginHorizontal: 20,
  },
})
