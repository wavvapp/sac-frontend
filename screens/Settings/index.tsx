import UserAvatar from '@/components/ui/UserAvatar'
import React from 'react'
import { Text, View } from 'react-native'

export default function Settings() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings screen</Text>
      <UserAvatar
        imageUrl={require("@/assets/images/adaptive-icon.png")}
        size="large"
      />
    </View>
  );
}
