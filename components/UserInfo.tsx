import { StyleSheet, View, ViewProps } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"

interface UserInfoProps extends ViewProps {
  firstName: string
  lastName: string
  username: string
}

export default function UserInfo({
  firstName,
  lastName,
  username,
  style,
  ...rest
}: UserInfoProps) {
  return (
    <View style={(styles.container, style)} {...rest}>
      <CustomText size="lg" style={styles.name} fontWeight="semibold">
        {firstName} {lastName}
      </CustomText>
      <CustomText size="sm" fontFamily="writer-mono" style={styles.username}>
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
  name: {
    fontSize: 15,
    lineHeight: 20,
  },
  username: {
    fontSize: 15,
    lineHeight: 20,
    color: theme.colors.black,
    opacity: 0.5,
  },
})
