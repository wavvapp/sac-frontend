import React from "react";
import { StyleSheet, View } from "react-native";
import Status from "@/components/cards/Status";
import { CustomButton } from "@/components/ui/Button";
import UserAvatar from "@/components/ui/UserAvatar";
import CrossMark from "@/components/vectors/CrossMark";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";
import UserAvailability from "@/components/UserAvailability";
import FriendsList from "@/components/lists/Friends";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth for logout

type EditSignalScreenProps = NativeStackNavigationProp<RootStackParamList, "EditSignal">;

export default function EditSignal() {
  const navigation = useNavigation<EditSignalScreenProps>();
  const { signOut } = useAuth(); // Access the logout function

  const handleLogout = () => {
    signOut(); // Log the user out
  };

  return (
    <View style={style.container}>
      {/* Logout Button */}
      <CustomButton
        variant="secondary"
        title="Logout"
        onPress={handleLogout}
        textSize={"base"}
      />
      <View style={style.navBar}>
        <CrossMark onPress={() => navigation.push("Home")} />
        <CustomButton variant="primary" title="Done" textSize="sm" />
      </View>
      <UserAvatar
        imageUrl={require("@/assets/images/user-avatar.png")}
        size="large"
      />
      <UserAvailability />
      <Status timeSlots={["NOW", "MORNING", "Lunch", "AFTERNOON", "EVENING"]} />
      <FriendsList />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 30,
    paddingTop: 44,
  },
  navBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
  },
});
