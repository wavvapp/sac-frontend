import UserAvailability from '@/components/UserAvailability';
import { Text, View } from "react-native";
import Status from '@/components/cards/Status';
import Badge from '@/components/ui/Badge';
import UserAvatar from '@/components/ui/UserAvatar';

export default function EditSignal() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Text>Edit Signal</Text>
      <UserAvatar
        imageUrl={require("@/assets/images/adaptive-icon.png")}
        size="large"
      />
      <UserAvatar imageUrl={require("@/assets/images/adaptive-icon.png")} />
      <Badge variant="outline" name="Evening" />
      <Badge name="12" />
      <UserAvailability />
      <Status timeSlots={["NOW", "MORNING", "Lunch", "AFTERNOON", "EVENING"]} />
    </View>
  );
}
