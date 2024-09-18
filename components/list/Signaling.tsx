import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface User {
  id: string;
  name: string;
}

interface SignalingProps {
  users?: User[];
}

function Signaling({ users = [] }: SignalingProps) {
  const defaultUsers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];

  const displayUsers = users.length > 0 ? users : defaultUsers;

  return (
    <View style={styles.container}>
      <Text>Friend List</Text>
      <FlatList
        data={displayUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Signaling;
