
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewStyle, Text, View } from 'react-native';

type BubbleProps = {
  style?: ViewStyle;  // Allow custom styles
  onPress?: () => void;  // Add an optional onPress handler
};

const Bubble: React.FC<BubbleProps> = ({ style, onPress }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
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

    Animated.loop(scaleAnimation).start();
  }, [scaleValue]);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Bubble clicked!');
        if (onPress) {
          onPress();  // Call the onPress handler if it exists
        }
      }}
      style={styles.touchable} // Added style to ensure visibility
    >
      <Animated.View style={[styles.bubble, { transform: [{ scale: scaleValue }] }, style]}>
        <Text style={styles.text}>🙋‍♂️</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 107,
    height: 107,
    borderRadius: 53.5,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Ensure proper positioning
    zIndex: 1, // Make sure bubbles are above other elements
  },
  text: {
    fontSize: 24,
  },
  touchable: {
    // Ensuring that the touchable area is visible and clickable
    width: 107,
    height: 107,
  },
});

export default Bubble;

