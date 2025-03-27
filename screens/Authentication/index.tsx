import React, { useState } from "react"
import { View, StyleSheet, Text, ActivityIndicator } from "react-native"
import { CustomButton } from "@/components/ui/Button"
import { theme } from "@/theme"
import CustomText from "@/components/ui/CustomText"
import { useAuth } from "@/contexts/AuthContext"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useNavigation } from "@react-navigation/native"
import { CredentialsScreenProps } from "./SignUp/CreateCredentials"
import AppleIcon from "@/components/vectors/AppleIcon"
import GoogleIcon from "@/components/vectors/GoogleIcon"
import { StaticPageType } from "@/types"
import { height } from "@/utils/dimensions"
import WavvLogo from "@/components/vectors/WavvLogo"
import NoiseVideo from "@/components/NoiseVideo"

GoogleSignin.configure({
  webClientId: process.env.WEB_CLIENT_ID,
  iosClientId: process.env.IOS_CLIENT_ID,
  offlineAccess: false,
})
export default function EntryScreen() {
  const { signInWithGoogle, signInWithApple } = useAuth()
  const navigation = useNavigation<CredentialsScreenProps>()

  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAppleLoading, setIsAppleLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true)
      await signInWithGoogle(navigation)
    } catch (error) {
      console.error("SignIn with google failed with:", error)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleAppleSignIn = async () => {
    try {
      setIsAppleLoading(true)
      await signInWithApple(navigation)
    } catch (error) {
      console.error("SignIn with Apple failed", error)
    } finally {
      setIsAppleLoading(false)
    }
  }

  const navigateToStaticScreen = (screen: StaticPageType) => {
    navigation.navigate("StaticContentScreen", { pageSlug: screen })
  }

  return (
    <View style={styles.container}>
      <NoiseVideo />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <WavvLogo width={390} height={80} />
          <CustomText fontFamily="writer-monos" style={styles.description}>
            Signal friends your availability
          </CustomText>
        </View>
        <View style={styles.subContainer}>
          {isGoogleLoading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.white}
              style={styles.spinner}
            />
          ) : (
            <CustomButton
              variant="destructive"
              title="Sign In with Google"
              onPress={handleGoogleLogin}
              textStyles={styles.buttonText}
              hasCenteredIcon>
              <GoogleIcon />
            </CustomButton>
          )}

          {isAppleLoading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.white}
              style={styles.spinner}
            />
          ) : (
            <CustomButton
              variant="primary"
              title="Sign in with Apple"
              onPress={handleAppleSignIn}
              textStyles={styles.buttonText}
              hasCenteredIcon>
              <AppleIcon />
            </CustomButton>
          )}

          <CustomText
            fontFamily="writer-monos"
            size="sm"
            style={styles.agreementText}>
            By clicking on
            <Text> Sign In / Create an account </Text>
            you agree to our{" "}
            <Text
              onPress={() => navigateToStaticScreen("terms")}
              style={styles.underline}>
              Terms of Services
            </Text>
            . Learn more about our{" "}
            <Text
              onPress={() => navigateToStaticScreen("privacy")}
              style={styles.underline}>
              Privacy Policy
            </Text>{" "}
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
    position: "relative",
  },
  content: {
    flex: 1,
    paddingTop: height * 0.4,
    paddingBottom: 70,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    alignSelf: "center",
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
    paddingHorizontal: 2,
  },
  spinner: {
    marginVertical: 20,
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
