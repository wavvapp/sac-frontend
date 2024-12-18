import { View, StyleSheet } from "react-native"
import CustomText from "../ui/CustomText"
import { TouchableOpacity } from "react-native"
import { theme } from "@/theme"
import CloseIcon from "@/components/vectors/CloseIcon"
import { useNavigation } from "@react-navigation/native"

export default function Header({ title }: { title: string }) {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <View style={styles.spacer} />
      <CustomText size="lg" fontWeight="bold">
        {title}
      </CustomText>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CloseIcon color={theme.colors.black} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  spacer: {
    width: 24,
  },
})
