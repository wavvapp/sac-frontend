import React, { forwardRef } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import UserAvatar from "@/components/ui/UserAvatar"
import UserInfo from "@/components/UserInfo"
import { onlineUsers, offlineUsers } from "@/data/users"
import { User } from "@/types"

import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "@/components/ui/Button"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
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
      {!availableUsers.length && (
        <CustomText style={styles.noUsers}>
          None of your friends on Wavv are available today
        </CustomText>
      )}
      <BottomSheetSectionList
        sections={[
          {
            title: "available users",
            data: availableUsers,
            renderItem: ({ item }) => (
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
            ),
          },
          {
            title: "Other users",
            data: otherusers,
            renderItem: ({ item }) => (
              <View style={[styles.userCard, styles.availableUserCard]}>
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
            ),
          },
        ]}
        keyExtractor={(item) => item.id}
      />
    </BottomDrawer>
  )
})

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    paddingVertical: 9,
    paddingHorizontal: 20,
  },
  availableUserCard: {
    backgroundColor: theme.colors.white_100,
  },
  noUsers: {
    padding: 20,
  },
})

Signaling.displayName = "Signaling"

export default Signaling
