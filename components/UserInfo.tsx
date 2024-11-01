import { StyleSheet, View, ViewProps } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"

interface UserInfoProps extends ViewProps {
  fullName: string
  username: string
}

export default function UserInfo({
  fullName,
  username,
  style,
  ...rest
}: UserInfoProps) {
  return (
    <View style={(styles.container, style)} {...rest}>
      <CustomText fontWeight="semibold">{fullName}</CustomText>
      <CustomText fontFamily="writer-mono" style={styles.username}>
        @{username}
      </CustomText>
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
})
