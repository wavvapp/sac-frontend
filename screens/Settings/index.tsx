import Badge from '@/components/Badge'
import React from 'react'
import { Text, View } from 'react-native'

export default function Settings() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings screen</Text>
      <Badge variant="outline" name="EVENING" />
      <Badge name="12" />
    </View>
  );
}
