import { FlatList, FlatListComponent, StyleSheet, View } from "react-native";
import CustomText from "../ui/CustomText";
import { theme } from "@/theme";
import FriendCard from "../ui/Friend";
import { mockFriendsList } from "@/data/friends";

export default function FriendsList() {
    return (
        <View style={styles.container}>
            <CustomText size="sm" fontWeight="medium">Who can see</CustomText>
            <FlatList
                data={mockFriendsList}
                renderItem={({ item }) => <FriendCard name={item.name} active={item.active} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 30,
        width: "100%"
    },
})