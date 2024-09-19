import { StyleSheet, View, ViewProps } from "react-native";
import CustomText from "@/components/ui/CustomText";
import Badge from "@/components/ui/Badge";

interface UserInfoProps extends ViewProps {
  name: string;
  time: string;
  activity: string;
}

export default function UserInfo({
  name,
  time,
  activity,
  style,
  ...rest
}: UserInfoProps) {
  return (
    <View style={(styles.container, style)} {...rest}>
      <CustomText size="lg" style={styles.nameContainer} fontWeight="medium">
        {name}
      </CustomText>
      <View style={styles.detailsContainer}>
        <Badge name={time} variant="outline" />
        <CustomText size="sm">{activity}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  nameContainer: {
    textTransform: "uppercase",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
});
