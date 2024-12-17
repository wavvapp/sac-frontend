import { View, StyleSheet } from "react-native"
import { CustomButton } from "@/components/ui/Button"
import { theme } from "@/theme"
import CustomText from "@/components/ui/CustomText"
import { useAuth } from "@/contexts/AuthContext"
import LeftArrow from "@/components/vectors/LeftArrow"
import { ConfirmationAction } from "@/components/cards/ConfirmationAction"
import LogoutIcon from "@/components/vectors/LogoutIcon"
import RightIcon from "@/components/vectors/RightIcon"

export default function EntryScreen() {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <CustomButton>
            <LeftArrow />
          </CustomButton>
          <CustomText
            fontFamily="marfa"
            fontWeight="bold"
            size="lg"
            style={styles.description}>
            Manage account
          </CustomText>
        </View>

        <View style={styles.divider} />

        <ConfirmationAction
          leftIcon={<LogoutIcon />}
          rightIcon={<RightIcon />}
          title="Log out"
          description="Are you sure? You'll have to log in again once you're back"
          onPress={handleSignOut}
        />

        {/* <CustomButton
          variant="primary"
          title="Sign Out"
          onPress={handleSignOut}
          textStyles={styles.buttonText}
        /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  content: {
    flex: 1,
    paddingVertical: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    // paddingHorizontal: 16,
    // paddingTop: 20,
    // paddingBottom: 16,
  },

  description: {
    textAlign: "center",
    color: theme.colors.white,
  },
  // buttonText: {
  //   fontWeight: theme.fontWeight.bold,
  // },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
})
