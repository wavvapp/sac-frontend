import { Button, Text, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import EditIcon from "@/components/vectors/EditIcon";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation";

type UserAvailabilityProps = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function UserAvailability() {
   const navigation = useNavigation<UserAvailabilityProps>();
  return (
    <View style={{ gap: 15, width: "100%", paddingLeft: 12, paddingRight: 21, backgroundColor: "#FFFFFF" }}>
      <CustomText
        size="sm"
        fontWeight="medium"
        style={{ lineHeight: 17, letterSpacing: -1 }}
      >
        Signal
      </CustomText>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomText size="xl">Available</CustomText>
        <TouchableOpacity onPress={()=> navigation.push('EditSignal')}>
          <EditIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
