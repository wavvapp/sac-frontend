import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { TouchableOpacity } from "react-native"
import { theme } from "@/theme"
import LeftArrow from "@/components/vectors/LeftArrow"
import { useNavigation } from "@react-navigation/native"
import HeaderWrapper from "@/components/ui/HeaderWrapper"
export default function ActionHeader({
  title,
  onPress,
  icon,
}: {
  title: string
  onPress: () => void
  icon: React.ReactNode
}) {
  const navigation = useNavigation()
  return (
    <HeaderWrapper>
      <View style={styles.header}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.icon, { alignItems: "flex-start" }]}
            onPress={() => navigation.goBack()}>
            <LeftArrow style={{ marginLeft: -5 }} />
          </TouchableOpacity>
          <CustomText size="lg" style={styles.title}>
            {title}
          </CustomText>
        </View>

        <TouchableOpacity
          style={[styles.icon, { alignItems: "flex-end" }]}
          onPress={onPress}>
          {icon}
        </TouchableOpacity>
      </View>
    </HeaderWrapper>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  title: {
    fontWeight: theme.fontWeight.semibold,
  },
  icon: {
    height: 48,
    width: 48,
    justifyContent: "center",
  },
})
