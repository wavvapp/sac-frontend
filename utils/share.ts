import { Share } from "react-native"

export const onShare = (
  username: string = "me",
  inviteCode: string = "000 000",
) => {
  Share.share({
    message: `Hey! Join me using Wavv and keep up to date with things I do!
Use my invite code ${inviteCode} to sign up and connect with me. You can find me as: ${username}  once you’re in!`,
  })
}
