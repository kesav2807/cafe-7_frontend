import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './cartContext'; // Importing the cart context
import axios from 'axios';
import config from '../Config File/config';

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext); // Access cart and setCart from context
  const navigation = useNavigation();

  // Function to generate a random 4-digit order ID as a string
  const generateOrderId = () => {
    const orderId = Math.floor(1000 + Math.random() * 9000); // Generate a random number between 1000 and 9999
    return String(orderId).padStart(4, '0'); // Convert to string and pad with zeros if needed
  };

  // Function to increase item quantity
  const increaseQuantity = (id) => {
    const updatedCartItems = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCartItems);
  };

  // Function to decrease item quantity
  const decreaseQuantity = (id) => {
    const updatedCartItems = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCartItems);
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  // Calculate the total price and subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = 20.00;
  const tax = 10.00;
  const total = subtotal + deliveryCharge + tax;

  // Handle placing the order
  const handleBuyNow = async () => {
    try {
      // Generate a random 4-digit order ID
      const orderId = generateOrderId();

      const response = await axios.post(`${config.BASE_URL}/api/orders`, {
        orderId, // Include the random 4-digit order ID in the order data
        items: cart,
        total: total,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (response.status === 201) {
        alert(data.message);
        setCart([]); // Clear the cart on successful order
        navigation.navigate('OrderConfirmation', { order: data.order });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  // Render empty cart message
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Your cart is empty.</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/1.png')} // Background image for the cart page
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        {cart.length === 0 ? (
          renderEmptyCart()
        ) : (
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>Rs.{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeItemButton}>
                  <Text style={styles.removeItemButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        )}
        {cart.length > 0 && (
          <View style={styles.totalItemsContainer}>
            <Text style={styles.totalItemsText}>Items: {cart.length}</Text>
            <Text style={styles.totalPriceText}>Total: Rs.{total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
              <Text style={styles.buyNowButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

// Styles for the cart page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#555',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeItemButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  removeItemButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  totalItemsContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  totalItemsText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buyNowButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyCartContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#777',
  },
});

export default CartPage;
