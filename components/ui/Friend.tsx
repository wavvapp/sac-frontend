import CustomText from "@/components/ui/CustomText";
import { Friend } from "@/types";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function FriendCard({ user }: { user: Friend }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => console.log("The user clicked was: ------->", user.id)}>
            <CustomText size="sm">0</CustomText>
            <CustomText size="base">
                {user.name}
            </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {   
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 32,
        gap: 8
    }
})
