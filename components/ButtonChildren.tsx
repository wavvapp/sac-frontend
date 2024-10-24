import { StyleSheet, View } from "react-native"
import LoaderIcon from "@/components/vectors/LoaderIcon"
import InfoIcon from "@/components/vectors/InfoIcon"
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
      {icon === "loader" ? <LoaderIcon /> : <InfoIcon />}
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
