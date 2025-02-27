import { StyleSheet, TouchableOpacity } from "react-native"
import CustomText from "../ui/CustomText"
import { theme } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "@/screens/Home"

export default function TapWavv() {
  const navigation = useNavigation<HomeScreenProps>()
  return (
    <TouchableOpacity
      style={styles.headlineTextContainer}
      onPress={() => navigation.push("EditSignal")}>
      <CustomText fontFamily="writer-mono" style={styles.headlineText}>
        Tap anywhere to Wavv
      </CustomText>
    </TouchableOpacity>
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
