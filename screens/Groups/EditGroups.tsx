import { useRoute } from "@react-navigation/native"
import { useUpdateGroup } from "@/queries/groups"
import { RootStackParamList } from "@/navigation"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { GroupForm } from "@/components/GroupForm"

export type EditGroupScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditGroup"
>

export default function EditGroup() {
  const navigation = useNavigation<EditGroupScreenProps>()
  const route = useRoute<RouteProp<RootStackParamList, "EditGroup">>()
  const { groupId, name, friendIds } = route.params
  const { mutate: updateGroup } = useUpdateGroup()

  const onSaveGroup = (groupName: string, friendIds: string[]) => {
    updateGroup({ groupId, name: groupName, friendIds })
    navigation.goBack()
  }

  return (
    <GroupForm
      onSave={onSaveGroup}
      initialGroupName={name}
      initialFriendIds={friendIds}
    />
  )
}
