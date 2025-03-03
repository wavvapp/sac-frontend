import { StyleSheet, View } from "react-native"
import Status from "@/components/cards/Status"
import { CustomButton } from "@/components/ui/Button"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"
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
import Header from "@/components/cards/Header"
import ActionCard from "@/components/cards/Action"
import { useOfflineHandler } from "@/hooks/useOfflineHandler"
import { SafeAreaView } from "react-native-safe-area-context"

type EditSignalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditSignal"
>

export default function EditSignal({
  route,
  navigation,
}: EditSignalScreenProps) {
  const { temporaryStatus, setTemporaryStatus, isOn } = useStatus()
  const { data: signal } = useMySignal()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { handleOfflineAction } = useOfflineHandler()
  const queryclient = useQueryClient()

  const isNewSignal = route.params?.isNewSignal
  const saveStatus = useMutation({
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

  const turnOffSignal = useMutation({
    mutationKey: ["toggle-signal-change"],
    mutationFn: () => api.post("/my-signal/turn-off"),
    networkMode: "online",
    onMutate: async () => {
      await handleOfflineAction(() => (isOn.value = !isOn.value))
      navigation.goBack()
    },
    onError: () => {
      isOn.value = !isOn.value
    },
    onSettled() {
      queryclient.refetchQueries({ queryKey: ["points"] })
      queryclient.refetchQueries({ queryKey: ["fetch-my-signal"] })
    },
  })

  const handleSaveStatus = async () => {
    handleOfflineAction(() => saveStatus.mutate())
  }

  const handleTurnOffSignal = async () => {
    handleOfflineAction(() => turnOffSignal.mutate())
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
      <Header title={isNewSignal ? "Set your Wavv" : "Edit your Wavv"} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
          paddingTop: 62,
          paddingBottom: 170,
        }}>
        <Activity isLoading={isLoading} />
        <Status
          timeSlots={["NOW", "MORNING", "LUNCH", "AFTERNOON", "EVENING"]}
        />
        <FriendsList />
        <ActionCard
          title="Your friends are not here?"
          description="Find/Invite friends on Wavv"
          onPress={() => onShare(user?.username, user?.inviteCode)}
          style={{ marginHorizontal: 20 }}
        />
      </ScrollView>
      <View style={style.buttonsContainer}>
        <CustomButton
          activeOpacity={0.8}
          containerStyles={style.button}
          variant="secondary"
          fullWidth
          title={isNewSignal ? "Wavv your friends" : "save"}
          textSize="sm"
          onPress={handleSaveStatus}
        />
        {!isNewSignal && (
          <CustomButton
            containerStyles={style.button}
            variant="ghost"
            fullWidth
            title="turn off your wavv"
            textSize="sm"
            onPress={handleTurnOffSignal}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    position: "relative",
  },
  buttonsContainer: {
    backgroundColor: theme.colors.white,
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
    zIndex: 10,
    width: "90%",
    marginHorizontal: 20,
    gap: 8,
  },
  button: {
    width: "100%",
  },
})
