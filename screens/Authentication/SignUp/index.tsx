import { CustomButton } from "@/components/ui/Button"
import { RootStackParamList } from "@/navigation"
import { theme } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { View, TextInput, StyleSheet, Text } from "react-native"

type SignUpProp = NativeStackNavigationProp<RootStackParamList, "SignUp">

export default function SignUp() {
  const navigation = useNavigation<SignUpProp>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignUp = () => {
    //TODO:Handle sign-up logic here
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <CustomButton
        title="Sign Up now"
        fullWidth
        variant="secondary"
        onPress={handleSignUp}
      />
      <Text style={styles.signupText}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("EntryScreen")}>
          Login
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: theme.colors.gray_100,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
  },
  link: {
    color: "blue",
  },
})
