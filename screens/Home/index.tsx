import PerlinNoise from '@/components/PerlinNoise'
import CustomText from "@/components/ui/CustomText";
import UserAvailability from '@/components/UserAvailability';
import { useAuth } from "@/contexts/AuthContext";
import { RootStackParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const { user, signOut } = useAuth();

  return (
    <GestureHandlerRootView style={styles.container}>
      <PerlinNoise color1="#0E0D26" color2="#14163D" />
      <Button title="Settings" onPress={() => navigation.push("Settings")} />
      <Text>Hello {user?.name}</Text>
      <Text>your Email {user?.email}</Text>
      <View style={styles.customText}>
        <CustomText size="2xl">2xl Typography</CustomText>
        <CustomText size="xl">xl Typography</CustomText>
        <CustomText size="lg">lg Typography</CustomText>
        <CustomText size="base">lg Typography</CustomText>
        <CustomText size="sm">sm Typography</CustomText>
        <CustomText size="xs">xs Typography</CustomText>
      </View>
      <Button
        title="Edit Sgnal"
        onPress={() => navigation.push("EditSignal")}
      />
      <Button title="Sign Out" onPress={signOut} />
      <UserAvailability />
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
  customText: {
    padding: 4,
    backgroundColor: "#ffffff",
  },
});
