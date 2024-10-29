import { StyleSheet, View } from "react-native"
import Status from "@/components/cards/Status"
import { CustomButton } from "@/components/ui/Button"
import UserAvatar from "@/components/ui/UserAvatar"
import CrossMark from "@/components/vectors/CrossMark"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import FriendsList from "@/components/lists/Friends"
import { useAuth } from "@/contexts/AuthContext"
import Activity from "@/components/Activity"
import { ScrollView } from "react-native-gesture-handler"
import ShareCard from "@/components/Share"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"

type EditSignalScrenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>

export default function EditSignal() {
  const navigation = useNavigation<EditSignalScrenProps>()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigation.navigate("Login") // Navigate to the Login screen after signing out
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <View style={style.container}>
      <CustomButton
        title="Sign Out"
        onPress={handleSignOut}
        textSize={"base"}
      />
      <View style={style.navBar}>
        <CustomText style={style.headerText} fontWeight="bold">
          Edit status
        </CustomText>
        <CrossMark onPress={() => navigation.push("Home")} />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
          paddingTop: 62,
          paddingBottom: 122,
        }}>
        <UserAvatar
          imageUrl={require("@/assets/images/user-avatar.png")}
          size="large"
          style={{ alignSelf: "center" }}
        />
        <Activity />
        <Status
          timeSlots={["NOW", "MORNING", "Lunch", "AFTERNOON", "EVENING"]}
        />
        <FriendsList />
        <ShareCard style={{ marginHorizontal: 20 }} />
      </ScrollView>
      <CustomButton
        containerStyles={style.saveButton}
        variant="secondary"
        fullWidth
        title="Save"
        textSize="sm"
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
})
