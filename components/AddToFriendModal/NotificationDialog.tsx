import { theme } from "@/theme"
import { View } from "react-native"
import { CustomButton } from "../ui/Button"
import CustomText from "../ui/CustomText"
import { StyleSheet } from "react-native"

export default function NotificationDialog({
  username,
  names,
  onCancelNotificationForFriend,
  onEnableNotificationsForFriend,
}: {
  username: string
  names: string
  onCancelNotificationForFriend: () => void
  onEnableNotificationsForFriend: () => void
}) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        <CustomText style={styles.title} size="lg">
          Stay updated with {username}
        </CustomText>

        <CustomText style={styles.description}>
          Do you want to get notified whenever {names} shares updates?  You can
          adjust this preference later.
        </CustomText>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          variant="outline"
          onPress={onCancelNotificationForFriend}
          title="No"
          containerStyles={styles.button}
        />
        <CustomButton
          onPress={onEnableNotificationsForFriend}
          title="Yes"
          containerStyles={styles.button}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  content: {
    alignItems: "center",
    gap: 0,
    width: "90%",
  },
  title: {
    textAlign: "center",
    fontSize: theme.fontSize.lg,
    marginBottom: 8,
    fontWeight: theme.fontWeight.semibold,
  },
  description: {
    marginBottom: 24,
    textAlign: "center",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 32,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 56,
    paddingVertical: 0,
  },
})
