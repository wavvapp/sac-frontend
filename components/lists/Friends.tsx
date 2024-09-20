import { FlatList, FlatListComponent, StyleSheet, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import FriendCard from "@/components/ui/Friend";
import { mockFriendsList } from "@/data/friends";

export default function FriendsList() {
    return (
        <View style={styles.container}>
            <CustomText size="sm" fontWeight="medium">Who can see</CustomText>
            <FlatList
                data={mockFriendsList}
                renderItem={({ item }) => <FriendCard user={item} />}
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