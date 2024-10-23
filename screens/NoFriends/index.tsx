import PerlinNoise from "@/components/PerlinNoise"
import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { Image, StyleSheet, View } from "react-native"
import { useSharedValue } from "react-native-reanimated"

export default function NoFriendsScreen() {
  const isOn = useSharedValue(false)

  return (
    <View style={styles.container}>
      <PerlinNoise isOn={isOn} color1="#281713" color2="blue" />
      <View style={styles.contentContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/noise-sm.png")}
        />
        <View style={styles.content}>
          <CustomText size="lg" fontWeight="semibold">
            Welcome to Wavv
          </CustomText>
          <CustomText style={styles.descriptionText}>
            Add your friends to signal your availability
          </CustomText>
          {/* //TODO: Redirect to the friends screen once it's ready */}
          <CustomButton title="FIND FRIENDS" textStyles={styles.button} />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    borderRadius: 12,
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  image: {
    resizeMode: "cover",
  },
  descriptionText: {
    marginBottom: 24,
    marginTop: 4,
  },
  button: {
    textTransform: "uppercase",
  },
})
