import { APP_LINK } from "@/constants/links"
import { Share } from "react-native"

export const onShare = async () => {
  Share.share({
    message: `Hey! Join me using Wavv and keep up to date with things I do! Download the app here: ${APP_LINK}`,
  })
}
