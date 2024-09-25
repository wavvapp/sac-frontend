import UserAvailability from '@/components/UserAvailability';
import { View } from "react-native";
import Status from '@/components/cards/Status';
import { CustomButton } from '@/components/ui/Button';
import UserAvatar from '@/components/ui/UserAvatar';
import CrossMark from '@/components/vectors/CrossMark';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FriendsList from '@/components/lists/Friends';

type EditSignalScrenProps= NativeStackNavigationProp<RootStackParamList, "EditSignal">;

export default function EditSignal() {
  const navigation = useNavigation<EditSignalScrenProps>();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 44,
      }}
    >
      <View style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 15
      }}>
        <CrossMark onPress={() => navigation.push("Home")}/>
        <CustomButton variant='primary' title='Done' textSize='sm' />
      </View>
      <UserAvatar
        imageUrl={require("@/assets/images/user-avatar.png")}
        size="large"
      />
      <UserAvailability />
      <Status timeSlots={['NOW', 'MORNING', 'Lunch', 'AFTERNOON', 'EVENING']} />
      <FriendsList />
    </View>
  );
}
