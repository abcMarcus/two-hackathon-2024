import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Image, Platform, TouchableOpacity  } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Bubble from '@/components/Bubble';
import ChatInput from '@/components/ChatInput';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storeCookie = async (name: string, value: string) => {
  try {
    await AsyncStorage.setItem(`cookie_${name}`, value);
    console.log("successful!");
    return true;
  } catch (e) {
    console.error('Failed to save cookie', e);
    return false;
  }
};

const getCookie = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(`cookie_${name}`);
    return value;
  } catch (e) {
    console.error('Failed to get cookie', e);
  }
};

export default function HomeScreen() {
  const [isChatVisible, setChatVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState<string[]>([]); // State to save messages
  const [storedUsername, setStoredUsername] = useState<string | null>(null);

  const { username } = useLocalSearchParams();
  console.log(username);
  useEffect(() => {
    const saveUsername = async () => {
      if (username) {
        try {
          const result = await storeCookie('username', username as string);
          if (result) {
            setStoredUsername(username as string);
            console.log('Username saved successfully:', username);
          } else {
            console.error('Failed to save username');
          }
        } catch (error) {
          console.error('Error saving username:', error);
        }
      } else {
        console.warn('Username is not available');
      }
    };
  
    saveUsername();
  }, [username]);
  
  const handleBubblePress = () => {
    setChatVisible(true);  // Show the chat input when a bubble is clicked
  };
  
  const handleTextChange = (text: string) => {
    //const navigation = useNavigation(); 
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
          {storedUsername || 'Guest'}!
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
