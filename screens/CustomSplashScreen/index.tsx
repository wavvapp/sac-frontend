import NoiseVideo from "@/components/NoiseVideo"
import CustomText from "@/components/ui/CustomText"
import WavvLogo from "@/components/vectors/WavvLogo"
import { theme } from "@/theme"
import { StyleSheet, View } from "react-native"

export default function CustomSplashScreen() {
  return (
    <View style={styles.container}>
      <NoiseVideo />

      <View style={styles.content}>
        <WavvLogo width={390} height={80} />
        <CustomText size="sm" fontFamily="writer-mono" style={styles.subText}>
          Signal friends your availability
        </CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.black,
    position: "relative",
  },
  content: {
    gap: 4,
  },
  subText: {
    color: theme.colors.white,
    textAlign: "center",
  },
})
