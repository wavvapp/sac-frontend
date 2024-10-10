import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from "@react-native-google-signin/google-signin";
import Constants from 'expo-constants';
 const { IOS_CLIENT_ID, WEB_CLIENT_ID } = Constants.expoConfig?.extra || {}
 console.log('IOS_CLIENT_ID:', IOS_CLIENT_ID);
 console.log('WEB_CLIENT_ID:', WEB_CLIENT_ID);
 GoogleSignin.configure({
  iosClientId: IOS_CLIENT_ID,
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      return response;
    } else {
      console.log('Sign in was cancelled by user');
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      console.log(error, "testingggg");
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log('Sign-in already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play services not available or outdated');
          break;
        default:
          console.log('Some other error happened', error);
      }
    } else {
      console.log('An unexpected error occurred:', error);
    }
  }
};
