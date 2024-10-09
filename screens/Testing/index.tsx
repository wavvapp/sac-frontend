import Input from "@/components/ui/Input";
import { validationPatterns } from "@/utils";

import { StyleSheet, View } from "react-native";

export default function TestingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.primaryContainer}>
        <Input placeHolder="primary" />
      </View>
      <View style={styles.secondaryContainer}>
        <Input
          keyboardType="email-address"
          placeHolder="secondary"
          variant="secondary"
          validationPattern={validationPatterns.email}
        />
        vali
      </View>
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
  primaryContainer: {
    padding: 10,
  },
  secondaryContainer: {
    backgroundColor: "#000000",
    padding: 10,
  },
});
