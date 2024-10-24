import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/iogo3.jpg')} // Your background image
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Fall in Love with Coffee in Blissful Delight!</Text>
        <Text style={styles.subtitle}>Welcome to our cozy coffee corner, where every cup is a delightful treat for you.</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32, // Larger title font size
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#000', // Text shadow for better visibility
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18, // Larger subtitle font size
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20, // Add horizontal padding
  },
  button: {
    backgroundColor: '#ff6b00', // Button color
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
