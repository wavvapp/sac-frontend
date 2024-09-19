import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomText from "../ui/CustomText";
import UserAvatar from "../ui/UserAvatar";

interface User {
  id: string;
  name: string;
  status: string;
  username: string;
}

interface SignalingProps {
  users?: User[];
}

function Signaling({ users = [] }: SignalingProps) {
  const defaultUsers = [
    { id: "1", name: "Emil Wagner", status: "Evening", username: "jodelkeller" },
    { id: "2", name: "Vincent Reichel", status: "Evening", username: "jodelkeller" },
    { id: "3", name: "Gretchen Casper", status: "Evening", username: "jodelkeller" },
    { id: "4", name: "Elizabeth Carroll", status: "Evening", username: "jodelkeller" },
    { id: "5", name: "Kayla Leuschke", status: "Evening", username: "jodelkeller" },
    { id: "6", name: "Johnny hopie", status: "Evening", username: "jodelkeller" },
  ];

  const displayUsers = users.length > 0 ? users : defaultUsers;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>12</Text>
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
              <Text>{item.name}</Text>
              <Text>{item.status}</Text>
              <Text>{item.username}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 50,
    paddingLeft: 20,
  },
  header: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginBottom: 16,
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
  },
});

export default Signaling;
