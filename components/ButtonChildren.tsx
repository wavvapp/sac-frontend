import { StyleSheet, View } from "react-native"
import Loader from "@/components/vectors/Loader"
import CustomText from "@/components/ui/CustomText"

export default function ButtonChildren({
  text,
  icon,
}: {
  text: string
  icon: "loader" | "info"
}) {
  return (
    <View style={styles.buttonChildren}>
      {icon === "loader" ? <Loader /> : <Loader />}
      <CustomText
        fontWeight="semibold"
        fontFamily="marfa"
        size="sm"
        style={styles.buttonText}>
        {text}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonChildren: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  buttonText: {
    flexGrow: 1,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.003,
  },
})
