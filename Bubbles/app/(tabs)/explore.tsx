import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/160' }} // Placeholder image URL
        style={styles.profileImage}
      />
      <Text style={styles.name}>John Doe</Text>
      <View style={styles.detailsContainer}>
        
        <Text style={styles.city}>
          New York City placeholderText
        </Text>
        <Text style={styles.connections}>
          150 <Text style={styles.label}>connections</Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 110, // Adjust the padding to position the profile picture near the top
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80, // Circular frame
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  connections: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5, // Space between connections and city
  },
  city: {
    fontSize: 16,
    color: '#555',
    flexWrap: 'wrap', // Allow text to wrap
    textAlign: 'center', // Center the text horizontally
    marginBottom: 5, // Space between connections and city
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#777',
  },
});


