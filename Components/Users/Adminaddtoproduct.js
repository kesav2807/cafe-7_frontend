import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  Vibration,
  Platform,
  useColorScheme,
  ImageBackground, // Import ImageBackground
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from '../Config File/config';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons'; // Modern icon pack
import { Skeleton } from '@rneui/themed'; // For skeleton loading

export default function HomePage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const colorScheme = useColorScheme(); // Detect light/dark mode

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${config.BASE_URL}/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem._id === item._id);
      if (existingItemIndex !== -1) {
        // Update the quantity if the item already exists in the cart
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Add new item with a quantity of 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    if (Platform.OS === 'android') {
      Vibration.vibrate(100);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert('Success', `${item.name} added to cart!`);
  };

  const renderLoadingSkeleton = () => (
    <Skeleton width={320} height={100} style={{ marginBottom: 10 }} />
  );

  return (
    <ImageBackground 
      source={require('../../assets/logo6.jpg')} // Background image
      style={styles.backgroundImage}
    >
      <View style={colorScheme === 'dark' ? styles.darkContainer : styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Cafe-7</Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search products..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearchInputChange}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart })}>
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

        {loading ? (
          <View>
            {renderLoadingSkeleton()}
            {renderLoadingSkeleton()}
            {renderLoadingSkeleton()}
          </View>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item._id })}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                  ) : (
                    <Text style={styles.noImage}>No Image Available</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent for contrast
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.8)', // Semi-transparent for contrast
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a8754',
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
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
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
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eaeaea',
  },
  noImage: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
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
});
