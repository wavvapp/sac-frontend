import React from "react"
import { ActivityIndicator, View } from "react-native"

export default function CustomSplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  )
}
