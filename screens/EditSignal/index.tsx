import UserAvailability from '@/components/UserAvailability';
import { Text, View } from 'react-native'

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
      <UserAvailability/>
    </View>
  );
}
