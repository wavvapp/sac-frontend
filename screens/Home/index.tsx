import PerlinNoise from '@/components/PerlinNoise'
import { CustomButton } from '@/components/ui/Button';

import UserInfo from "@/components/ui/UserInfo";
import { useAuth } from "@/contexts/AuthContext";
import { RootStackParamList } from "@/navigation";
import { theme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const { user, signOut } = useAuth();
  const userInfo = {
    name: "Emil WAgner",
    time: "Evening",
    activity: "Jodelkeller",
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PerlinNoise color1="#0E0D26" color2="#14163D" />
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          padding: 40,
          backgroundColor: "#FFF",
        }}
      >
        <CustomButton
          variant="primary"
          textSize="base"
          title="Primary"
          onPress={() => navigation.push("Settings")}
        />
        <CustomButton
          variant="secondary"
          textSize="base"
          title="Later"
          onPress={() => navigation.push("EditSignal")}
        />
        <CustomButton
          variant="secondary"
          active
          textSize="base"
          title="Now"
          onPress={() => navigation.push("EditSignal")}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    padding: 4,
    backgroundColor: theme.colors.white,
  },
});
