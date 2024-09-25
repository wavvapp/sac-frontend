import { FlatList, FlatListComponent, StyleSheet, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import FriendCard from "@/components/Friend";
import { mockFriendsList } from "@/data/friends";
import { useState } from "react";

export default function FriendsList() {
    const [friendsList, setfriendsList] = useState(mockFriendsList)
    const updateFriendsList = (userId: number) => {
        setfriendsList(prevList =>
            prevList.map(user =>
                user.id === userId ? { ...user, selected: !user.selected } : user
            )
        );
    };
    return (
        <View style={styles.container}>
            <CustomText size="sm" fontWeight="medium">Who can see</CustomText>
            <FlatList
                data={friendsList}
                renderItem={({ item }) => <FriendCard handleChange={() => updateFriendsList(item.id)} user={item} />}
                keyExtractor={(item) => item.id.toString()}
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