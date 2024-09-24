import { NavigationContainer } from "@react-navigation/native";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/Home";
import EditSignal from "@/screens/EditSignal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import SignUp from "@/screens/Authentication/SignUp";
import Login from "@/screens/Authentication/Login";
import CustomSplashScreen from "@/screens/CustomSplashScreen";
import Settings from "@/screens/Settings";
import Signaling from "@/components/lists/Signaling";

export type RootStackParamList = {
  Home: undefined;
  EditSignal: undefined;
  Login: undefined;
  SignUp: undefined;
  Settings: undefined;
  Signaling: undefined;
};

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <CustomSplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitleStyle: { color: "#fff" },
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="EditSignal"
            options={{ presentation: "modal" }}
            component={EditSignal}
          />
          <Stack.Screen
            name="Signaling"
            options={{ presentation: "modal",headerShown:false }}
            component={Signaling}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
