import CustomText from "@/components/ui/CustomText";
import { StyleSheet, View } from "react-native";

export default function FriendCard({ name, active }: { name: string, active: boolean }) {
    return (
        <View style={styles.container}>
            <CustomText size="sm">0</CustomText>
            <CustomText size="base">
                {name}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {   
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32,
        gap: 8
    }
})
