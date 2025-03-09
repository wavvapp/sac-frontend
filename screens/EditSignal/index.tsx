import { StyleSheet, View } from "react-native"
import Status from "@/components/cards/Status"
import { CustomButton } from "@/components/ui/Button"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"
import FriendsList from "@/components/lists/Friends"
import Activity from "@/components/Activity"
import { ScrollView } from "react-native-gesture-handler"
import { theme } from "@/theme"
import { useStatus } from "@/contexts/StatusContext"
import { RootStackParamList } from "@/navigation"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import { Signal } from "@/types"
import {
  useMySignal,
  useSaveStatus,
  useTurnOffSignal,
  useTurnOnSignal,
} from "@/queries/signal"
import Header from "@/components/cards/Header"
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
  const [isLoading, setIsLoading] = useState(false)
  const { handleOfflineAction } = useOfflineHandler()
  const queryclient = useQueryClient()

  const isNewSignal = route.params?.isNewSignal

  const turnOnSignal = useTurnOnSignal({
    onMutate: async () => {
      await queryclient.cancelQueries({ queryKey: ["fetch-my-signal"] })
      const optimisticStatus: Signal = {
        when: temporaryStatus.timeSlot,
        status_message: temporaryStatus.activity,
        friends: [],
        friendIds: temporaryStatus.friendIds,
        status: "active",
      }
      queryclient.setQueryData(["fetch-my-signal"], optimisticStatus)
      handleOfflineAction(() => (isOn.value = !isOn.value))
      navigation.navigate("Home")
    },
    onError: (error) => {
      // TODO: add toaster
      console.error(error.message)
    },
    onSuccess: () => saveStatus.mutate(),
  })

  const saveStatus = useSaveStatus({
    data: temporaryStatus,
    onMutate: async () => {
      await queryclient.cancelQueries({ queryKey: ["fetch-my-signal"] })
      const optimisticStatus: Signal = {
        when: temporaryStatus.timeSlot,
        status_message: temporaryStatus.activity,
        friends: [],
        friendIds: temporaryStatus.friendIds,
        status: "active",
      }
      queryclient.setQueryData(["fetch-my-signal"], optimisticStatus)
      setIsLoading(true)
      navigation.navigate("Home")
    },
    onError: (error) => {
      // TODO: add toaster
      console.error(error.message)
    },
    onSettled: async () => {
      await queryclient.refetchQueries({ queryKey: ["fetch-my-signal"] })
      setIsLoading(false)
    },
  })

  const turnOffSignal = useTurnOffSignal({
    onMutate: async () => {
      handleOfflineAction(() => (isOn.value = !isOn.value))
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

  const handleSaveStatus = () =>
    isNewSignal ? turnOnSignal.mutate() : saveStatus.mutate()

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
          gap: 24,
          paddingTop: 24,
          paddingBottom: 170,
        }}>
        <Activity isLoading={isLoading} />
        <Status
          timeSlots={[
            "SET TIME",
            "NOW",
            "MORNING",
            "LUNCH",
            "AFTERNOON",
            "EVENING",
          ]}
        />
        <FriendsList />
      </ScrollView>
      <View style={style.buttonsContainer}>
        <CustomButton
          activeOpacity={0.8}
          containerStyles={style.button}
          variant="secondary"
          fullWidth
          title={isNewSignal ? "Wavv" : "save"}
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
