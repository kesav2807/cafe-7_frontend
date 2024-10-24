import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import config from '../Config File/config';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/orders`); // Update with your server IP
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, []);

    // Render error message if there is an error
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order List</Text>
            {orders.length === 0 ? (
                <Text style={styles.noOrdersText}>No orders available.</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.orderNo.toString()} // Use unique identifier for each order
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.orderItem} onPress={() => alert(`Order No: ${item.orderNo}`)}>
                            <Text style={styles.orderText}>
                                <Text style={styles.bold}>Order No:</Text> {item.orderNo}{'\n'}
                                <Text style={styles.bold}>Customer Phone:</Text> {item.customerPhNo}{'\n'}
                                <Text style={styles.bold}>Product:</Text> {item.productName}{'\n'}
                                <Text style={styles.bold}>Amount:</Text> ${item.foodamount}{'\n'}
                                <Text style={styles.bold}>Payment By:</Text> {item.paymentby}
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
        backgroundColor: '#f5f5f5', // Light gray background for contrast
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Darker color for better readability
    },
    orderItem: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#fff', // White background for order items
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2, // For Android shadow
    },
    orderText: {
        fontSize: 16,
        color: '#555', // Medium gray for order text
    },
    bold: {
        fontWeight: 'bold',
        color: '#000', // Black for bold text
    },
    noOrdersText: {
        fontSize: 18,
        color: '#888', // Lighter color for no orders message
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
});

export default OrderList;
