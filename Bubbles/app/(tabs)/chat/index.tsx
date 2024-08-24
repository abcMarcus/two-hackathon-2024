import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { User } from '../types';

const users: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    { id: 5, name: 'Charlie White' },
    // Add more users here
    ];

export default function ChatListScreen() {
  const navigation = useNavigation();

  const handleNamePress = (user: User) => {
    navigation.navigate('chat/[id]', { userId: user.id, userName: user.name });
  };

  return (
    <View style={styles.container}>
      {users.map((user) => (
        <TouchableOpacity 
          key={user.id} 
          onPress={() => handleNamePress(user)} // Handle press using handleNamePress
          style={styles.chatItem} // Apply styles directly to TouchableOpacity
        >
          <ThemedText type="subtitle">{user.name}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  chatItem: {
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
