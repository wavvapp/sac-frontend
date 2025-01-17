import { StyleSheet, View } from "react-native"
import CustomText from "@/components/ui/CustomText"

export const CopiableText = ({ text }: { text: string }) => {
  return (
    <View>
      <CustomText size="lg" fontWeight="semibold" style={styles.titleText}>
        {text}
      </CustomText>
      <CustomText size="base" style={styles.body}>
        Tap to copy
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    lineHeight: 56,
  },
  body: { textAlign: "center" },
})
