import FriendsList from '@/components/lists/Friends';
import Status from '@/components/cards/Status';
import Badge from '@/components/ui/Badge';
import UserAvatar from '@/components/ui/UserAvatar';
import { View } from 'react-native'
import UserAvailability from '@/components/UserAvailability';

export default function EditSignal() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 12
      }}
    >
      <UserAvatar
        imageUrl={require("@/assets/images/adaptive-icon.png")}
        size="large"
      />
      <FriendsList />
      <UserAvatar imageUrl={require("@/assets/images/adaptive-icon.png")} />
      <Badge variant="outline" name="Evening" />
      <Badge name="12" />
      <UserAvailability />
      <Status timeSlots={["NOW", "MORNING", "Lunch", "AFTERNOON", "EVENING"]} />
    </View>
  );
}
