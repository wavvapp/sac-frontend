import Constants from "expo-constants"

export const APP_STORE_URL = `https://apps.apple.com/us/app/${Constants.expoConfig?.ios?.bundleIdentifier || "com.apeunit.social.app"}/${Constants.expoConfig?.ios?.infoPlist?.appStoreID || "6738583772"}`
