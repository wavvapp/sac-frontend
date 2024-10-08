import { StyleSheet, View, ViewProps } from "react-native";
import CustomText from "@/components/ui/CustomText";
import Badge from "@/components/ui/Badge";
import { theme } from "@/theme";

interface UserInfoProps extends ViewProps {
  firstName: string;
  lastName: string;
  username: string;
}

export default function UserInfo({
  firstName,
  lastName,
  username,
  style,
  ...rest
}: UserInfoProps) {
  return (
    <View style={(styles.container, style)} {...rest}>
      <CustomText size="lg" style={styles.nameContainer} fontWeight="semibold">
        {`${firstName} ${lastName}`}
      </CustomText>
      <CustomText size="sm" style={styles.usernameContainer}>
        {username}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: "row",
  },
  nameContainer: {
    fontSize: 15,
    lineHeight: 20,
  },
  usernameContainer: {
    fontSize: 15,
    lineHeight: 20,
    color: "#00000080",
    opacity: 50,
  },
});
