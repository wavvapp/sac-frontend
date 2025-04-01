import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"

import { theme } from "@/theme"

const SignalingHeader = () => {
  return (
    <View style={styles.header}>
      <CustomText size="lg" fontWeight="semibold" style={styles.headerText}>
        Friends
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.white,
  },
  headerText: {
    fontSize: 20,
    lineHeight: 28,
  },
})

export default SignalingHeader
