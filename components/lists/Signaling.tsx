import { forwardRef } from "react"
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
import axios from "axios"
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
  const url = process.env.API_BASE_URL
  console.log(url, "url from the env")
  const fetchAllFreinds = async () => {
    try {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYWNhYWYxLWJhYjYtNGU2Ni1iNTI4LTgyMTMwNTQ0ZjM5MyIsImVtYWlsIjoiaWdvcm50d2FyaTI4QGdtYWlsLmNvbSIsIm5hbWVzIjoiaWdvciIsInBob25lTnVtYmVyIjpudWxsLCJlbWFpbFZlcmlmaWVkIjpmYWxzZSwicHJvdmlkZXIiOiJnb29nbGUiLCJwcm9maWxlUGljdHVyZVVybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tDTUhGMXFPdktudnpRTlhsaXVuTVl4Q0J6aGZPYkZ3b00tSWRDTGtTckpNVDF2cVp5eFE9czk2LWMiLCJpYXQiOjE3MzAzODQ3OTQsImV4cCI6MTczMDM4NTY5NH0.ro_CGiJkQW5X6NNDJmopbQEzRLcH2asojWtvvlHBh9"
      // const accessToken = await AsyncStorage.getItem("@Auth:accessToken")
      // if (!accessToken) {
      //   console.error("Access token not found ")
      //   return
      // }
      const response = await axios.get(
        `${process.env.API_BASE_URL}/friend-signals`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      )
      console.log(response.data, "response from the api")
      // const users = response.data.map((user: any) => ({
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      //   imageUrl: user.profile || "",
      // }))
    } catch (error) {
      console.error("error fetching friends", error)
    }
  }
  fetchAllFreinds()
  // console.log(fetchAllFreinds, "all freinds")
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
            renderItem: ({ item, index }) => SignalingUser(item, false, index),
          },
        ]}
        keyExtractor={(item) => item.id}
      />
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
