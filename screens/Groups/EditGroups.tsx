import { RootStackParamList } from "@/navigation"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text, StyleSheet } from "react-native"
type EditGroupsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditGroups"
>
const EditGroups: React.FC<EditGroupsScreenProps> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Groups</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default EditGroups
