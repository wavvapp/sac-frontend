import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"

import { theme } from "@/theme"
import { Friend } from "@/types"
import { FC } from "react"

const SignalingHeader: FC<{ availableFriends: Friend[] }> = ({
  availableFriends,
}) => {
  return (
    <View style={styles.header}>
      <CustomText size="lg" fontWeight="semibold" style={styles.headerText}>
        Friends
      </CustomText>
      {!availableFriends.length && (
        <CustomText style={styles.noUsers}>
          None of your friends wavv'd yet :(
        </CustomText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
  },
  headerText: {
    fontSize: 20,
    lineHeight: 28,
  },
  noUsers: {
    marginVertical: 10,
  },
})

export default SignalingHeader
