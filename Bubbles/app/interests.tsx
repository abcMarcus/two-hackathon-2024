import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';
import styles from '../assets/stylesheet';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';

const API_BASE_URL = 'http://sydneyhome.ddns.net:38433';

export default function InterestPage() {
    const { userInfoJSON } = useLocalSearchParams();
    const { username, fullname, password } = JSON.parse(userInfoJSON);
    console.log(`received params: ${userInfoJSON}`); 
    const [interestList, setInterestList] = useState([]);
    const [interest, setInterest] = useState("");
    const [interestError, setInterestError] = useState("");
    const inputRef = useRef(null);
    
    const cleanString = (str: string): string => {
        // Remove special characters, keep only alphanumeric and spaces
        return str.replace(/[^a-zA-Z0-9 ]/g, '').trim();
    };

    const handleBack = () => {
        router.push("/signup");
    };

    const handleContinue = async (username: string, fullname: string, interests, password: string) => {
        if (!interestList || interestList.length === 0) {
            Alert.alert('Error', 'Interest list cannot be empty.');
            return;
        }
        const interest = interests.join(', ');
        try {
            const response = await fetch(`${API_BASE_URL}/api/create_user`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                fullname,
                interest,
                password
            }),
            });
        
            if (response.ok) {
              const jsonResponse = await response.json();
              Alert.alert('Success', 'Account created successfully!');
              console.log('Response:', jsonResponse);
              router.push({
                pathname: '/(tabs)/home',
                params: { username, fullname, interests }
              });
            } else {
              Alert.alert('Failed', 'Something went wrong, please try again');
              console.log('Failed to create account');
            }
          } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again later.');
            console.error('Error:', error);
          }
    }

    const handleSubmitEditing = () => {
        addInterestToList();
    };

    const addInterestToList = () => {
        const trimmedInterest = cleanString(interest.trim().toLowerCase());
        if (!interest.trim()) {
            setInterestError("Interest cannot be empty");
        } else if (interestList.some(item => item.toLowerCase() === trimmedInterest)) {
            setInterestError("You already added that interest in!");
        } else {
        setInterestList([...interestList, trimmedInterest]);
        setInterest("");
        setInterestError("");
        }
        inputRef.current?.focus();
    };

    const removeInterest = (index) => {
        const newList = interestList.filter((_, i) => i !== index);
        setInterestList(newList);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={localStyles.interestList}>
                {interestList.map((item, index) => (
                    <View key={index} style={localStyles.interestItem}>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => removeInterest(index)}>
                            <Text style={localStyles.removeButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Input
                ref={inputRef}
                style={styles.input}
                placeholder="Add an interest"
                value={interest}
                errorStyle={{ color: '#f33958' }}
                errorMessage={interestError}
                onSubmitEditing={handleSubmitEditing}
                blurOnSubmit={false}
                onChangeText={setInterest}
                autoCapitalize="none"
                rightIcon={
                    <Button
                        title="Add"
                        onPress={addInterestToList}
                        type="clear"
                    />
                }
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={handleBack}>
                <Text style={[styles.buttonText, { textAlign: 'left' }]}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.signup_button]} onPress={() => handleContinue(username, fullname, interestList, password)}>
                <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}


const localStyles = StyleSheet.create({
    interestList: {
        maxHeight: 200,
        width: '100%',
        marginBottom: 20,
    },
    interestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5A5C59',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    interestText: {
        color: '#F0F0F0',
        fontSize: 16,
    },
    removeButton: {
        color: '#f33958',
        fontWeight: 'bold',
        fontSize: 18,
    },
    addButtonText: {
        color: '#F0F0F0',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});