import { useAuth } from '@/contexts/AuthContext'
import { RootStackParamList } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Text, View } from 'react-native'
type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>()
  const { user, signOut } = useAuth()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Settings" onPress={() => navigation.push('Settings')} />
      <Text>Hello {user?.name}</Text>
      <Text>your Email {user?.email}</Text>
      <Button
        title="Edit Sgnal"
        onPress={() => navigation.push('EditSignal')}
      />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  )
}
