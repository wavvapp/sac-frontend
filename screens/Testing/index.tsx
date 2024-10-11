import Share from "@/components/Share";
import { StyleSheet, View } from "react-native";

export default function TestingScreen() {
  return (
    <View style={styles.container}>
      <Share />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 140,
    paddingHorizontal: 20,
    gap: 4,
  },
});
