import React, { forwardRef } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import UserAvatar from "@/components/ui/UserAvatar"
import UserInfo from "@/components/UserInfo"
import { onlineUsers, offlineUsers } from "@/data/users"
import { User } from "@/types"

import { FlatList } from "react-native-gesture-handler"
import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "../ui/Button"
import { theme } from "@/theme"
export interface SignalingRef {
  openBottomSheet: () => void
}

interface SignalingProps {
  users?: User[]
}

const Signaling = forwardRef<SignalingRef, SignalingProps>((props, ref) => {
  const availableUsers = props.users?.length ? props.users : onlineUsers
  const otherusers = props.users?.length ? props.users : offlineUsers

  return (
    <BottomDrawer ref={ref}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CustomText size="xl" fontWeight="bold" style={styles.headerText}>
            Friends
          </CustomText>
          {/* TODO: this should redirect to the search screen */}
          <CustomButton
            variant="primary"
            textSize="sm"
            title="FIND"
            textStyles={{ fontWeight: 600 }}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.availableUsers}
          style={styles.flalist}
          data={availableUsers as User[]}
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
        <FlatList
          contentContainerStyle={styles.otherUsers}
          style={styles.flalist}
          data={otherusers as User[]}
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
  )
})

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "suisse",
    fontSize: 20,
    lineHeight: 28,
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
  availableUsers: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 70,
  },
  otherUsers: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 70,
    backgroundColor: theme.colors.white_100
  },
})

Signaling.displayName = "Signaling"

export default Signaling
