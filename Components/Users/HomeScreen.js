import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { CartContext } from './cartContext';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const { cart, setCart, userId } = useContext(CartContext);
  
  const [data, setData] = useState({});
  
  const fetchUser = async () => {
    console.log("Home page ", userId);
    const response = await axios.get(`http://192.168.106.103:1503/user-details/${userId}`);
    setData(response?.data?.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  
  // Sample data for model items
  const [modelItems, setModelItems] = useState([
    { id: 1, name: 'Honey Almondmilk Cold Brew', price: 55.00, image: require('../../assets/img-17.jpeg'), liked: false },
    { id: 2, name: 'Mocha Cookie Crumble Frappuccino', price: 65.00, image: require('../../assets/img-17.jpeg'), liked: false },
    { id: 3, name: 'Vanilla Latte', price: 60.00, image: require('../../assets/img-17.jpeg'), liked: false },
    { id: 4, name: 'Caramel Macchiato', price: 70.00, image: require('../../assets/img-17.jpeg'), liked: false },
  ]);

  // State for rotating banner images
  const [bannerImages, setBannerImages] = useState([
    require('../../assets/img-17.jpeg'),
    require('../../assets/img-18.jpeg'),
    require('../../assets/img-16.jpeg'),
  ]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Function to add items to cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to toggle like status
  const toggleLike = (itemId) => {
    setModelItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, liked: !item.liked } : item
      )
    );
  };

  // Rotate banner images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);
    
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [bannerImages.length]);

  return (
    <ScrollView style={styles.container}>
      {/* User Information */}
      <View style={styles.userInfoContainer}>
        {/* Wrap the Image in a TouchableOpacity for navigation */}
        <TouchableOpacity onPress={() => navigation.navigate('profile', { userImage: require('../../assets/img-17.jpeg') })}>
          <Image source={require('../../assets/img-17.jpeg')} style={styles.userImage} />
        </TouchableOpacity>
        <View>
          <Text style={styles.userName}>Welcome Back{data?.name}</Text>
          <Text style={styles.userTagline}>Caf'e-7</Text>
        </View>
        <Icon name="notifications-outline" size={24} color="#fff" style={styles.notificationIcon} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Temukan menu favoritmu" style={styles.searchInput} />
      </View>

      {/* Promotional Banner */}
      <View style={styles.banner}>
        <Image source={bannerImages[currentBannerIndex]} style={styles.bannerImage} />
      </View>

      {/* Category Menu */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Kategori Menu</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Bestseller')}>
            <Icon name="cafe-outline" size={32} color="#fff" />
            <Text style={styles.categoryText}>Minuman</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('HomePage')}>
            <Icon name="fast-food-outline" size={32} color="#fff" />
            <Text style={styles.categoryText}>Makanan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem } onPress={() => navigation.navigate('CartScreen')}>
            <Icon name="cart-outline" size={32} color="#fff" />
            <Text style={styles.categoryText}>Merch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('map')}>
            <Icon name="home-outline" size={32} color="#fff" />
            <Text style={styles.categoryText}>Di Rumah</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Menu */}
      <View style={styles.popularMenuContainer}>
        <View style={styles.popularMenuHeader}>
          <Text style={styles.popularMenuTitle}>Popular Menu</Text>
          <Text style={styles.seeMoreText}>See More</Text>
        </View>

        {/* Render modelItems dynamically */}
        {modelItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Image source={item.image} style={styles.menuImage} />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>Rp. {item.price.toLocaleString('id-ID')}</Text>
            </View>
            <View style={styles.menuActions}>
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                <Icon name={item.liked ? "heart" : "heart-outline"} size={24} color="#ff0000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Icon name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0a8754',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userTagline: {
    color: '#fff',
    fontSize: 14,
  },
  notificationIcon: {
    marginLeft: 'auto',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: -20,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  banner: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5, // Added elevation for shadow effect on Android
  },
  bannerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10, // Rounded corners for the banner image
  },
  categoryContainer: {
    marginHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: '#0a8754',
    borderRadius: 15,
    padding: 10,
    width: '22%',
  },
  categoryText: {
    color: '#fff',
    marginTop: 5,
  },
  popularMenuContainer: {
    padding: 20,
  },
  popularMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  popularMenuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMoreText: {
    color: '#0a8754',
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  menuDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuPrice: {
    color: '#888',
  },
  menuActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#0a8754',
    borderRadius: 20,
    padding: 5,
    marginLeft: 10,
  },
});

export default HomeScreen;
