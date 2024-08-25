import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import styles from '../assets/stylesheet';
import { useNavigation, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp () {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [validSignUp, setValidSignUp] = useState('false');

  const updateUsername = (newUsername: string) =>  {
    const maxLength = 20;
    if (newUsername.length < maxLength) {
      setUsernameError('');
      setUsername(newUsername);
    } else {
      setUsernameError(`Username cannot be longer than ${maxLength} characters.`);
    }
  }

  const updatePassword = (newPassword: string) => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;
    const minPasswordLength = 8;
    if (newPassword.length < minPasswordLength) {
      setPasswordError(`Password must be atleast ${minPasswordLength} long.`);
    } else if (!capitalLetterRegex.test(newPassword) || !specialCharacterRegex.test(newPassword) || !numberRegex.test(newPassword)) {
      setPasswordError('Password must contain at least one capital letter, one special character, and one number.');
    } else {
      setPasswordError('');
    }
    setPassword(newPassword);
  }

  const updateConfirmPassword = (confirmPassword: string) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("error: password does not match!");
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(confirmPassword);
  }

  const handleBack = () => {
      router.push("/welcome");
  };
  const handleContinue = async () => {
    if (password !== confirmPassword || username.length < 1 || 
        passwordError != '' || confirmPasswordError != '' || usernameError != ''
    ) {
      Alert.alert('Failed', 'Something went wrong, please try again');
      console.log("failed signup");
      return;
    }

    try {
      await AsyncStorage.setItem('username', username);
      console.log('Username saved:', username);

      // Here you would typically call an API to register the user
      console.log('Sign up with:', { username, email, password });
      Alert.alert('Success', 'Account created successfully!');
      router.push({
        pathname: '/(tabs)/home', 
        params: {username, email, password}
      });
    } catch (error) {
      console.error('Failed to save username:', error);
    }

    // Reset form or navigate to another screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome_title}>Sign Up</Text>
      
      <Input
        style={styles.input}
        placeholder="Username"
        value={username}
        errorStyle={{ color: '#f33958' }}
        errorMessage = { usernameError }
        onChangeText={updateUsername}
        autoCapitalize="none"
      />
      
      <Input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={updatePassword}
        errorStyle={{ color: '#f33958' }}
        errorMessage= {passwordError}
        secureTextEntry
      />
      
      <Input
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={updateConfirmPassword}
        errorStyle={{ color: '#f33958' }}
        errorMessage= { confirmPasswordError }
        secureTextEntry
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={handleBack}>
          <Text style={[styles.buttonText, {textAlign: 'left'}]}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
