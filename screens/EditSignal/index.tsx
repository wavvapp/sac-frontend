import { StyleSheet } from "react-native"
import Status from "@/components/cards/Status"
import { CustomButton } from "@/components/ui/Button"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import api from "@/service"
import { Signal } from "@/types"
import { useMySignal } from "@/queries/signal"
import { onShare } from "@/utils/share"
import ShareIcon from "@/components/vectors/ShareIcon"
import Header from "@/components/cards/Header"
import ActionCard from "@/components/cards/Action"
import { useOfflineHandler } from "@/hooks/useOfflineHandler"
import { SafeAreaView } from "react-native-safe-area-context"

type EditSignalScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>

export default function EditSignal() {
  const navigation = useNavigation<EditSignalScreenProps>()
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const { data: signal } = useMySignal()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { handleOfflineAction } = useOfflineHandler()
  const queryclient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return api.put("/my-signal", {
        friends: temporaryStatus.friendIds,
        status_message: temporaryStatus.activity,
        when: temporaryStatus.timeSlot,
      })
    },
    onMutate: () => {
      queryclient.cancelQueries({ queryKey: ["fetch-my-signal"] })
      const optimisticStatus: Signal = {
        when: temporaryStatus.timeSlot,
        status_message: temporaryStatus.activity,
        friends: [],
        friendIds: temporaryStatus.friendIds,
        status: "active",
      }
      queryclient.setQueryData(["fetch-my-signal"], optimisticStatus)
      setIsLoading(true)
      navigation.goBack()
    },
    onError: (error) => {
      // TODO: add toaster
      console.error(error.message)
    },
    onSettled: async () => {
      queryclient.invalidateQueries({ queryKey: ["fetch-my-signal"] })
      setIsLoading(false)
    },
  })

  const handleSaveStatus = async () => {
    handleOfflineAction(() => mutation.mutate())
  }
  useEffect(() => {
    if (!signal) return
    setTemporaryStatus({
      timeSlot: signal.when,
      activity: signal.status_message,
      friendIds: signal.friendIds,
    })
  }, [navigation, signal, setTemporaryStatus])
  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="dark" />
      <Header title="Edit status" />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
          paddingTop: 62,
          paddingBottom: 122,
        }}>
        <Activity isLoading={isLoading} />
        <Status
          timeSlots={["NOW", "MORNING", "LUNCH", "AFTERNOON", "EVENING"]}
        />
        <FriendsList />
        <ActionCard
          title="Your friends are not on Wavv?"
          description="Invite them to join you"
          onPress={() => onShare(user?.username, user?.inviteCode)}
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
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    position: "relative",
    paddingTop: 20,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    zIndex: 10,
    width: "90%",
    marginHorizontal: 20,
  },
})
