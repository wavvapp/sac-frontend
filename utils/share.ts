import { Share } from "react-native"

export const onShare = (
  username: string = "me",
  inviteCode: string = "000 000",
) => {
  Share.share({
    message: `I'm on Wavv—let's hang. ${inviteCode} is the code. My username is: @${username}. Download the app: https://www.wavvapp.com/#download`,
  })
}
