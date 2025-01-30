import CustomText from "@/components/ui/CustomText"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function NotificationPreferences() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomText size="lg" fontWeight="semibold">
        Stay in the Loop with Your Friends
      </CustomText>
      <CustomText>
        Pick which friends you want to get notifications from. You’re in
        control—switch them on or off anytime!
      </CustomText>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
