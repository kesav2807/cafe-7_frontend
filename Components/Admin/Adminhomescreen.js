import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../../assets/logo4.jpg')} // Ensure this path is correct
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Cafe-7</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('AddPayment')}
        >
          <Text style={styles.buttonText}>Add Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('GetallorderDate')}
        >
          <Text style={styles.buttonText}>Get All Order Data</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('OrderList')}
        >
          <Text style={styles.buttonText}>Get Particular Order</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('admin')}
        >
          <Text style={styles.buttonText}> Get Particular Order</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to improve text visibility
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // White color for better contrast on dark overlay
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#28a745', // Green color for a vibrant look
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000', // Shadow effect for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: '#ffffff', // White text for contrast
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
