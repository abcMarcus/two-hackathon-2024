import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import styles from '../assets/stylesheet';
import { router, useRouter } from 'expo-router';

const handleContinue = async (username: string, fullname: string, password: string) => {
  const userInfoJSON = JSON.stringify({
    username,
    fullname,
    password
  });
  router.push({
    pathname: '/interests',
    params: { userInfoJSON }
  });
};

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const updateUsername = (newUsername: string) => {
    const maxLength = 20;
    if (newUsername.length < maxLength) {
      setUsernameError('');
      setUsername(newUsername);
    } else {
      setUsernameError(`Username cannot be longer than ${maxLength} characters.`);
    }
  };

  const updatePassword = (newPassword: string) => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;
    const minPasswordLength = 8;
    if (newPassword.length < minPasswordLength) {
      setPasswordError(`Password must be at least ${minPasswordLength} characters long.`);
    } else if (!capitalLetterRegex.test(newPassword) || !specialCharacterRegex.test(newPassword) || !numberRegex.test(newPassword)) {
      setPasswordError('Password must contain at least one capital letter, one special character, and one number.');
    } else {
      setPasswordError('');
    }
    setPassword(newPassword);
  };

  const updateConfirmPassword = (confirmPassword: string) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(confirmPassword);
  };

  const handleBack = () => {
    router.push("/welcome");
  };

  const checkValidity = async () => {
    if (password !== confirmPassword || username.length < 1 ||
      passwordError !== '' || confirmPasswordError !== '' || usernameError !== ''
    ) {
      Alert.alert('Failed', 'Something went wrong, please try again');
      console.log("failed signup");
      return;
    }
    await handleContinue(username, fullname, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome_title}>Sign Up</Text>

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
        placeholder="Full name"
        value={fullname}
        onChangeText={setFullname}
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

      <Input
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={updateConfirmPassword}
        errorStyle={{ color: '#f33958' }}
        errorMessage={confirmPasswordError}
        secureTextEntry
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={handleBack}>
          <Text style={[styles.buttonText, { textAlign: 'left' }]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={checkValidity}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}