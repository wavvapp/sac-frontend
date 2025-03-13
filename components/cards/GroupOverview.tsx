import CustomText from "@/components/ui/CustomText"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import ChevronRightIcon from "@/components/vectors/ChevronRightIcon"
import { theme } from "@/theme"

export default function GroupOverview({
  name,
  members,
  id,
}: {
  name: string
  members: number
  id: string
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View style={{ flex: 1 }}>
        <CustomText fontWeight="semibold">{name}</CustomText>
        <CustomText fontFamily="writer-monov" style={styles.members}>
          {members} members
        </CustomText>
      </View>
      <ChevronRightIcon />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  members: {
    color: theme.colors.black,
    opacity: 0.5,
  },
})
