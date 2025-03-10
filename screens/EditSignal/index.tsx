import { StyleSheet, TouchableOpacity, View } from "react-native"
import Status from "@/components/cards/Status"
import { CustomButton } from "@/components/ui/Button"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"
import FriendsList from "@/components/lists/Friends"
import { ScrollView } from "react-native-gesture-handler"
import { theme } from "@/theme"
import { useStatus } from "@/contexts/StatusContext"
import { RootStackParamList } from "@/navigation"
import { useEffect, useRef, useState } from "react"
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
import { CustomTitle } from "@/components/ui/CustomTitle"
import BottomDrawer, { BottomDrawerRef } from "@/components/BottomDrawer"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import { SetStatus } from "@/components/setStatus"

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
  const bottomDrawerRef = useRef<BottomDrawerRef>(null)
  const { handleOfflineAction } = useOfflineHandler()
  const queryclient = useQueryClient()
  const isNewSignal = route.params?.isNewSignal || false
  const [_, setIsModalVisible] = useState(isNewSignal)

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
      navigation.navigate("Home")
    },
    onError: (error) => {
      // TODO: add toaster
      console.error(error.message)
    },
    onSettled: async () => {
      await queryclient.refetchQueries({ queryKey: ["fetch-my-signal"] })
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

  const handleOpenSheet = () => {
    bottomDrawerRef.current?.openBottomSheet()
  }

  const handleCloseSheet = () => {
    bottomDrawerRef.current?.closeBottomSheet()
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
        <View style={style.activity}>
          <CustomTitle text="your wavv" />
          <TouchableOpacity
            onPress={handleOpenSheet}
            style={style.statusContainer}>
            <CustomText
              size="lg"
              fontWeight="semibold"
              style={style.statusText}>
              {temporaryStatus.activity}
            </CustomText>
            <View style={style.EditIcon}>
              <EditIcon />
            </View>
          </TouchableOpacity>
        </View>
        <Status
          timeSlots={["NOW", "MORNING", "LUNCH", "AFTERNOON", "EVENING"]}
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
      <BottomDrawer
        ref={bottomDrawerRef}
        setIsBottomSheetOpen={setIsModalVisible}
        isFullScreen
        fullyHiddenOnClose={true}
        containerStyle={style.activityModalStyles}
        index={isNewSignal ? 1 : 0}>
        <SetStatus closeBottomSheet={handleCloseSheet} />
      </BottomDrawer>
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
  activity: {
    paddingHorizontal: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    flex: 1,
    alignItems: "center",
  },
  EditIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  activityModalStyles: {
    zIndex: 11,
  },
})
