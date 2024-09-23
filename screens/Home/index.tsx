import PerlinNoise from '@/components/PerlinNoise'
import CheckBox from '@/components/ui/CheckBox';
import { CustomButton } from '@/components/ui/Button';
import CustomText from "@/components/ui/CustomText";
import { useAuth } from '@/contexts/AuthContext'
import { RootStackParamList } from '@/navigation'
import { theme } from '@/theme';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text, View, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const { user, signOut } = useAuth();

  return (
    <GestureHandlerRootView style={styles.container}>
      <PerlinNoise color1="#0E0D26" color2="#14163D" />
      <View style={{ backgroundColor: theme.colors.white, paddingVertical: 20, width: "100%", alignItems: "center", gap: 16 }}>
        <CheckBox isChecked onCheckedChange={(isChecked) => console.log("The button is clicked", isChecked)} />
        <CheckBox isChecked style={{ margin: 20 }} />
        <CheckBox isChecked={false} />
      </View>
      <Button title="Settings" onPress={() => navigation.push('Settings')} />
      <Button title="Settings" onPress={() => navigation.push("Settings")} />
      <View style={{ flexDirection: "row", gap: 16, padding: 40, backgroundColor: "#FFF" }}>
        <CustomButton variant="primary" textSize="base" title='Primary' onPress={() => navigation.push("Settings")} />
        <CustomButton variant="secondary" textSize="base" title='Later' onPress={() => navigation.push("EditSignal")} />
        <CustomButton variant="secondary" active textSize="base" title="Now" onPress={() => navigation.push("EditSignal")} />
        <Button title="Normal" onPress={signOut} />
      </View>
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
    backgroundColor: theme.colors.white,
  },
});
