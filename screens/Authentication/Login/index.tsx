import { signInWithGoogle } from '@/constants/googleSignin'
import { useAuth } from '@/contexts/AuthContext'
import { RootStackParamList } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native'

type LoginProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function Login() {
  const navigation = useNavigation<LoginProp>()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login clicked')
    signIn('asdasdasda', { name: 'Anas', email, id: '1' })
  }

  const handleGoogleSignIn = async () => {
    try {
      const googleResponse = await signInWithGoogle()
      if (googleResponse) {
        console.log('Google Sign-In Success:', googleResponse)
       
      }
    } catch (error) {
      console.error('Google Sign-In Failed:', error)
    }
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google red color
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
  },
})
