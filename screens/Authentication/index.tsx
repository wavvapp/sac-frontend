import { View, StyleSheet, Text } from "react-native"
// import PerlinNoise from "@/components/PerlinNoise"
import { CustomButton } from "@/components/ui/Button"
import { theme } from "@/theme"
import LogoIcon from "@/components/vectors/LogoIcon"
import CustomText from "@/components/ui/CustomText"
import { useAuth } from "@/contexts/AuthContext"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useNavigation } from "@react-navigation/native"
import { CredentialsScreenProps } from "./SignUp/CreateCredentials"
import AppleIcon from "@/components/vectors/AppleIcon"
import GoogleIcon from "@/components/vectors/GoogleIcon"

GoogleSignin.configure({
  webClientId: process.env.WEB_CLIENT_ID,
  iosClientId: process.env.IOS_CLIENT_ID,
  offlineAccess: false,
})
export default function EntryScreen() {
  const { signInWithGoogle, signInWithApple } = useAuth()
  const navigation = useNavigation<CredentialsScreenProps>()

  const handleGoogleLogin = async () => {
    await signInWithGoogle(navigation)
  }

  const handleAppleSignIn = async () => {
    await signInWithApple(navigation)
  }

  return (
    <View style={styles.container}>
      {/* <PerlinNoise isOn={noise} color1="#281713" color2="blue" /> */}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LogoIcon />
          <CustomText fontFamily="writer-mono" style={styles.description}>
            Signal friends your availability
          </CustomText>
        </View>
        <View style={styles.subContainer}>
          <CustomButton
            variant="destructive"
            title="Sign In with Google"
            onPress={handleGoogleLogin}
            textStyles={styles.buttonText}
            isSignInWithIcon>
            <GoogleIcon />
          </CustomButton>
          <CustomButton
            variant="primary"
            title="Sign in with Apple"
            onPress={handleAppleSignIn}
            textStyles={styles.buttonText}
            isSignInWithIcon>
            <AppleIcon />
          </CustomButton>
          <CustomText
            fontFamily="writer-mono"
            size="sm"
            style={styles.agreementText}>
            By clicking on
            <Text> Sign In / Create an account </Text>
            you agree to our{" "}
            <Text style={styles.underline}>Terms of Services</Text>. Learn more
            about our <Text style={styles.underline}>Privacy Policy</Text> and{" "}
            <Text style={styles.underline}>Cookies Policy</Text>.
          </CustomText>
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

  agreementText: {
    textAlign: "center",
    color: theme.colors.white_500,
  },
  buttonText: {
    fontWeight: theme.fontWeight.bold,
  },
  underline: {
    textDecorationLine: "underline",
  },
})
