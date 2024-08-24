import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Image, Platform, TouchableOpacity  } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Bubble from '@/components/Bubble';
import ChatInput from '@/components/ChatInput';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const API_BASE_URL = 'https://sydneyhome.ddns.net';
const LOCATION_UPDATE_INTERVAL = 60 * 1000; // 1 minutes in milliseconds



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

interface NearbyUser {
  username: string;
  distance: number;
}



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
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const locationUpdateTimer = useRef<NodeJS.Timeout | null>(null);
  const { username } = useLocalSearchParams();
  console.log(username);

  const fetchStoredUsername = useCallback(async () => {
    const stored = await getCookie('username');
    if (stored) {
      setStoredUsername(stored);
      console.log('Fetched stored username:', stored);
    }
  }, []);

  useEffect(() => {
    console.log("hook triggered ");
    const saveUsername = async () => {
      if (username) {
        try {
          const result = await storeCookie('username', username as string);
          if (result) {
            setStoredUsername(username as string);
            console.log('Username saved successfully:', username);
            updateLocation();
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

    // Start periodic location updates
    startLocationUpdates();

    // Cleanup function
    return () => {
      stopLocationUpdates();
    };
  }, [username]);

  useEffect(() => {
    const saveUsername = async () => {
      if (username && username !== storedUsername) {
        try {
          const result = await storeCookie('username', username);
          if (result) {
            setStoredUsername(username);
            console.log('Username saved successfully:', username);
          } else {
            console.error('Failed to save username');
          }
        } catch (error) {
          console.error('Error saving username:', error);
        }
      }
    };

    saveUsername();
  }, [username, storedUsername]);

  const updateLocation = useCallback(async () => {
    const currentStoredUsername = await getCookie('username');
    console.log(`updateLocation, storedUsername: ${currentStoredUsername}`);
    if (!currentStoredUsername) return;

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(`${API_BASE_URL}/api/update_location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: currentStoredUsername,
          latitude,
          longitude,
          ttl: 60, // default TTL of 60 minutes
        }),
      });

      if (response.ok) {
        console.log('Location updated successfully');
        getNearbyUsers(currentStoredUsername);
      } else {
        console.error('Failed to update location');
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  }, []);

  const startLocationUpdates = useCallback(() => {
    console.log('start location update');
    if (locationUpdateTimer.current) {
      clearInterval(locationUpdateTimer.current);
    }
    updateLocation(); // Immediate update
    locationUpdateTimer.current = setInterval(updateLocation, LOCATION_UPDATE_INTERVAL);
  }, [updateLocation]);

  const stopLocationUpdates = useCallback(() => {
    if (locationUpdateTimer.current) {
      clearInterval(locationUpdateTimer.current);
    }
  }, []);

  useEffect(() => {
    if (storedUsername) {
      startLocationUpdates();
    }
    return () => stopLocationUpdates();
  }, [storedUsername, startLocationUpdates, stopLocationUpdates]);

  const getNearbyUsers = async (currentUsername: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getnearby?username=${currentUsername}&distance_km=1.0`);
      
      if (response.ok) {
        const data = await response.json();
        setNearbyUsers(data.nearby_users);
        console.log('Nearby users:', data.nearby_users);
      } else {
        console.error('Failed to get nearby users');
      }
    } catch (error) {
      console.error('Error getting nearby users:', error);
    }
  };


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

        {nearbyUsers.map((user, index) => (
          <Bubble 
            key={index}
            style={{ top: 30 + index * 60, left: 48 + index * 30 }} 
            onPress={handleBubblePress}
            label={user.username}
          />
        ))}
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