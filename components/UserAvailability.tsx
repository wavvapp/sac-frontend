import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import EditIcon from "@/components/vectors/EditIcon";
import { theme } from "@/theme";

export default function UserAvailability() {
  return (
    <View style={styles.container}>
      <CustomText size="sm" fontWeight="medium" style={styles.signalText}>
        Signal
      </CustomText>
      <View style={styles.availableContainer}>
        <CustomText size="xl">Available</CustomText>
        <TouchableOpacity onPress={() => ""}>
          <EditIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    width: "100%",
    paddingLeft: 12,
    paddingRight: 21,
    paddingVertical: 5,
    backgroundColor: theme.colors.white,
  },
  signalText: {
    lineHeight: 17,
    letterSpacing: -1,
    textTransform: "uppercase",
  },
  availableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
