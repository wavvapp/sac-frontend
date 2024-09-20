import Badge from '@/components/Badge';
import FriendsList from '@/components/lists/Friends';
import UserAvatar from '@/components/ui/UserAvatar';
import { Text, View } from 'react-native'

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
      <FriendsList />
    </View>
  );
}
