import { forwardRef } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import CustomText from "@/components/ui/CustomText"
import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "@/components/ui/Button"
import { theme } from "@/theme"
import SignalingUser from "@/components/SignalingUser"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import { useFriends } from "@/hooks/useFriends"

export interface SignalingRef {
  openBottomSheet: () => void
}

type SearchProp = NativeStackNavigationProp<RootStackParamList, "Search">

const Signaling = forwardRef<SignalingRef>((_, ref) => {
  const navigation = useNavigation<SearchProp>()
  const { availableFriends, offlineFriends } = useFriends()

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
          onPress={() => {
            navigation.navigate("Search")
          }}
        />
      </View>
      {!availableFriends.length && (
        <CustomText style={styles.noUsers}>
          None of your friends on Wavv are available today
        </CustomText>
      )}
      {!!availableFriends.length && (
        <View style={styles.onlineSection}>
          <FlatList
            data={availableFriends}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item, index }) => (
              <SignalingUser
                user={item}
                online
                isLast={index === availableFriends.length - 1}
                isFirst={index === 0}
              />
            )}
          />
        </View>
      )}
      {!!offlineFriends.length && (
        <View style={[styles.offlineSection]}>
          <FlatList
            data={offlineFriends}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item, index }) => (
              <SignalingUser
                user={item}
                online={false}
                isLast={index === offlineFriends.length - 1}
                isFirst={index === 0}
              />
            )}
          />
        </View>
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
  onlineSection: {},
  offlineSection: {
    backgroundColor: theme.colors.black_100,
    flex: 1,
  },
})

Signaling.displayName = "Signaling"

export default Signaling
