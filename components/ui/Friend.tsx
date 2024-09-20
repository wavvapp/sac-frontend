import CustomText from "@/components/ui/CustomText";
import { StyleSheet } from "react-native";

export default function FriendCard({ name, active }: { name: string, active: boolean }) {
    return (
        <CustomText style={styles.container}>{name}</CustomText>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: "#bada55"
    }
})
