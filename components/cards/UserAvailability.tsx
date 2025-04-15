import { StyleSheet, View, ViewProps, Text } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { User } from "@/types"
import UserInfo from "@/components/UserInfo"

interface UserAvailabilityProps extends ViewProps {
  fullName: User["names"]
  time: User["activity"]
  activity: User["activity"]
  hasNotificationEnabled?: boolean
  showNotificationIcon?: boolean
  onChangeNotificationStatus?: () => void
}

export default function UserAvailability({
  fullName,
  time,
  activity,
  style,
  hasNotificationEnabled,
  showNotificationIcon,
  onChangeNotificationStatus,
  ...rest
}: UserAvailabilityProps) {
  return (
    <View style={(styles.container, style)} {...rest}>
      <UserInfo
        fullName={fullName}
        username={""}
        onChangeNotificationStatus={onChangeNotificationStatus}
        showNotificationIcon={showNotificationIcon}
        hasNotificationEnabled={hasNotificationEnabled}
      />

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
  time: {
    textTransform: "capitalize",
    color: theme.colors.black_500,
  },
  dot: {
    color: theme.colors.black_500,
    fontSize: theme.fontSize.base,
    alignSelf: "center",
  },
})
