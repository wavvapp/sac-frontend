import React, { forwardRef } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import UserAvatar from "@/components/ui/UserAvatar"
import UserInfo from "@/components/UserInfo"
import { availableFriends, offlineFriends } from "@/data/users"
import { User } from "@/types"

import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "@/components/ui/Button"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import UserAvailability from "@/components/cards/UserAvailability"
export interface SignalingRef {
  openBottomSheet: () => void
}

interface SignalingProps {
  availableFriends?: User[]
  availableUsers?: User[]
}

const Signaling = forwardRef<SignalingRef, SignalingProps>((_, ref) => {
  return (
    <BottomDrawer ref={ref}>
      <View style={styles.header}>
        <CustomText size="xl" fontWeight="bold" style={styles.headerText}>
          Friends
        </CustomText>
        {/* TODO: this should redirect to the search screen */}
        <CustomButton
          variant="default"
          textSize="sm"
          title="FIND"
          textStyles={{ fontWeight: 600 }}
        />
      </View>
      {!availableFriends.length && (
        <CustomText style={styles.noUsers}>
          None of your friends on Wavv are available today
        </CustomText>
      )}
      <BottomSheetSectionList
        sections={[
          {
            title: "available users",
            data: availableFriends,
            ItemSeparatorComponent: () => {
              return (
                <View
                  style={{
                    height: 12,
                  }}
                />
              )
            },
            renderItem: ({ item }) => (
              <View style={styles.userCard}>
                <UserAvatar imageUrl={item.imageUrl || 0} />
                <View>
                  <UserAvailability
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
            data: offlineFriends,
            ItemSeparatorComponent: () => {
              return (
                <View
                  style={{
                    height: 12,
                    backgroundColor: theme.colors.black_100,
                  }}
                />
              )
            },
            renderItem: ({ item, index }) => (
              <View
                style={[
                  styles.userCard,
                  styles.availableUserCard,
                  index === 0 && styles.firstCardInTheListStyles,
                ]}>
                <UserAvatar imageUrl={item.imageUrl || 0} />
                <View>
                  <UserInfo
                    firstName={item.firstName}
                    lastName={item.lastName}
                    username={item.username}
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
    paddingHorizontal: 20,
  },
  availableUserCard: {
    backgroundColor: theme.colors.black_100,
  },
  firstCardInTheListStyles: {
    paddingTop: 20,
    marginTop: 20,
  },
  noUsers: {
    padding: 20,
  },
})

Signaling.displayName = "Signaling"

export default Signaling
