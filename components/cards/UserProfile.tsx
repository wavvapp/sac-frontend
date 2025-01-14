import React from "react"
import { View, StyleSheet } from "react-native"
import UserAvatar from "@/components/ui/UserAvatar"
import { useAuth } from "@/contexts/AuthContext"
import UserInfo from "@/components/UserInfo"

export default function UserProfile() {
  const { user } = useAuth()
  const { names, username } = user || {}
  return (
    <View style={styles.container}>
      <UserAvatar
        imageUrl={user?.profilePictureUrl}
        size="medium"
        style={{ alignSelf: "center" }}
      />
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
})
