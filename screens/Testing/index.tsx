import CustomText from "@/components/ui/CustomText";
import Input from "@/components/ui/Input";
import { VALIDATION_PATTERNS } from "@/constants/patterns";
import { theme } from "@/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function TestingScreen() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setValidEmail(VALIDATION_PATTERNS.email.test(text));
  };
  return (
    <View style={styles.container}>
      <View style={styles.primaryContainer}>
        <Input
          value={phoneNumber}
          placeholder="primary"
          textSize="sm"
          keyboardType="numeric"
          handleTextChange={(text) => setPhoneNumber(text)}
        />
      </View>
      <View style={styles.secondaryContainer}>
        <Input
          keyboardType="email-address"
          placeholder="secondary"
          variant="secondary"
          value={email}
          handleTextChange={handleEmailChange}
        />
        {!validEmail && email !== "" && (
          <CustomText style={styles.invalidMessage} size="sm">
            Invalid email
          </CustomText>
        )}
      </View>
      <View style={styles.primaryContainer}>
        <Input
          keyboardType="email-address"
          placeholder="Available"
          variant="ghost"
          textSize="lg"
          value={activity}
          handleTextChange={(text) => setActivity(text)}
        />
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
    backgroundColor: theme.colors.black,
    padding: 10,
  },
  invalidMessage: {
    color: theme.colors.white_500,
  },
});
