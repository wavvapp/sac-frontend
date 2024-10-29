import { forwardRef, useCallback, useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { availableFriends, offlineFriends } from "@/data/users"
import { User } from "@/types"

import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "@/components/ui/Button"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import SignalingUser from "@/components/SignalingUser"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import api from "@/service"
export interface SignalingRef {
  openBottomSheet: () => void
}

interface SignalingProps {
  availableFriends?: User[]
  offlineFriends?: User[]
}
type SearchProp = NativeStackNavigationProp<RootStackParamList, "Search">

const Signaling = forwardRef<SignalingRef, SignalingProps>((_, ref) => {
  const navigation = useNavigation<SearchProp>()

  const [isLoading, setIsLoading] = useState(false)

  const fetchFriends = useCallback(async () => {
    setIsLoading(true)

    try {
      const { data } = await api.get("friendships")
      return data
    } catch (error) {
      console.warn("Error fetching data:", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchFriends()
  }, [fetchFriends])

  return (
    <BottomDrawer ref={ref}>
      <View style={styles.header}>
        <CustomText size="lg" fontWeight="bold" style={styles.headerText}>
          Friends
        </CustomText>
        <CustomButton
          variant="default"
          textSize="sm"
          title="FIND"
          textStyles={{ fontWeight: 600 }}
          onPress={() => navigation.navigate("Search")}
        />
      </View>
      {isLoading ? (
        <CustomText>Loading</CustomText>
      ) : (
        <>
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
                renderItem: ({ item: user }) => SignalingUser(user, true),
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
                renderItem: ({ item, index }) =>
                  SignalingUser(item, false, index),
              },
            ]}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </BottomDrawer>
  )
})

Signaling.displayName = "Signaling"

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
