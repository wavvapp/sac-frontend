import { User } from "@/types"
import QRCode from "react-native-qrcode-svg"

const WAVV_APP_WEBSITE = "https://wavvapp.com"
export default function InviteFriendQRCode({
  user,
  size = 200,
}: {
  user: User
  size?: number
}) {
  const addFriendDeepLink = () => {
    return `${WAVV_APP_WEBSITE}/open?screen=Home&userId=${user.id}&username=${user.username}&names=${user.names}`
  }

  return <QRCode size={size} value={addFriendDeepLink()} />
}
