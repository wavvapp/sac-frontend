import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { TouchableOpacity } from "react-native-gesture-handler"
import SearchIcon from "@/components/vectors/SearchIcon"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import { FC } from "react"
import { theme } from "@/theme"
type SearchProp = NativeStackNavigationProp<RootStackParamList, "Search">

type SignalingHeaderProps = {
  refetchFriendsData: () => void
}
const SignalingHeader: FC<SignalingHeaderProps> = ({ refetchFriendsData }) => {
  const navigation = useNavigation<SearchProp>()
  const openSearch = () => {
    refetchFriendsData()
    navigation.navigate("Search")
  }

  return (
    <View style={styles.header}>
      <CustomText size="lg" fontWeight="semibold" style={styles.headerText}>
        Friends
      </CustomText>
      <TouchableOpacity style={styles.SearchIcon} onPress={() => openSearch()}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
  },
  headerText: {
    fontSize: 20,
    lineHeight: 28,
  },
  SearchIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default SignalingHeader
