import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { ReactNode } from "react"
import ChevronRightIcon from "@/components/vectors/ChevronRightIcon"
import { FontFamilyVariant } from "@/types"

export default function ActionCard({
  style,
  titleStyle,
  title,
  description,
  icon,
  onPress,
  fontFamily,
}: {
  style?: ViewStyle
  titleStyle?: TextStyle
  title: string
  description?: string
  icon?: ReactNode
  fontFamily?: FontFamilyVariant
  onPress: () => void
  id?: string
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          <CustomText style={titleStyle} fontWeight="semibold">
            {title}
          </CustomText>
          {description && (
            <CustomText fontFamily={fontFamily} style={styles.inviteButtonText}>
              {description}
            </CustomText>
          )}
        </View>
        <ChevronRightIcon />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: theme.colors.black_200,
    padding: 12,
  },
  inviteButtonText: {
    color: theme.colors.black_500,
    flexWrap: "wrap",
  },
  textContainer: {
    width: "100%",
    flex: 1,
  },
})
