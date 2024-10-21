import { forwardRef } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { availableFriends, offlineFriends } from "@/data/users"
import { User } from "@/types"

import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "@/components/ui/Button"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import AvailableUser from "@/components/AvailableUser"
import offlineUser from "@/components/OffileUser"
export interface SignalingRef {
  openBottomSheet: () => void
}

interface SignalingProps {
  availableFriends?: User[]
  offlineFriends?: User[]
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
            renderItem: ({ item }) => AvailableUser(item),
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
            renderItem: ({ item, index }) => offlineUser(item, index),
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
    fontSize: 20,
    lineHeight: 28,
  },
  noUsers: {
    padding: 20,
  },
})

Signaling.displayName = "Signaling"

export default Signaling
