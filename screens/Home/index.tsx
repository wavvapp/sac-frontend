import PerlinNoise from '@/components/PerlinNoise'
import { CheckBox } from '@/components/ui/checkbox'
import { useAuth } from '@/contexts/AuthContext'
import { RootStackParamList } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>()
  const { user, signOut } = useAuth()

  return (
    <GestureHandlerRootView style={styles.container}>
      <PerlinNoise color1="#0E0D26" color2="#14163D" />
      <View style={{ backgroundColor: "#FFF", paddingVertical: 20, width: "100%", alignItems: "center", display: "flex", gap: 2 }}>
        <CheckBox isChecked />
        <CheckBox isChecked={false} />
      </View>
      <Button title="Settings" onPress={() => navigation.push('Settings')} />
      <Text>Hello {user?.name}</Text>
      <Text>your Email {user?.email}</Text>
      <Button
        title="Edit Sgnal"
        onPress={() => navigation.push('EditSignal')}
      />
      <Button title="Sign Out" onPress={signOut} />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
