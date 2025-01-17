import AlertDialog from "@/components/AlertDialog"
import CustomText from "@/components/ui/CustomText"
import { APP_LINK } from "@/constants/links"
import { Share, View } from "react-native"

export const onShare = (username: string = "me") => {
  Share.share({
    message: `Hey! Join ${username} using Wavv and keep up to date with things they do! Download the app here: ${APP_LINK}`,
  })
}

const Component = () => {
  return (
    <View>
      <CustomText
        size="lg"
        fontWeight="semibold"
        style={{
          fontSize: 40,
          lineHeight: 56,
        }}>
        964 021
      </CustomText>
      <CustomText size="base" style={{ textAlign: "center" }}>
        Tap to copy
      </CustomText>
    </View>
  )
}

export const openShareDialog = () => {
  AlertDialog.open({
    title: "Share this invite code with your friend",
    description: <Component />,
    variant: "confirm",
    confirmText: "Share",
    cancelText: "cancel",
    onConfirm: () => onShare("Some other name"),
  })
}
