import { View, StyleSheet, Text } from "react-native"
import PerlinNoise from "@/components/PerlinNoise"
import { CustomButton } from "@/components/ui/Button"
import { theme } from "@/theme"
import LogoIcon from "@/components/vectors/LogoIcon"
import CustomText from "@/components/ui/CustomText"
import { useNavigation } from "@react-navigation/native"
import { useSharedValue } from "react-native-reanimated"

export default function EntryScreen() {
  const navigation = useNavigation()

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount")
  }

  const handleSignIn = () => {
    navigation.navigate("SignIn")
  }
  const noise = useSharedValue(true)

  return (
    <View style={styles.container}>
      <PerlinNoise
        isOn={noise}
        color1={theme.colors.black}
        color2={theme.colors.white}
      />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LogoIcon />
          <CustomText fontFamily="writer-mono" style={styles.description}>
            Signal friends your availability
          </CustomText>
        </View>
        <View style={styles.subContainer}>
          <CustomButton
            variant="primary"
            title="Create Account"
            onPress={handleCreateAccount}
          />
          <CustomButton
            variant="destructive"
            title="Sign In"
            onPress={handleSignIn}
          />
          <CustomText fontFamily="writer-mono" style={styles.agreementText}>
            By clicking on{" "}
            <Text style={{ fontWeight: "bold" }}>
              Sign In / Create an account
            </Text>{" "}
            you agree to our{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Terms of Services
            </Text>
            . Learn more about our{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Privacy Policy
            </Text>{" "}
            and{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Cookies Policy
            </Text>
          </CustomText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
    flex: 1,
  },

  agreementText: {
    textAlign: "center",
    fontSize: 13,
    color: theme.colors.white_500,
    lineHeight: 20,
  },
})
