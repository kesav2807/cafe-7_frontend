import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../Config File/config';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products`);
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleUpdateProduct = (productId) => {
        navigation.navigate('UpdateProductForm', { productId });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading Products...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Text style={styles.productText}>{item.name}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleUpdateProduct(item._id)}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7', // Light background for a cafe feel
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // White background while loading
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#4CAF50', // Green text for loading message
    },
    productContainer: {
        backgroundColor: '#fff', // White background for product item
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // For Android shadow effect
    },
    productText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333', // Darker text for better readability
    },
    button: {
        marginTop: 10,
        backgroundColor: '#4CAF50', // Green background for button
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000', // Shadow for button depth
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2, // For Android shadow effect
    },
    buttonText: {
        color: '#ffffff', // White text for button
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductList;
