import React, { useEffect, useState, useRef } from 'react';
import { View, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
//import socket from '@/hooks/socket'; // import your socket instance
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedText } from '@/components/ThemedText';
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://10.17.67.160:38433';

const ChatScreen = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { userId, userName } = useLocalSearchParams();
  const socket = useRef(io(SOCKET_URL)).current;

  useEffect(() => {
    // Listen for keyboard show and hide events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    //fetchMessages();

    socket.on('connected', () => {
      console.log('Connected to socket server');
    });

    socket.on('message', (data: { sender: string; text: string }) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    // Clean up listeners on unmount
    return () => {
      socket.disconnect();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${SOCKET_URL}/api/messages?userId=${userId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { target_username: userName, message });
      setMessage('');
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0} // Adjust this value if needed
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <ThemedText>{item}</ThemedText>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={[styles.inputContainer, keyboardVisible && styles.inputContainerWithKeyboard]}>
        <ThemedTextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          style={styles.input}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 10,
  },
  inputContainerWithKeyboard: {
    // Additional styling when the keyboard is visible (optional)
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    padding: 8,
    opacity: 0.8,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default ChatScreen;
