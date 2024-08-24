import React, { useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Image, Platform, TouchableOpacity, Alert, Dimensions} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Bubble from '@/components/Bubble';
import ChatInput from '@/components/ChatInput';
import { useNavigation } from '@react-navigation/native';

type User = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Brown' },
  { id: 5, name: 'Charlie White' },
  // Add more users here
];


const getBubblePositions = (numBubbles: number) => {
  const { width, height } = Dimensions.get('window');
  const positions = [];
  const radius = 150; // Radius from center where bubbles will be positioned
  const bubbleSize = 100; // Size of each bubble

  for (let i = 0; i < numBubbles; i++) {
    const angle = (i / numBubbles) * 2 * Math.PI; // Full circle angle
    const x = radius * Math.cos(angle); // Center and adjust bubble radius
    const y = radius * Math.sin(angle); // Center and adjust bubble radius
    positions.push({ left: x, top: y });
  }

  return positions;
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const bubblePositions = getBubblePositions(users.length);
  console.log(bubblePositions)

  const handleBubblePress = (user: User) => {
    console.log('home recognises click');
    Alert.alert(
      `Connect with ${user.name}?`,
      'Would you like to connect with this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('chat/[id]', { userId: user.id, userName: user.name }),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableWithoutFeedback>
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.greeting}>
        Hello,
      </ThemedText>
      <ThemedText type="title" style={styles.username}>
        username!
      </ThemedText>


      {users.map((user, index) => (
          <Bubble
          key={user.id}
          style={[
            styles.bubble,
            { top: bubblePositions[index].top, left: bubblePositions[index].left },
            { position: 'absolute' }
          ]}
          onPress={() => handleBubblePress(user)}
        />
        ))}

      <Bubble key={0} 
      style={{ backgroundColor: 'transparent', borderWidth: 0, shadowOpacity: 0 }}
      onPress={() => {}}
      hide={true} /> 
    </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure proper positioning of children
  },
  greeting: {
    fontStyle: 'normal',

  },
  username: {
    fontStyle: 'italic',
  },
  bubble: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightblue', // Ensure visibility
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it is above other components
  },
});
