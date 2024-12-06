import * as AppleAuthentication from "expo-apple-authentication"
import { Platform, View } from "react-native"

export default function AppleSignIn() {
  if (Platform.OS !== "ios") return <></>
  async function handleAppleSignIn() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log("Apple Sign-In Success:", credential)
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        console.log("User canceled the sign-in.")
      } else {
        console.error("error from apple:", e)
      }
    }
  }
  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={handleAppleSignIn}
      />
    </View>
  )
}
