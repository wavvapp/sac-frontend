import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import CustomText from "../ui/CustomText";
import { theme } from "@/theme";
import { User } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenProps } from "@/screens/Home";
import UserInfo from "../UserInfo";
import EllipsisIcon from "../vectors/EllipsisIcon";

interface UserStatusProps extends ViewStyle {
  friends: User[];
  user: User;
  style?: ViewStyle;
}
export default function UserStatus({
  friends,
  user,
  style,
  ...rest
}: UserStatusProps) {
  const navigation = useNavigation<HomeScreenProps>();
  const visibleFriends = friends.slice(0, 3);
  const remainingCount = Math.max(0, friends.length - 3);

  const friendsText = visibleFriends
    .map((friend) => `${friend.firstName} ${friend.lastName.charAt(0)}`)
    .join(", ");

  const fullFriendsList =
    remainingCount > 0
      ? `${friendsText}${remainingCount > 0 ? `, +${remainingCount} more` : ""}`
      : friendsText;

  return (
    <View style={[styles.container, style]} {...rest}>
      <UserInfo
        name={user.firstName}
        time={user.time}
        activity={user.activity}
        style={styles.userContainer}
      />
      <View style={styles.friendsContainer}>
        <CustomText size="sm">Visible to {friends.length} friends</CustomText>
        <CustomText size="sm">{fullFriendsList}</CustomText>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <CustomText
          onPress={() => navigation.push("EditSignal")}
          size="sm"
          fontWeight="semibold"
          style={styles.editButtonText}
        >
          Tap to edit
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingTop: 24,
    gap: 24,
    borderRadius: 12,
  },
  userContainer: {
    paddingHorizontal: 24,
  },
  friendsContainer: {
    paddingHorizontal: 24,
  },
  editButton: {
    padding: 10,
    backgroundColor: theme.colors.black,
  },
  editButtonText: {
    color: theme.colors.white,
    textAlign: "center",
  },
});
