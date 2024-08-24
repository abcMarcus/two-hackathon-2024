import React from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';

type ChatInputProps = {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void; // Add onSend handler
};

const ChatInput: React.FC<ChatInputProps> = ({ visible, value, onChangeText, onSend }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend} // Handle "Enter" press
        returnKeyType="send"
        placeholder="Message..."
      />
      {/* Optional: Include a send button */}
      {/* <Button title="Send" onPress={onSend} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    padding: 8,
  },
});

export default ChatInput;