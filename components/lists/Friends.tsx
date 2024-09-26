import { FlatList, FlatListComponent, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import FriendCard from "@/components/Friend";
import { visibleFriends } from "@/data/friends";
import { useState } from "react";

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
            <SafeAreaView style={{ flex: 1 }}  >
                <FlatList
                    data={friendsList}
                    renderItem={({ item }) => <FriendCard handleChange={() => updateFriendsList(item.id)} user={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 30,
        width: "100%",
        paddingHorizontal: 15,
        height: 400
    },
})