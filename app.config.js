export default {
  expo: {
    plugins: [
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.298782621487-l1sa5idjo8oo0cnu6h7l8libb2rp4ib4",
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/images/favicon.png",
          color: "#000000",
        },
      ],
      "expo-apple-authentication",
    ],
    name: "Wavv",
    slug: "Wavv",
    scheme: "wavv",
    platforms: ["ios", "android", "web"],
    version: "1.7.4",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    assetBundlePatterns: ["**/*"],
    ios: {
      usesAppleSignIn: true,
      supportsTablet: true,
      bundleIdentifier: "com.apeunit.social.app",
      buildNumber: "1.7.4",
      teamId: "CZ6DRS2DW4",
      associatedDomains: ["applinks:wavvapp.com"],
      splash: {
        resizeMode: "contain",
        backgroundColor: "#000000",
        image: "./assets/images/splash-icon-light.png",
        dark: {
          image: "./assets/images/splash-icon-light.png",
          backgroundColor: "#000000",
        },
      },
      infoPlist: {
        appStoreID: "6738583772",
        NSCameraUsageDescription:
          "This app uses the camera to scan barcodes on event tickets.",
        UIBackgroundModes: ["remote-notification", "remote-notification"],
        NSAppTransportSecurity: {
          NSExceptionDomains: {
            "wavvapp.com": {
              NSIncludesSubdomains: true,
              NSTemporaryExceptionMinimumTLSVersion: "TLSv1.2",
              NSTemporaryExceptionAllowsInsecureHTTPLoads: true,
              NSTemporaryExceptionRequiresForwardSecrecy: false,
            },
          },
        },
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        monochromeImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#000000",
      },
      splash: {
        resizeMode: "native",
        backgroundColor: "#000000",
        image: "./assets/images/splash-icon-light.png",
        dark: {
          image: "./assets/images/splash-icon-light.png",
          backgroundColor: "#000000",
        },
      },
      package: "com.apeunit.wavv.app",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      useNextNotificationsApi: true,
      intentFilters: [
        {
          action: "VIEW",
          data: {
            scheme: "https",
            host: "wavvapp.com",
            pathPrefix: "/open",
          },
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      eas: {
        projectId: "bef736cd-7f43-44a8-8a8b-a71d84223238",
      },
    },
    owner: "wavvteam",
  },
}
