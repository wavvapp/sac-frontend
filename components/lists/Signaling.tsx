import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CustomText from "@/components/ui/CustomText";
import UserAvatar from "@/components/ui/UserAvatar";
import UserInfo from "@/components/UserInfo";
import Badge from "@/components/ui/Badge";
import { defaultUsers } from "@/datas/users";

interface User {
  id: string;
  name: string;
  status: string;
  username: string;
}

interface SignalingProps {
  users?: User[];
}

const Signaling = (props: SignalingProps) => {
  const displayUsers = props.users?.length ? props.users : defaultUsers;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Badge name={displayUsers.length.toString()} />
        <CustomText size="sm" fontWeight="bold">
          Friends are signaling
        </CustomText>
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        style={styles.flalist}
        data={displayUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <UserAvatar imageUrl={0} />
            <View>
              <UserInfo
                name={item.name}
                time={item.status}
                activity={item.username}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 18,
  },
  flalist: {
    width: "100%",
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 70,
  },
});

export default Signaling;
