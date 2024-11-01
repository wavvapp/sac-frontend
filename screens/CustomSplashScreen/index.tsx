// import PerlinNoise from "@/components/PerlinNoise"
import CustomText from "@/components/ui/CustomText"
import WavvLogo from "@/components/vectors/WavvLogo"
import { theme } from "@/theme"
import { StyleSheet, View } from "react-native"
// import { useSharedValue } from "react-native-reanimated"

export default function CustomSplashScreen() {
  // const isOn = useSharedValue(false)

  return (
    <View style={styles.container}>
      {/* <PerlinNoise isOn={isOn} color1="#281713" color2="blue" /> */}
      <View style={styles.content}>
        <WavvLogo width={390} height={80} />
        <CustomText size="sm" fontFamily="marfa" style={styles.subText}>
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
  },
  content: {
    gap: 4,
  },
  subText: {
    color: theme.colors.white,
    textAlign: "center",
  },
})
