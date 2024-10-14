import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { useState, useEffect } from "react";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleSignIn = (onSuccess: (userInfo: any) => void) => {
  const [userInfo, setUserInfo] = useState(null);

  const clientId = Platform.OS === "ios" ? IOS_CLIENT_ID : ANDROID_CLIENT_ID;

  const config = {
    scopes: ["profile", "email"],
    redirectUri: "https://auth.expo.io/@igorntwali/social_app",
    clientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      getUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    (async () => {
      const userJSON = await AsyncStorage.getItem("user");
      if (userJSON) {
        const storedUser = JSON.parse(userJSON);
        setUserInfo(storedUser);
        onSuccess(storedUser);
      }
    })();
  }, []);

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
      onSuccess(user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("user");
      if (userJSON) {
        const storedUser = JSON.parse(userJSON);
        setUserInfo(storedUser);
        onSuccess(storedUser);
      }
    } catch (error) {
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
  };

  return { userInfo, promptAsync };
};
