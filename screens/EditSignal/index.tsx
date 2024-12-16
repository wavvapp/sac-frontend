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
// import { useStatus } from "@/contexts/StatusContext"
import { RootStackParamList } from "@/navigation"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { useSignal } from "@/hooks/useSignal"
import { StatusBar } from "expo-status-bar"
import api from "@/service"

type EditSignalScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>

export default function EditSignal() {
  const navigation = useNavigation<EditSignalScreenProps>()
  // const { updateActivity } = useStatus()
  // const { fetchMySignal } = useSignal()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const queryclient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => api.post("/my-signal/turn-off"),
    onMutate: () => {
      queryclient.cancelQueries({ queryKey: ["fetch-my-signal"] })
      const dataForYou = {
        id: "42c2faf8-7138-47f5-b508-b4523630d330",
        status: "active",
        when: "NOW",
        status_message: "A simple message simple==============",
        createdAt: "2024-12-02T13:52:40.234Z",
        updatedAt: "2024-12-16T11:48:44.604Z",
        friendSignal: [],
        friends: [
          {
            friendId: "5ea9c90f-70ad-4a2c-9aaa-445ef64f97ec",
            username: "Moribund",
            names: "igor ntwali",
            profilePictureUrl:
              "https://lh3.googleusercontent.com/a/ACg8ocIl3uxkfSf84hcRUgQCSOM6hv8huS0xjOUpxsbcj9ilaQwnfP8=s96-c",
          },
          {
            friendId: "3ba1f9f9-22a0-4c25-a80f-53fee1c5a3ed",
            username: "Igorntwali",
            names: "Ntwali  Igor",
            profilePictureUrl: null,
          },
        ],
      }
      queryclient.setQueryData(["fetch-my-signal"], dataForYou)
      setIsLoading(true)
      navigation.goBack()
    },
    onError: (error) => {
      // TODO: add toaster
      console.error(error.message)
    },
    onSettled: async () => {
      setIsLoading(false)
    },
  })

  const handleSaveStatus = async () => {
    mutation.mutate()
    // saveStatus()
  }
  // useEffect(() => {
  //   const removeListener = navigation.addListener("beforeRemove", () =>
  //     clearStatus(),
  //   )
  //   return () => removeListener()
  // }, [navigation, clearStatus])

  return (
    <View style={style.container}>
      <StatusBar style="dark" />
      <View style={style.navBar}>
        <CustomText style={style.headerText} fontWeight="bold">
          Edit status
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
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
