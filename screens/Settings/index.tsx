import { View, StyleSheet } from "react-native"
import { CustomButton } from "@/components/ui/Button"
import { theme } from "@/theme"
import LogoIcon from "@/components/vectors/LogoIcon"
import CustomText from "@/components/ui/CustomText"
import { useAuth } from "@/contexts/AuthContext"

export default function EntryScreen() {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LogoIcon />
          <CustomText fontFamily="writer-mono" style={styles.description}>
            Settings screen
          </CustomText>
        </View>
        <View style={styles.subContainer}>
          <CustomButton
            variant="primary"
            title="Sign Out"
            onPress={handleSignOut}
            textStyles={styles.buttonText}
          />
        </View>
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
    justifyContent: "space-between",
  },
  logoContainer: {
    paddingTop: 227,
    alignItems: "center",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    color: theme.colors.white,
    marginTop: 10,
  },
  subContainer: {
    paddingBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    flex: 0,
  },
  buttonText: {
    fontWeight: theme.fontWeight.bold,
  },
})
