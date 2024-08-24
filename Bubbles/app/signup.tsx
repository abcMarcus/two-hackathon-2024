import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import styles from '../assets/stylesheet';
import { useNavigation } from 'expo-router';


export default function SignUp () {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleBack = () => {
      navigation.navigate('welcome');
  };
  const handleContinue = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // Here you would typically call an API to register the user
    console.log('Sign up with:', { username, email, password });
    Alert.alert('Success', 'Account created successfully!');
    // Reset form or navigate to another screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome_title}>Sign Up</Text>
      
      <Input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Input
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        // errorStyle={{ color: 'red' }}
        // errorMessage='ENTER A VALID ERROR HERE'
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
