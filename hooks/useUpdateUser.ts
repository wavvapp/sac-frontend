import { useUpdateUserInfo } from "@/queries/user"
import { useRef, useState } from "react"
import { TextInput } from "react-native"

export default function useUpdateUser() {
  const [editUserInfo, setEditUserInfo] = useState(false)
  const namesInputRef = useRef<TextInput>(null)
  const updateUser = useUpdateUserInfo()

  const updateUserInfo = (newNames: string) => {
    updateUser.mutate({ names: newNames })
    setEditUserInfo(false)
  }
  const toggleEditInfoModal = () => {
    setEditUserInfo(!editUserInfo)
  }

  return { editUserInfo, updateUserInfo, toggleEditInfoModal, namesInputRef }
}
