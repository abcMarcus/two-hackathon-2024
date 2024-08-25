// // app/Chat.tsx
// // import React, { useEffect, useState } from 'react';
// // import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// // import socket from '@/hooks/socket'; // import your socket instance

// // const ChatScreen = () => {
// //   const [messages, setMessages] = useState<string[]>([]);
// //   const [message, setMessage] = useState('');

// //   useEffect(() => {
// //     // listen for incoming messages
// //     socket.on('message', (newMessage: string) => {
// //       setMessages((prevMessages) => [...prevMessages, newMessage]);
// //     });

// //     // clean up the listener on unmount
// //     return () => {
// //       socket.off('message');
// //     };
// //   }, []);

// //   const sendMessage = () => {
// //     if (message.trim()) {
// //       socket.emit('message', message);
// //       setMessage('');
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={messages}
// //         renderItem={({ item }) => (
// //           <View style={styles.messageContainer}>
// //             <Text>{item}</Text>
// //           </View>
// //         )}
// //         keyExtractor={(item, index) => index.toString()}
// //       />
// //       <TextInput
// //         value={message}
// //         onChangeText={setMessage}
// //         placeholder="Type a message"
// //         style={styles.input}
// //       />
// //       <Button title="Send" onPress={sendMessage} />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //   },
// //   input: {
// //     borderBottomWidth: 1,
// //     marginBottom: 16,
// //   },
// //   messageContainer: {
// //     padding: 10,
// //     borderBottomWidth: 1,
// //   },
// // });

// // export default ChatScreen;
// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// import socket from '@/hooks/socket'; // import your socket instance
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const ChatScreen = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [message, setMessage] = useState('');
//   const [username, setUsername] = useState<string | null>(null);

//   // Function to retrieve username from AsyncStorage
//   const retrieveUsername = async () => {
//     try {
//       const storedUsername = await AsyncStorage.getItem('username');
//       if (storedUsername !== null) {
//         console.log('Retrieved username:', storedUsername);
//         setUsername(storedUsername);
//       }
//     } catch (error) {
//       console.error('Failed to retrieve username:', error);
//     }
//   };


//   useEffect(() => {
//     retrieveUsername();
    
//     socket.connect();

//     socket.on('connect', () => {
//       console.log('Connected to Socket.IO server with ID:', socket.id);
//     });

//     // Listen for incoming messages
//     socket.on('message', (newMessage: string) => {
//       console.log("setMessages() was run")
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the listener on unmount
//     return () => {
//       console.log("socket.off() was run");
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.connect();

//       // socket.on('connect', () => {
//       //   console.log('Connected to Socket.IO server with ID:', socket.id);
//       // });


//       console.log(username);
//       console.log(message);
      
//       socket.emit('message', {
//         'source_username': username,
//         'target_username':'jonathan',
//         'message':message});
//       setMessage('');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View style={styles.messageContainer}>
//             <Text>{item}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//       <TextInput
//         value={message}
//         onChangeText={setMessage}
//         placeholder="Type a message"
//         style={styles.input}
//       />
//       <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   input: {
//     borderBottomWidth: 1,
//     marginBottom: 16,
//   },
//   messageContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//   },
// });

// export default ChatScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '@/hooks/socket'; // import your socket instance

const ChatScreen = () => {
  const [messages, setMessages] = useState<{ source_username: string; message: string }[]>([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState<string | null>(null);

  // Function to retrieve username from AsyncStorage
  const retrieveUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        console.log('Retrieved username:', storedUsername);
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error('Failed to retrieve username:', error);
    }
  };

  // Function to log the entire conversation history
  const logConversationHistory = () => {
    console.log('Conversation History:', messages);
  };

  useEffect(() => {
    retrieveUsername();
    socket.connect();

    socket.emit('setname', username);

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server with ID:', socket.id);
    });

    // Listen for incoming messages
    socket.on('message_received', (newMessage: { source_username: string; target_username: string; message: string }) => {
      console.log("setMessages() was run");
      // Only add the message if the target_username matches the local username
      if (username && newMessage.target_username === username) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          // Log the entire conversation history whenever a new message is received
          logConversationHistory();
          return updatedMessages;
        });
      }
    });

    // Clean up the listener on unmount
    return () => {
      console.log("socket.off() was run");
      socket.off('message');
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim() && username) {
      console.log(username);
      console.log(message);
      socket.emit('message', {
        source_username: username,
        target_username: 'targeted', // Replace with the actual target username
        message: message,
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>{`${item.source_username}: ${item.message}`}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default ChatScreen;
