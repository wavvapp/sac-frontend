import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import CustomText from "@/components/ui/CustomText";
import { theme } from "@/theme";
import { User } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenProps } from "@/screens/Home";
import UserInfo from "@/components/UserInfo";
import EllipsisIcon from "@/components/vectors/EllipsisIcon";

const MAX_VISIBLE_FRIENDS = 3;

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
  const visibleFriends = friends.slice(0, MAX_VISIBLE_FRIENDS);
  const remainingCount =
    friends.length > MAX_VISIBLE_FRIENDS
      ? friends.length - MAX_VISIBLE_FRIENDS
      : 0;

  const fullFriendsList = visibleFriends
    .map((friend) => `${friend.firstName} ${friend.lastName.charAt(0)}`)
    .join(", ");

  const visibleFriendsList =
    remainingCount > 0
      ? `${fullFriendsList}, +${remainingCount} more.`
      : `${fullFriendsList}.`;

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.userContainer}>
        <UserInfo
          firstName={user.firstName}
          lastName={user.lastName}
          time={user.time}
          activity={user.activity}
        />
        <TouchableOpacity>
          <EllipsisIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.friendsContainer}>
        <CustomText size="sm">Visible to {friends.length} friends</CustomText>
        <CustomText size="sm">{visibleFriendsList}</CustomText>
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
    overflow: "hidden",
  },
  userContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendsContainer: {
    marginHorizontal: 24,
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
