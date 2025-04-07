import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { TypographySizeVariant } from "@/types"
import BellIcon from "../components/vectors/BellIcon"

interface UserInfoProps extends ViewProps {
  fullName: string
  username: string
  size?: TypographySizeVariant
  hasNotificationEnabled?: boolean
  showNotificationIcon?: boolean
  showUsername?: boolean
  onChangeNotificationStatus?: () => void
}

export default function UserInfo({
  fullName,
  username,
  style,
  size,
  hasNotificationEnabled,
  showUsername,
  showNotificationIcon,
  onChangeNotificationStatus,
  ...rest
}: UserInfoProps) {
  const bellColor = hasNotificationEnabled
    ? theme.colors.black
    : theme.colors.black_200

  return (
    <View style={(styles.container, style)} {...rest}>
      <View style={styles.fullName}>
        <CustomText fontWeight="semibold" size={size}>
          {fullName}
        </CustomText>
        {showNotificationIcon && (
          <TouchableOpacity onPress={onChangeNotificationStatus}>
            <BellIcon width={16} height={16} stroke={bellColor} />
          </TouchableOpacity>
        )}
      </View>
      {showUsername && (
        <CustomText fontFamily="writer-monov" style={styles.username}>
          @{username}
        </CustomText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: "row",
  },
  username: {
    color: theme.colors.black,
    opacity: 0.5,
  },
  fullName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
})
