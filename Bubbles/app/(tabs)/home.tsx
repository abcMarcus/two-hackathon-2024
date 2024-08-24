import React, { useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Image, Platform, TouchableOpacity  } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Bubble from '@/components/Bubble';
import ChatInput from '@/components/ChatInput';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [isChatVisible, setChatVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState<string[]>([]); // State to save messages

  const handleBubblePress = () => {
    setChatVisible(true);  // Show the chat input when a bubble is clicked
  };
  
  const handleTextChange = (text: string) => {
    const navigation = useNavigation(); 
    setMessage(text);  // Update the message state as user types
  };

  const handleSend = () => {
    // Save the message and hide the chat input
    console.log('Message sent:', message);
    setSavedMessages((prevMessages) => [...prevMessages, message]);
    setMessage('');
    setChatVisible(false);
    Keyboard.dismiss(); // Dismiss keyboard
  };

  const handleOutsidePress = () => {
    setChatVisible(false); // Hide chat input
    setMessage(''); // Clear message input
    Keyboard.dismiss(); // Dismiss keyboard
  };
  return (

    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.greeting}>
          Hello,
        </ThemedText>
        <ThemedText type="title" style={styles.username}>
          username!
        </ThemedText>

        {/* Static bubbles */}
        <Bubble style={{ top: 30, left: 48 }} onPress={handleBubblePress} />
        <Bubble style={{ top: 0, left: 200 }} onPress={handleBubblePress} />
        <Bubble style={{ top: 0, left: 65 }} onPress={handleBubblePress} />

        {/* Chat input */}
        <ChatInput
          visible={isChatVisible}
          onChangeText={handleTextChange}
          value={message}
          onSend={handleSend}
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 50,
    position: 'relative', // Ensure proper positioning of children
  },
  greeting: {
    fontStyle: 'normal',
    paddingLeft: 20,
  },
  username: {
    fontStyle: 'italic',
    paddingLeft: 20,
  },
});
