import { CustomButton } from "@/components/ui/Button";
import CirlceAlert from "@/components/vectors/CirlceAlert";
import CloseIcon from "@/components/vectors/CloseIcon";
import { theme } from "@/theme";
import { StyleSheet, View } from "react-native";

export default function TestingScreen() {
  return (
    <View style={styles.container}>
      <CustomButton title="primary button" textSize="lg" variant="primary" />
      <CustomButton
        title="secondary button"
        textSize="lg"
        variant="secondary"
      />
      <CustomButton
        title="secondary full width button"
        textSize="lg"
        variant="secondary"
        fullWidth
      />
      <CustomButton title="outline button" variant="outline" />
      <CustomButton title="destructive button" variant="destructive" />

      <CustomButton title="disabled" variant="primary" disabled />

      <CustomButton disabled variant="primary" title="Username not availabile">
        <CirlceAlert />
      </CustomButton>

      <CustomButton variant="ghost">
        <CloseIcon />
      </CustomButton>

      <View style={styles.container2}>
        <CustomButton variant="ghost">
          <CloseIcon color={theme.colors.black} />
        </CustomButton>

        <CustomButton title="Default" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.black,
    gap: 15,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    padding: 15,
    width: "100%",
  },
});