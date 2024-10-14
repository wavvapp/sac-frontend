import { userInfo } from "@/data/user"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, View } from "react-native"
import UserAvailability from "@/components/cards/UserAvailability"

export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>

export default function TestingScreen() {
  return (
    <View style={styles.container}>
      <UserAvailability
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
        time={userInfo.time}
        activity={userInfo.activity}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 140,
    paddingHorizontal: 20,
  },
})
