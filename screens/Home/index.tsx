import PerlinNoise from "@/components/PerlinNoise";
import { CustomButton } from "@/components/ui/Button";
import CheckBox from '@/components/ui/CheckBox';
import UserInfo from "@/components/UserInfo";
import { useAuth } from "@/contexts/AuthContext";
import { RootStackParamList } from "@/navigation";
import { theme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, StyleSheet, View, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Status from '@/components/cards/Status';
import { useSharedValue } from "react-native-reanimated";
import { AnimatedSwitch } from "@/components/AnimatedSwitch";
type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const userInfo = {
  name: 'Emil WAgner',
  time: 'Evening',
  activity: 'Jodelkeller'
}
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
      <View
        style={{
          backgroundColor: theme.colors.white,
          paddingVertical: 20,
          width: '100%',
          alignItems: 'center',
          gap: 16
        }}
      >
        <CheckBox
          isChecked
          onCheckedChange={(isChecked) =>
            console.log('The button is clicked', isChecked)
          }
        />
        <CheckBox isChecked style={{ margin: 20 }} />
        <CheckBox isChecked={false} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          padding: 40,
          backgroundColor: '#FFF'
        }}
      >
        <CustomButton
          variant="primary"
          textSize="base"
          title="Primary"
          onPress={() => navigation.push('Settings')}
        />
        <CustomButton
          variant="secondary"
          textSize="base"
          title="Edit Signal"
          onPress={() => navigation.push("EditSignal")}
        />
        <CustomButton
          variant="secondary"
          active
          textSize="base"
          title="Now"
          onPress={() => navigation.push('EditSignal')}
        />
        <Button title="Normal" onPress={signOut} />
      </View>
      <Text>Hello {user?.name}</Text>
      <Text>your Email {user?.email}</Text>
      <View style={styles.userInfo}>
        <UserInfo
          name={userInfo.name}
          time={userInfo.time}
          activity={userInfo.activity}
        />
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
  userInfo: {
    padding: 4,
    backgroundColor: theme.colors.white
  },
  switch: {
    width: width * 0.18,
    height: width * 0.35,
    padding: 10
  }
})
