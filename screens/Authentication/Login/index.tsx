import { useAuth } from "@/contexts/AuthContext"
import { RootStackParamList } from "@/navigation"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { View, TextInput, Button, StyleSheet, Text } from "react-native"

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin"

GoogleSignin.configure({
  webClientId:
    "351310982043-d2sbe099g0aaq28ussbjfn2l51862t6i.apps.googleusercontent.com",
  iosClientId:
    "351310982043-28dk2k254o76heo1d4pr3uftmgsjmihh.apps.googleusercontent.com",
  offlineAccess: true,
})
type LoginProp = NativeStackNavigationProp<RootStackParamList, "Login">

export default function Login() {
  const navigation = useNavigation<LoginProp>()
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    // Handle login logic here
    // signIn("asdasdasda", { name: "Anas", email, id: "1" })
    await signIn()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          handleLogin
        }}
      />
      ;
      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
          Sign Up
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
    borderColor: "#ccc",
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
