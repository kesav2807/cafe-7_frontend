import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrderConfirmation = ({ route, navigation }) => {
  const { order } = route.params || {}; // Extract order from navigation params

  console.log('Received order:', order); // Log the order for debugging

  // Check if order is defined
  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmation</Text>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderId}>Order ID: {order.id}</Text>
        <Text style={styles.totalPrice}>Total Price: Rs.{order.total}</Text>
        {/* Render other order details as needed */}
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeScreen')} // Navigate back to home
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue background
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderDetailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  orderId: {
    fontSize: 20,
    marginBottom: 10,
    color: '#555',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745', // Green color for total price
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#007bff', // Blue button background
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OrderConfirmation;
