import React, { useEffect, useState } from 'react';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCookie = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(`cookie_${name}`);
    return value;
  } catch (e) {
    console.error('Failed to get cookie', e);
    return null;
  }
};

export default function Index() {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('checking for cookie');
    const checkUsername = async () => {
      const storedUsername = await getCookie('username');
      setUsername(storedUsername);
      setIsLoading(false);
      console.log(storedUsername);
      if (storedUsername) {
        router.push({
          pathname: '/home',
          params: { username: storedUsername }
        });
      }
    };

    checkUsername();
  }, []);

  if (isLoading) {
    // You might want to return a loading indicator here
    return null;
  }

  if (!username) {
    return <Redirect href="/welcome" />;
  }

  return null;
}