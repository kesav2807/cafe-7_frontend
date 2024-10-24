import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderMethodScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HOW DO YOU WANT TO RECEIVE YOUR ORDER?</Text>

      <View style={styles.optionsContainer}>
        {/* Delivery Option */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AdminScreen')}>
          <Image
            source={require('..//..//assets/l1.png')} // replace with your actual image file
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Cashier</Text>
        </TouchableOpacity>

        {/* Self Pickup Option */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SignInScreen')}>
          <Image
            source={require('../../assets/l2.png')} // replace with your actual image file
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Self Pick Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver', // Light grey background for a clean look
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 20,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center', // Center the options vertically
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12, // Increased vertical margin for more breathing space
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // Adds elevation on Android for a card-like look
  },
  optionImage: {
    width: 200,
    height: 200,
    marginRight: 20,
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333', // Darker color for better contrast
  },
  menuButton: {
    backgroundColor: '#ff6b00', // Starbucks' vibrant accent color
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderMethodScreen;