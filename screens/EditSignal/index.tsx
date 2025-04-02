import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import Status from "@/components/cards/Status"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"
import { ScrollView } from "react-native-gesture-handler"
import { theme } from "@/theme"
import { useStatus } from "@/contexts/StatusContext"
import { RootStackParamList } from "@/navigation"
import { useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import { Friend, Signal } from "@/types"
import { useSaveStatus, useTurnOffSignal } from "@/queries/signal"
import { useOfflineHandler } from "@/hooks/useOfflineHandler"
import { SafeAreaView } from "react-native-safe-area-context"
import { CustomTitle } from "@/components/ui/CustomTitle"
import BottomDrawer, { BottomDrawerRef } from "@/components/BottomDrawer"
import CustomText from "@/components/ui/CustomText"
import EditIcon from "@/components/vectors/EditIcon"
import { SetActivity } from "@/components/SetActivity"
import Audience from "@/components/Audience"
import ActionCard from "@/components/cards/Action"
import CrossMark from "@/components/vectors/CrossMark"
import { CustomButton } from "@/components/ui/Button"
import dayjs from "dayjs"

type EditSignalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditSignal"
>

export default function EditSignal({
  route,
  navigation,
}: EditSignalScreenProps) {
  const { temporaryStatus, isOn } = useStatus()
  const bottomDrawerRef = useRef<BottomDrawerRef>(null)
  const { handleOfflineAction } = useOfflineHandler()
  const queryclient = useQueryClient()
  const isNewSignal = route.params?.isNewSignal || false
  const [_, setIsModalVisible] = useState(false)

  const saveStatus = useSaveStatus({
    data: temporaryStatus,
    onMutate: async () => {
      if (temporaryStatus.timeSlot.includes("-")) {
        const [_, endTime] = temporaryStatus.timeSlot.split("-")
        const [endHours, endMinutes] = endTime.split(":").map(Number)
        const now = dayjs()
        const endTimeToday = dayjs().hour(endHours).minute(endMinutes)

        if (endTimeToday.isBefore(now)) {
          Alert.alert("Error", "Cannot save status with end time in the past")
          return
        }
      }

      await queryclient.cancelQueries({ queryKey: ["fetch-my-signal"] })
      const allFriends = queryclient.getQueryData<Friend[]>(["friends"])
      const selectedFriends = allFriends?.filter((friend) =>
        temporaryStatus.friendIds.includes(friend.id),
      )
      console.log({ temporaryStatus })
      const optimisticStatus: Signal = {
        when: temporaryStatus.timeSlot,
        status_message: temporaryStatus.activity,
        friends: selectedFriends || [],
        friendIds: temporaryStatus.friendIds,
        groups: temporaryStatus.groups,
        status: "active",
        startsAt: temporaryStatus?.startsAt,
        endsAt: temporaryStatus?.endsAt,
      }
      isOn.value = true
      queryclient.setQueryData(["fetch-my-signal"], optimisticStatus)
      navigation.navigate("Home")
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to save the wavv")
      console.log(error.message)
    },
    onSettled: async () => {
      await queryclient.refetchQueries({ queryKey: ["fetch-my-signal"] })
    },
    retry: 3,
  })

  const turnOffSignal = useTurnOffSignal({
    onMutate: async () => {
      handleOfflineAction(() => (isOn.value = !isOn.value))
      navigation.goBack()
    },
    onError: () => {
      isOn.value = !isOn.value
    },
    onSettled: async () => {
      await Promise.all([
        queryclient.refetchQueries({ queryKey: ["points"] }),
        queryclient.refetchQueries({ queryKey: ["fetch-my-signal"] }),
        queryclient.refetchQueries({ queryKey: ["friends"] }),
      ])
    },
  })

  const handleSaveStatus = () => handleOfflineAction(() => saveStatus.mutate())

  const handleTurnOffSignal = async () => {
    try {
      handleOfflineAction(() => turnOffSignal.mutate())
    } catch (error) {
      console.log("Error turning off signal", error)
    }
  }

  const handleOpenSheet = () => {
    bottomDrawerRef.current?.openBottomSheet()
  }

  const handleCloseSheet = () => {
    bottomDrawerRef.current?.closeBottomSheet()
  }

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="dark" />
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.closeIcon}>
          <CrossMark style={{ marginLeft: -5 }} />
        </TouchableOpacity>
        <CustomButton onPress={handleSaveStatus} title="Save" />
      </View>

      <View style={style.line} />
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
        <View style={style.separator} />
        <Status
          timeSlots={[
            temporaryStatus?.timeSlot.includes("-")
              ? temporaryStatus?.timeSlot
              : "SET TIME",
            "NOW",
            "MORNING",
            "LUNCH",
            "AFTERNOON",
            "EVENING",
          ]}
        />
        <Audience />
        <View style={{ ...style.separator, marginHorizontal: 20 }} />
        {!isNewSignal && (
          <View style={{ paddingHorizontal: 20 }}>
            <ActionCard
              title="Turn off your wavv"
              titleStyle={{ color: theme.colors.red }}
              onPress={handleTurnOffSignal}
            />
          </View>
        )}
      </ScrollView>
      <BottomDrawer
        ref={bottomDrawerRef}
        setIsBottomSheetOpen={setIsModalVisible}
        isFullScreen
        fullyHiddenOnClose={true}
        containerStyle={style.activityModalStyles}>
        <SetActivity closeBottomSheet={handleCloseSheet} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.black_100,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.black_100,
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
    alignItems: "flex-end",
  },
  activityModalStyles: { zIndex: 11 },
})
