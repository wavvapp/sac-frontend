import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@/components/ui/CustomText";
import UserAvatar from "@/components/ui/UserAvatar";
import UserInfo from "@/components/UserInfo";
import Badge from "@/components/ui/Badge";
import { defaultUsers } from "@/data/users";
import { User } from "@/types";

import { FlatList } from "react-native-gesture-handler";
import BottomDrawer from "@/components/BottomDrawer";
import { theme } from "@/theme";
export interface SignalingRef {
  openBottomSheet: () => void;
}

interface SignalingProps {
  users?: User[];
}

const Signaling = forwardRef<SignalingRef, SignalingProps>((props, ref) => {

  const displayUsers = props.users?.length ? props.users : defaultUsers;


  return (
    <BottomDrawer ref={ref}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", height: 50, backgroundColor: theme.colors.black, gap: 12 }}>
          <Badge variant="primary" name="2/4" />
          <Badge variant="primary" name="3/4" style={{ opacity: 0.3 }} />
        </View>
        <View style={styles.header}>
          <Badge name={displayUsers.length.toString()} />
          <CustomText size="sm" fontWeight="bold">
            Friends are signaling
          </CustomText>
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          style={styles.flalist}
          data={displayUsers as User[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <UserAvatar imageUrl={item.imageUrl || 0} />
              <View>
                <UserInfo
                  firstName={item.firstName}
                  lastName={item.lastName}
                  time={item.time}
                  activity={item.activity}
                />
              </View>
            </View>
          )}
        />
      </View>
    </BottomDrawer>
  );
});

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
    paddingBottom:70
  },
});

export default Signaling;
