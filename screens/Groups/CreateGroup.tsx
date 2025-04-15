import { useNavigation } from "@react-navigation/native"
import { useCreateGroup } from "@/queries/groups"
import { RootStackParamList } from "@/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { GroupForm } from "@/components/GroupForm"

export type CreateGroupScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "CreateGroup"
>

export default function CreateGroup() {
  const navigation = useNavigation<CreateGroupScreenProps>()
  const { mutate } = useCreateGroup()

  const onSaveGroup = (groupName: string, friendIds: string[]) => {
    mutate({ friendIds, name: groupName })
    navigation.goBack()
  }

  return (
    <GroupForm onSave={onSaveGroup} initialGroupName="" initialFriendIds={[]} />
  )
}
