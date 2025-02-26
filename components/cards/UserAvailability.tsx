import { StyleSheet, View, ViewProps } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { User } from "@/types"
import { capitalizeFirstLetter } from "@/utils"

interface UserAvailabilityProps extends ViewProps {
  fullName: User["names"]
  time: User["activity"]
  activity: User["activity"]
}

export default function UserAvailability({
  fullName,
  time,
  activity,
  style,
  ...rest
}: UserAvailabilityProps) {
  return (
    <View style={(styles.container, style)} {...rest}>
      <CustomText style={styles.name} fontWeight="semibold">
        {fullName}
      </CustomText>
      <View style={styles.header}>
        <CustomText
          fontFamily="writer-mono"
          numberOfLines={2}
          ellipsizeMode="tail">
          {capitalizeFirstLetter(activity)}
        </CustomText>
        <View style={styles.dot} />
        <CustomText style={styles.time} fontFamily="writer-mono">
          {time}
        </CustomText>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 1,
  },
  header: {
    flexDirection: "row",
    gap: 6,
  },
  name: {
    textTransform: "capitalize",
    maxWidth: "70%",
  },
  time: {
    opacity: 0.5,
    textTransform: "capitalize",
  },
  dot: {
    backgroundColor: theme.colors.black,
    opacity: 0.5,
    height: 2,
    width: 2,
    borderRadius: 2,
    marginTop: 12,
  },
})
