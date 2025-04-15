import { Share } from "react-native"

export const onShare = (username: string = "me") => {
  Share.share({
    message: `I'm on Wavv—let's hang. My username is: @${username}. Download the app: https://www.wavvapp.com/#download`,
  })
}
