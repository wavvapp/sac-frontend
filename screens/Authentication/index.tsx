import { View, StyleSheet, Text } from "react-native"
import PerlinNoise from "@/components/PerlinNoise"
import { CustomButton } from "@/components/ui/Button"
import { theme } from "@/theme"
import LogoIcon from "@/components/vectors/LogoIcon"
import CustomText from "@/components/ui/CustomText"
import { useSharedValue } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "@/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type EntryScreenProps = NativeStackNavigationProp<RootStackParamList, "Login">
export default function EntryScreen() {
  const navigation = useNavigation<EntryScreenProps>()
  const handleCreateAccount = () => {
    // this will navigate to create an account
    // navigation.navigate("CreateAccount")
  }

  const handleSignUp = () => navigation.navigate("Login")
  const noise = useSharedValue(false)

  return (
    <View style={styles.container}>
      <PerlinNoise isOn={noise} color1="#281713" color2="blue" />
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
            textStyles={styles.buttonText}
          />
          <CustomButton
            variant="destructive"
            title="Sign In"
            onPress={handleSignUp}
            textStyles={styles.buttonText}
          />
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
