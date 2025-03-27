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
    version: "1.3.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/wsplash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      usesAppleSignIn: true,
      supportsTablet: true,
      bundleIdentifier: "com.apeunit.social.app",
      buildNumber: "1.3.0",
      teamId: "CZ6DRS2DW4",
      infoPlist: {
        NSCameraUsageDescription:
          "This app uses the camera to scan barcodes on event tickets.",
        UIBackgroundModes: ["remote-notification", "remote-notification"],
        NSAppTransportSecurity: {
          NSExceptionDomains: {
            "local.hey.bild.de": {
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
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#000000",
      },
      package: "com.apeunit.wavv.app",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      useNextNotificationsApi: true,
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
