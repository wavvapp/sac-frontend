import UserStatus from "@/components/cards/UserStatus";
import PerlinNoise from "@/components/PerlinNoise";
import { useAuth } from "@/contexts/AuthContext";
import { visibleFriends } from "@/data/friends";
import { userInfo } from "@/data/user";
import { RootStackParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { AnimatedSwitch } from "@/components/AnimatedSwitch";
export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const { width } = Dimensions.get('window')
export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>()
  const { user, signOut } = useAuth()
  const isOn = useSharedValue(false)

  const handlePress = () => {
    isOn.value = !isOn.value
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PerlinNoise isOn={isOn} color1="#0E0D26" color2="#14163D" />
      <AnimatedSwitch
        isOn={isOn}
        onPress={handlePress}
        style={styles.switch}
      />
      <Text>Hello {user?.name}</Text>
      <Text>your Email {user?.email}</Text>

      <View style={styles.UserStatus}>
        <UserStatus friends={visibleFriends} user={userInfo} />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  UserStatus: {
    marginVertical: 4,
  },
  switch: {
    width: width * 0.18,
    height: width * 0.35,
    padding: 10
  }
})
