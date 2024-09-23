import FriendsList from '@/components/lists/Friends';
import { View } from 'react-native'

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
