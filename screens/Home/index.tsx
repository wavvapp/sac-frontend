import PerlinNoise from '@/components/PerlinNoise'
import CustomText from "@/components/ui/CustomText";
import { useAuth } from "@/contexts/AuthContext";
import { RootStackParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
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
      <CustomText size="2xl" style={styles.customText}>
        2xl Typography
      </CustomText>
      <CustomText size="xl" style={styles.customText}>
        xl Typography
      </CustomText>
      <CustomText size="lg" style={styles.customText}>
        lg Typography
      </CustomText>
      <CustomText size="base" style={styles.customText}>
        lg Typography
      </CustomText>
      <CustomText size="sm" style={styles.customText}>
        sm Typography
      </CustomText>
      <CustomText size="xs" style={styles.customText}>
        xs Typography
      </CustomText>
      <Button
        title="Edit Sgnal"
        onPress={() => navigation.push("EditSignal")}
      />
      <Button title="Sign Out" onPress={signOut} />
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
    color: "white",
  },
});
