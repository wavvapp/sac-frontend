import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import ShareIcon from "@/components/vectors/ShareIcon"
import { onShare } from "@/utils/share"
import { useAuth } from "@/contexts/AuthContext"

export default function ShareCard({ style }: { style?: ViewStyle }) {
  const { user } = useAuth()
  return (
    <TouchableOpacity onPress={() => onShare(user?.username)}>
      <View style={[styles.container, style]}>
        <View style={styles.iconContainer}>
          <ShareIcon />
        </View>
        <View>
          <CustomText fontWeight="semibold">
            Your friends are not on Wavv?
          </CustomText>

          <CustomText style={styles.inviteButtonText}>
            Invite them to join you
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: theme.colors.black_200,
    padding: 12,
  },
  inviteButtonText: {
    color: theme.colors.black_500,
  },
})
