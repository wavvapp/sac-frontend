import React, { forwardRef } from "react"
import { View, StyleSheet, SectionList } from "react-native"
import CustomText from "@/components/ui/CustomText"
import UserAvatar from "@/components/ui/UserAvatar"
import UserInfo from "@/components/UserInfo"
import { onlineUsers, offlineUsers } from "@/data/users"
import { User } from "@/types"

import { FlatList } from "react-native-gesture-handler"
import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "@/components/ui/Button"
export interface SignalingRef {
  openBottomSheet: () => void
}

interface SignalingProps {
  users?: User[]
}

const Signaling = forwardRef<SignalingRef, SignalingProps>((props, ref) => {
  const availableUsers = props.users?.length ? props.users : onlineUsers
  const otherusers = props.users?.length ? props.users : offlineUsers

  const sections: {
    title: string
    data: User[]
    renderItem: ({ item }: { item: User }) => JSX.Element
  }[] = [
    {
      title: "Products",
      data: availableUsers,
      renderItem: ({ item }: { item: User }) => (
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
      title: "Supervisors",
      data: otherusers,
      renderItem: ({ item }: { item: User }) => (
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
  ]

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
        <CustomText style={styles.noUsers}>None of your friends on Wavv are available today</CustomText>
      )}
      <FlatList
        data={[1]}
        keyExtractor={(index) => index.toString()}
        renderItem={() => (
          <SectionList
            sections={sections}
            keyExtractor={(index) => index.toString()}
          />
        )}
      />
    </BottomDrawer>
  )
})

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 16,
  // },
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
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  // flalist: {
  //   width: "100%",
  // },
  // availableUsers: {
  //   flexGrow: 1,
  //   justifyContent: "flex-start",
  //   paddingBottom: 70,
  // },
  // avalableUserCard: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 10,
  //   backgroundColor: theme.colors.white_100,
  //   paddingHorizontal: 20,
  //   paddingVertical: 20,
  // },
  noUsers: {
    padding: 20,
  },
})

Signaling.displayName = "Signaling"

export default Signaling
