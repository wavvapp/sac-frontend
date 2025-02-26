import { StyleSheet, View } from "react-native"
import CustomText from "../ui/CustomText"
import { theme } from "@/theme"

export default function TapWavv() {
  return (
    <View style={styles.headlineTextContainer}>
      <CustomText fontFamily="writer-mono" style={styles.headlineText}>
        Tap anywhere to Wavv
      </CustomText>
    </View>
  )
}
const styles = StyleSheet.create({
  headlineTextContainer: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headlineText: {
    color: theme.colors.white,
    textAlign: "center",
  },
})
