import { StyleSheet, TouchableOpacity, View, Share } from "react-native";
import CustomText from "@/components/ui/CustomText";
import { theme } from "@/theme";
import ShareIcon from "./vectors/ShareIcon";
import { APP_LINK } from "@/constants/Links";

export default function ShareCard() {
  const onShare = async () => {
    Share.share({
      message: `Hey! Join me using Wavv and keep up to date with things I do! Download the app here:${APP_LINK}`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ShareIcon />
      </View>
      <View>
        <CustomText fontWeight="semibold">
          Your friends are not on Wavv?
        </CustomText>
        <TouchableOpacity onPress={onShare}>
          <CustomText style={styles.inviteButtonText}>
            Invite them to join you
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: theme.colors.black_200,
    padding: 12,
  },
  inviteButtonText: {
    color: theme.colors.black_500,
  },
});
