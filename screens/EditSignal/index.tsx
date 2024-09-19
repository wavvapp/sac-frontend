import Badge from '@/components/Badge';
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
    </View>
  );
}
