import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewStyle, Text, View } from 'react-native';
import { User } from '../types';

type BubbleProps = {
  style?: ViewStyle;  // Allow custom styles
  onPress?: (user: User) => void;  // Add an optional onPress handler
  user?: User;
  hide?: boolean;
};

const Bubble: React.FC<BubbleProps> = ({ style, onPress, user, hide }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Random delay for starting the animation
    const randomDelay = Math.floor(Math.random() * 5000); // Random delay between 0 and 5 seconds
    
    // Scale animation
    const scaleAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.075,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    // Floating animation loop
    const floatAnimation = Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]);

    // Start animations with a random delay
    const timer = setTimeout(() => {
      Animated.loop(scaleAnimation).start();
      Animated.loop(floatAnimation).start();
    }, randomDelay);

    // Clean up timer and animations on component unmount
    return () => {
      clearTimeout(timer);
    };
  }, [scaleValue, animatedValue]);

  // Interpolating the translateY value for up and down floating
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 15],
  });

  return (
    <TouchableOpacity
      onPress={() => {
        if (hide) {
          return;
        }
        console.log('Bubble clicked!');
        if (onPress) {
          onPress(user);  // Call the onPress handler if it exists
        }
      }}
      style={styles.touchable}
    >
      <Animated.View
        style={[
          styles.bubble,
          { transform: [{ scale: scaleValue }, { translateY }] },  // Combined scaling and floating
          style,
        ]}
      >
        
        {!hide && <Text style={styles.text}>🙋‍♂️</Text>}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0)',  // Fully transparent
    borderWidth: 2, // Optional: add a border for visual definition
    borderColor: 'rgba(173, 216, 230, 0.3)',  // Light blue border with transparency
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',  // Ensure proper positioning
    zIndex: 1,  // Make sure bubbles are above other elements
    shadowColor: '#0fb4ff',  // Color for shadow/blur effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,  // Blurring effect
    elevation: 10,  // For Android shadows
  },
  text: {
    fontSize: 24,
  },
  touchable: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' ,
  },
});

export default Bubble;
