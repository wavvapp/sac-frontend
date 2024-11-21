import { StyleSheet, View, ViewProps } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { User } from "@/types"

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
      <View style={styles.header}>
        <CustomText style={styles.name} fontWeight="semibold">
          {fullName}
        </CustomText>
        <View style={styles.dot} />
        <CustomText style={styles.time} fontFamily="marfa">
          {time}
        </CustomText>
      </View>
      <CustomText
        style={styles.activity}
        fontFamily="writer-mono"
        numberOfLines={2}
        ellipsizeMode="tail">
        {activity}
      </CustomText>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    textTransform: "capitalize",
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
  },
  activity: {
    textTransform: "capitalize",
  },
})
