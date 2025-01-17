import { View } from "react-native"
import CustomText from "../ui/CustomText"

export const VerificationCodeCard = () => {
  return (
    <View>
      <CustomText
        size="lg"
        fontWeight="semibold"
        style={{
          fontSize: 40,
          lineHeight: 56,
        }}>
        964 021
      </CustomText>
      <CustomText size="base" style={{ textAlign: "center" }}>
        Tap to copy
      </CustomText>
    </View>
  )
}
