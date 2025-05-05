import { View, StyleSheet } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import UserInfo from "@/components/UserInfo"
import InviteFriendQRCode from "../QRCodeModal/InviteFriendQRCode"

export default function UserProfile() {
  const { user } = useAuth()
  const { names, username } = user || {}
  return (
    <View style={styles.container}>
      <View>{user && <InviteFriendQRCode user={user} size={150} />}</View>
      {names && username && (
        <UserInfo
          fullName={names}
          username={username}
          style={styles.userInfoStyles}
          showUsername={true}
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
