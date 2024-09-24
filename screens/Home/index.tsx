import UserStatus from "@/components/cards/UserStatus";
import PerlinNoise from "@/components/PerlinNoise";
import { CustomButton } from "@/components/ui/Button";
import CheckBox from "@/components/ui/CheckBox";
import { useAuth } from "@/contexts/AuthContext";
import { RootStackParamList } from "@/navigation";
import { theme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export type HomeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const { user, signOut } = useAuth();
  const userInfo = {
    id: "u4",
    firstName: "Emil",
    lastName: "Wagner",
    time: "Evening",
    activity: "Jodelkeller",
  };
  const visibleFriends = [
    {
      id: "u1",
      firstName: "Erin",
      lastName: "Wagner",
      time: "Evening",
      activity: "Jodelkeller",
    },
    {
      id: "u2",
      firstName: "Vincent",
      lastName: "Russel",
      time: "Evening",
      activity: "Jodelkeller",
    },
    {
      id: "u3",
      firstName: "Johnnie",
      lastName: "Hussel",
      time: "Evening",
      activity: "Jodelkeller",
    },
    {
      id: "u3",
      firstName: "Emil",
      lastName: "Wagner",
      time: "Evening",
      activity: "Jodelkeller",
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <PerlinNoise color1="#0E0D26" color2="#14163D" />
      <Text>Hello {user?.name}</Text>
      <Text>your Email {user?.email}</Text>

      <View style={styles.UserStatus}>
        <UserStatus friends={visibleFriends} user={userInfo} />
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
  UserStatus: {
    marginVertical: 4,
  },
});
