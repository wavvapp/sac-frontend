import * as AppleAuthentication from "expo-apple-authentication"
import { Platform, View } from "react-native"
import { useAuth } from "@/contexts/AuthContext"

export default function AppleSignIn() {
  const { signInWithApple } = useAuth()

  if (Platform.OS !== "ios") return <></>

  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={5}
        style={{
          borderWidth: 1,
          height: 56,
          width: 350,
        }}
        onPress={signInWithApple}
      />
    </View>
  )
}
