import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import { Input } from '@rneui/themed';
import styles from '../assets/stylesheet';
import { router, useRouter } from 'expo-router';

const handleLogin = async (username: string, password: string) => {
  // Here you would typically make an API call to authenticate the user
  // For now, we'll just simulate a successful login
    try {
        console.log('tryin');
        const response = await fetch(`http://sydneyhome.ddns.net:38433/api/verify_login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        // Assuming the API returns some user data on successful login
        const userInfoJSON = JSON.stringify(data);
        router.push({
            pathname: '/home',
            params: { username }
        });
    } else {
        // If response is not ok, throw an error to be caught in the catch block
        throw new Error('Login failed');
    }
    } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
    }
};

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const updateUsername = (newUsername: string) => {
    setUsernameError('');
    setUsername(newUsername);
  };

  const updatePassword = (newPassword: string) => {
    setPasswordError('');
    setPassword(newPassword);
  };

  const handleBack = () => {
    router.push("/welcome");
  };

  const checkValidity = async () => {
    if (username.length < 1) {
      setUsernameError('Username cannot be empty');
      return;
    }
    if (password.length < 1) {
      setPasswordError('Password cannot be empty');
      return;
    }
    
    if (true) {
        await handleLogin(username, password);
    } else {
        Alert.alert('Failed', 'Wrong credentials');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>

      <Text style={styles.welcome_title}>Login</Text>

      <Input
        style={styles.input}
        placeholder="Username"
        value={username}
        errorStyle={{ color: '#f33958' }}
        errorMessage={usernameError}
        onChangeText={updateUsername}
        autoCapitalize="none"
      />

      <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={updatePassword}
        errorStyle={{ color: '#f33958' }}
        errorMessage={passwordError}
        secureTextEntry
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={handleBack}>
          <Text style={[styles.buttonText, { textAlign: 'left' }]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={checkValidity}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}