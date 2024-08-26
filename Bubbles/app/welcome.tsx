import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheet';
import { useNavigation } from '@react-navigation/native';


interface WelcomePageProps {
  // You can add any props here if needed
}

export default function WelcomePage() {
  const navigation = useNavigation();
  const handleSignUp = (): void => {
    // Add your sign up logic here
    console.log('Sign Up button pressed');
    navigation.navigate('signup' as never);
  };

  const handleSignIn = (): void => {
    // Add your sign in logic here
    navigation.navigate('login' as never);
    console.log('Sign In button pressed');
  };

  return (
    <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={[styles.welcome_title, {marginBottom: 0}]}>Welcome</Text>
          <Text style={[styles.welcome_title, {fontStyle:'italic'}]}>to Bubbles!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={[styles.buttonText, {backgroundColor:'#F99955'}]}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={[styles.buttonText, {backgroundColor:'#777777'}]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};