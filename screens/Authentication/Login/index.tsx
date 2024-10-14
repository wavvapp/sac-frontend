import { useGoogleSignIn } from "@/constants/Googlesignin";
import { useAuth } from "@/contexts/AuthContext";
import { RootStackParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

type LoginProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const navigation = useNavigation<LoginProp>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSuccess = (userInfo: any) => {
    console.log("Navigating to Home with userInfo:", userInfo);
    console.log("Current Navigation State:", navigation.getState());
    navigation.navigate("Home", { userInfo });
  };

  const { promptAsync } = useGoogleSignIn(onSuccess);

  const handleLogin = () => {
    console.log("Login clicked");
    signIn("asdasdasda", { name: "Anas", email, id: "1" });
  };

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
      <Button
        title="sign in with google"
        onPress={() => {
          promptAsync();
        }}
      />

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
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
});
