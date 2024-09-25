import CustomText from "@/components/ui/CustomText";
import { Friend } from "@/types";
import { StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from "@/components/ui/CheckBox";

export default function FriendCard(
    {
        user,
        handleChange
    }: {
        user: Friend,
        handleChange: (arg1: number) => void
    }) {
    return ( 
        <TouchableOpacity style={styles.container} onPress={() => handleChange(user.id)}>
            <CheckBox isChecked={user.selected} />
            <CustomText size="base" style={styles.text}>
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
    },
    text: {
        textTransform: "capitalize"
    }
})
