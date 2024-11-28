import { APP_LINK } from "@/constants/links"
import { Share } from "react-native"

export const onShare = async (username?: string) => {
  Share.share({
    message: `Hey! Join ${username} using Wavv and keep up to date with things they do! Download the app here: ${APP_LINK}`,
  })
}
