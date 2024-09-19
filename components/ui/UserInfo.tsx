import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

interface UserInfoProps {
  name: string;
  time: string;
  activity: string;
}

export default function UserInfo({ name, time, activity }: UserInfoProps) {
  console.log("name, time, activity", name, time, activity);
  return (
    <View style={styles.container}>
      <CustomText size="xl" style={styles.nameContainer}>
        {name}
      </CustomText>
      <View style={styles.badgeContainer}>
        <CustomText size="sm">{activity}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  nameContainer: {
    textTransform: "uppercase",
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 20,
  },
});
