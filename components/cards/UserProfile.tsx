import { View, StyleSheet } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import UserInfo from "@/components/UserInfo"
import UserIcon from "../vectors/UserIcon"
import { theme } from "@/theme"

export default function UserProfile() {
  const { user } = useAuth()
  const { names, username } = user || {}
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <UserIcon color={theme.colors.black_200} height={96} width={96} />
      </View>
      {names && username && (
        <UserInfo
          fullName={names}
          username={username}
          style={styles.userInfoStyles}
          size="lg"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
    alignItems: "center",
  },
  userInfoStyles: {
    alignItems: "center",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 80,
    borderColor: theme.colors.black_200,
    padding: 24,
  },
})
