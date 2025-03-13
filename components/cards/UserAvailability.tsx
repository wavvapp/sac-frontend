import { StyleSheet, View, ViewProps, Text } from "react-native"
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
      <CustomText style={styles.name} fontWeight="semibold">
        {fullName}
      </CustomText>

      <CustomText style={styles.header} fontFamily="writer-monos">
        <Text style={{ color: "rgba(0, 0, 0,1)" }}>{activity}</Text>
        <Text
          style={{
            ...styles.dot,
            fontFamily: "System",
            marginVertical: "auto",
          }}>
          {" \u2022 "}
        </Text>
        <Text style={styles.time}>{time}</Text>
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
  },
  name: {
    maxWidth: "70%",
  },
  time: {
    textTransform: "capitalize",
    // Opacity itselt cannot work here due to text nesting
    color: "rgba(0, 0, 0,0.5)",
  },
  dot: {
    opacity: 0.5,
    // Opacity itselt cannot work here due to text nesting
    color: "rgba(0, 0, 0,0.5)",
    fontSize: theme.fontSize.base,
    alignSelf: "center",
  },
})
