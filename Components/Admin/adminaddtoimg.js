import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ImgScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Add an image to the screen */}
      <Image 
        source={require('../../assets/adaptive-icon.png')}  // Replace with your local image file path
        style={styles.image} 
      />
      <Text style={styles.title}>Welcome to Our Cafe</Text>
      <Text style={styles.subtitle}>Select an option to proceed:</Text>

      {/* Buttons to navigate */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddproductForm')}
      >
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ProductDetail')}
      >
        <Text style={styles.buttonText}>Delete Product</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.buttonText}>View Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background for a cafe feel
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75, // Circular image
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a', // Dark gray color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7a7a7a', // Medium gray for the subtitle
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50', // Green button for cafe vibe
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // White text for better contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImgScreen;
