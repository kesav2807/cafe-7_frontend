// components/OrderList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import config from '../Config File/config';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [searchId, setSearchId] = useState(''); // For the search input
    const [error, setError] = useState(null);
    const [searchedOrder, setSearchedOrder] = useState(null); // For storing searched order

    // Fetch all orders initially
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/orders`);
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, []);

    // Fetch order by ID
    const fetchOrderById = async () => {
        if (!searchId) {
            alert('Please enter an Order ID');
            return;
        }
        try {
            const response = await axios.get(`${config.BASE_URL}/api/orders/${searchId}`);
            setSearchedOrder(response.data);
        } catch (err) {
            setError(`Order with ID ${searchId} not found`);
            setSearchedOrder(null); // Clear previous search results if error occurs
        }
    };

    // Handle search input change
    const handleSearchInputChange = (text) => {
        setSearchId(text);
        setError(null); // Clear error when user starts typing
        setSearchedOrder(null); // Reset searched order if user is typing again
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order List</Text>

            {/* Search input and button */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Order ID"
                    value={searchId}
                    onChangeText={handleSearchInputChange}
                />
                <Button title="Search" onPress={fetchOrderById} />
            </View>

            {error && <Text style={styles.errorText}>Error: {error}</Text>}

            {/* Display searched order */}
            {searchedOrder ? (
                <View style={styles.orderItem}>
                    <Text style={styles.orderText}>
                        <Text style={styles.bold}>Order ID:</Text> {searchedOrder.id}{'\n'}
                        <Text style={styles.bold}>Items:</Text> {searchedOrder.items?.map(i => i.name).join(', ')}{'\n'}
                        <Text style={styles.bold}>Total Price:</Text> ${searchedOrder.total}{'\n'}
                        <Text style={styles.bold}>Total Quantity:</Text> {searchedOrder.items?.reduce((acc, i) => acc + i.quantity, 0)}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.orderItem} 
                            onPress={() => alert(`Order ID: ${item.id || 'N/A'}`)}
                        >
                            <Text style={styles.orderText}>
                                <Text style={styles.bold}>Order ID:</Text> {item.id || 'N/A'}{'\n'}
                                <Text style={styles.bold}>Items:</Text> {item.items?.map(i => i.name).join(', ')}{'\n'}
                                <Text style={styles.bold}>Total Price:</Text> ${item.total || '0'}{'\n'}
                                <Text style={styles.bold}>Total Quantity:</Text> {item.items?.reduce((acc, i) => acc + i.quantity, 0)}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginRight: 10,
        borderRadius: 8,
    },
    orderItem: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    orderText: {
        fontSize: 16,
        color: '#555',
    },
    bold: {
        fontWeight: 'bold',
        color: '#000',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
});

export default OrderList;
