import { StyleSheet, TouchableOpacity, View } from "react-native"
import Status from "@/components/cards/Status"
import { CustomButton } from "@/components/ui/Button"
import UserAvatar from "@/components/ui/UserAvatar"
import CrossMark from "@/components/vectors/CrossMark"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import FriendsList from "@/components/lists/Friends"
import Activity from "@/components/Activity"
import { ScrollView } from "react-native-gesture-handler"
import ShareCard from "@/components/Share"
import CustomText from "@/components/ui/CustomText"
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
      queryclient.refetchQueries({ queryKey: ["fetch-my-signal"] })
      setIsLoading(false)
    },
  })

  const handleSaveStatus = async () => {
    mutation.mutate()
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
    <View style={style.container}>
      <StatusBar style="dark" />
      <View style={style.navBar}>
        <CustomText style={style.headerText} fontWeight="bold">
          Edit status
        </CustomText>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.CrossMarkButton}>
          <CrossMark />
        </TouchableOpacity>
      </View>
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
        <ShareCard style={{ marginHorizontal: 20 }} />
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
  navBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    top: 44,
    backgroundColor: theme.colors.white,
    zIndex: 10,
  },
  headerText: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: 20,
    lineHeight: 28,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    zIndex: 10,
    width: "90%",
    marginHorizontal: 20,
  },
  CrossMarkButton: {
    padding: 5,
    position: "absolute",
    right: 20,
  },
})
