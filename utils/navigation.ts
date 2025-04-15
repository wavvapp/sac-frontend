import { createNavigationContainerRef } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { RootStackParamList } from "../types"

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export const navigateToAuthScreen = async () => {
  await AsyncStorage.removeItem("@Auth:refreshToken")
  await AsyncStorage.removeItem("@Auth:accessToken")

  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: "EntryScreen" }],
    })
  }
}

export const navigate = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
