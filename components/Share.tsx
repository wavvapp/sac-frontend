import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import { theme } from "@/theme";
import ShareIcon from "./vectors/ShareIcon";

export default function Share() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ShareIcon />
      </View>
      <View>
        <CustomText fontWeight="semibold">
          Your friends are not on Wavv?
        </CustomText>
        <TouchableOpacity>
          <CustomText style={styles.inviteButton}>
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
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  inviteButton: {
    color: theme.colors.black_500,
  },
});
