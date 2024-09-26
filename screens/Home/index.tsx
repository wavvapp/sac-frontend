import UserStatus from "@/components/cards/UserStatus";
import PerlinNoise from "@/components/PerlinNoise";
import { useAuth } from "@/contexts/AuthContext";
import { visibleFriends } from "@/data/friends";
import { userInfo } from "@/data/user";
import { RootStackParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, StyleSheet, View, Dimensions, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { AnimatedSwitch } from "@/components/AnimatedSwitch";
import { CustomButton } from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import Signaling, { SignalingRef } from "@/components/lists/Signaling";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import Settings from "@/components/vectors/Settings";
import { theme } from "@/theme";
import CustomText from "@/components/ui/CustomText";
export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const { width } = Dimensions.get('window')
export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>()
  const { user, signOut } = useAuth()
  const [isVisible, setIsVisible]= useState(false)
  const isOn = useSharedValue(false)
  const signalingRef = useRef<SignalingRef>(null);
  const openSignalingBottomSheet = () => {
    signalingRef.current?.openBottomSheet();
  };

  const handlePress = () => {
    isOn.value = !isOn.value
  }
  
  useDerivedValue(() => {
    if (isOn.value) {
      return runOnJS(setIsVisible)(true)
    }
    return runOnJS(setIsVisible)(false)
  }, [isOn.value])


  return (
    <GestureHandlerRootView >
      <View style={styles.container}>
        <PerlinNoise isOn={isOn} color1="#281713" color2="blue" />
        <View style={{ width: "100%" }}>
          <TouchableOpacity style={{ backgroundColor: theme.colors.gray, borderRadius: 100, padding: 4, height: 48, width: 48, justifyContent: "center", alignItems: "center", alignSelf: "flex-end", marginBottom: 16 }}>
            <Settings />
          </TouchableOpacity>
        </View>
        <View style={styles.UserStatus}>
          {isVisible ? <UserStatus friends={visibleFriends} user={userInfo} /> : <CustomText size="2xl" style={{color: theme.colors.white, textAlign: "center", paddingTop: 80, maxWidth: 200, alignSelf: 'center' }} >What are you up to, today?</CustomText>}
        </View>
        <AnimatedSwitch
          isOn={isOn}
          onPress={handlePress}
          style={styles.switch}
        />
        <Signaling ref={signalingRef} />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    paddingTop: 44,
    paddingHorizontal: 21,
  },
  UserStatus: {
    marginVertical: 4,
    width: "100%",
  },
  switch: {
    width: width * 0.18,
    height: width * 0.35,
    padding: 10,
    marginVertical: 94
  }
})
