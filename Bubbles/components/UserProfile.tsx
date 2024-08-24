import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../types'; // Import your User type

type UserProfileProps = {
  user: User;
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      {user.email && <Text style={styles.email}>{user.email}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});

export default UserProfile;
