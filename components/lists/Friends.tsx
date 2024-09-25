import { FlatList, FlatListComponent, StyleSheet, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import FriendCard from "@/components/Friend";
import { useState } from "react";
import { visibleFriends } from "@/data/friends";

export default function FriendsList() {
    const [friendsList, setfriendsList] = useState(visibleFriends)
    const updateFriendsList = (userId: string) => {
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