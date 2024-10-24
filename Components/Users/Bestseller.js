import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, useColorScheme } from 'react-native';
import { CartContext } from './cartContext';
import { Ionicons } from '@expo/vector-icons'; // Modern icon pack

const ModelPage = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);
  const colorScheme = useColorScheme(); // Detect light/dark mode

  const [modelItems, setModelItems] = useState([
    { id: '1', name: 'Espresso', price: 250, image: require('../../assets/img-17.jpeg') },
    { id: '2', name: 'Cappuccino', price: 350, image: require('../../assets/img-17.jpeg') },
    { id: '3', name: 'Latte', price: 300, image: require('../../assets/img-17.jpeg') },
    { id: '4', name: 'Mocha', price: 400, image: require('../../assets/img-17.jpeg') },
    { id: '5', name: 'Americano', price: 280, image: require('../../assets/img-17.jpeg') },
    { id: '6', name: 'Macchiato', price: 320, image: require('../../assets/img-17.jpeg') },
    { id: '7', name: 'Flat White', price: 360, image: require('../../assets/img-17.jpeg') },
    { id: '8', name: 'Iced Coffee', price: 300, image: require('../../assets/img-17.jpeg') },
    { id: '9', name: 'Croissant', price: 200, image: require('../../assets/img-17.jpeg') },
    { id: '10', name: 'Chocolate Croissant', price: 220, image: require('../../assets/img-17.jpeg') },
    { id: '11', name: 'Muffin', price: 180, image: require('../../assets/img-17.jpeg') },
    { id: '12', name: 'Scone', price: 150, image: require('../../assets/img-17.jpeg') },
    { id: '13', name: 'Cheese Danish', price: 240, image: require('../../assets/img-17.jpeg') },
    { id: '14', name: 'Bagel', price: 210, image: require('../../assets/img-17.jpeg') },
    { id: '15', name: 'Fruit Tart', price: 250, image: require('../../assets/img-17.jpeg') },
    { id: '16', name: 'Pasta Salad', price: 350, image: require('../../assets/img-17.jpeg') },
    { id: '17', name: 'Quiche', price: 300, image: require('../../assets/img-17.jpeg') },
    { id: '18', name: 'Club Sandwich', price: 400, image: require('../../assets/img-17.jpeg') },
    { id: '19', name: 'Chicken Panini', price: 380, image: require('../../assets/img-17.jpeg') },
    { id: '20', name: 'Caesar Salad', price: 330, image: require('../../assets/img-17.jpeg') },
  ]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } 
        : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <ImageBackground source={require('../../assets/logo6.jpg')} style={styles.backgroundImage}>
      <View style={colorScheme === 'dark' ? styles.darkContainer : styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Café Menu</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart-outline" size={30} color="#fff" />
              {cart.length > 0 && (
                <View style={styles.cartCount}>
                  <Text style={styles.cartCountText}>{cart.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          {modelItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rs.{item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(item)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  darkContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' depending on your design
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(10, 135, 84, 0.8)', // Added transparency for better visibility
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 4,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eaeaea',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a8754',
  },
  addToCartButton: {
    backgroundColor: '#0a8754',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#ff5252',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 1,
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ModelPage;
