import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import config from '../Config File/config'; // Ensure this path is correct

const AddPayment = () => {
    const [orderNo, setOrderNo] = useState('');
    const [customerPhNo, setCustomerPhNo] = useState('');
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [foodamount, setFoodamount] = useState('');
    const [productCategory, setProductCategory] = useState('Bestseller'); // Default category
    const [date, setDate] = useState('');
    const [paymentby, setPaymentby] = useState('');
    const [paymentfor, setPaymentfor] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for submission

    // Automatically generate order number and date on component mount
    useEffect(() => {
        generateOrderNumber();
        setDate(getCurrentDate());
    }, []);

    // Function to generate a random order number
    const generateOrderNumber = () => {
        const newOrderNo = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
        setOrderNo(newOrderNo.toString());
    };

    // Function to get the current date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (`0${today.getMonth() + 1}`).slice(-2); // Add leading zero if needed
        const day = (`0${today.getDate()}`).slice(-2); // Add leading zero if needed
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async () => {
        setLoading(true); // Show loading indicator

        try {
            const response = await axios.post(`${config.BASE_URL}/addpayment`, {
                orderNo: Number(orderNo),
                customerPhNo: Number(customerPhNo),
                productId: Number(productId),
                productName,
                foodamount: Number(foodamount),
                productCategory,
                date,
                paymentby: Number(paymentby),
                paymentfor: Number(paymentfor),
            });
            Alert.alert("Success", response.data);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.response?.data.errors[0].msg || "Failed to add order");
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Order No:</Text>
            <TextInput 
                value={orderNo} 
                editable={false} // Disable input since it's auto-generated
                style={styles.input} 
            />
            
            <Text style={styles.label}>Customer Phone No:</Text>
            <TextInput 
                value={customerPhNo} 
                onChangeText={setCustomerPhNo} 
                keyboardType="numeric" 
                style={styles.input} 
                placeholder="Enter customer phone number" 
            />
            
            <Text style={styles.label}>Product ID:</Text>
            <TextInput 
                value={productId} 
                onChangeText={setProductId} 
                keyboardType="numeric" 
                style={styles.input} 
                placeholder="Enter product ID" 
            />
            
            <Text style={styles.label}>Product Name:</Text>
            <TextInput 
                value={productName} 
                onChangeText={setProductName} 
                style={styles.input} 
                placeholder="Enter product name" 
            />
            
            <Text style={styles.label}>Food Amount:</Text>
            <TextInput 
                value={foodamount} 
                onChangeText={setFoodamount} 
                keyboardType="numeric" 
                style={styles.input} 
                placeholder="Enter food amount" 
            />
            
            <Text style={styles.label}>Product Category:</Text>
            <Picker
                selectedValue={productCategory}
                onValueChange={(itemValue) => setProductCategory(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Bestseller" value="Bestseller" />
                <Picker.Item label="Drinks" value="Drinks" />
                <Picker.Item label="Foods" value="Foods" />
                <Picker.Item label="Merchandise" value="Merchandise" />
                <Picker.Item label="Coffee at Home" value="Coffee at Home" />
                <Picker.Item label="Ready to Eat" value="Ready to Eat" />
            </Picker>

            <Text style={styles.label}>Date:</Text>
            <TextInput 
                value={date} 
                editable={false} // Disable input since it's auto-generated
                style={styles.input} 
            />
            
            <Text style={styles.label}>Payment By:</Text>
            <TextInput 
                value={paymentby} 
                onChangeText={setPaymentby} 
                keyboardType="numeric" 
                style={styles.input} 
                placeholder="Enter payment by" 
            />
            
            <Text style={styles.label}>Payment For:</Text>
            <TextInput 
                value={paymentfor} 
                onChangeText={setPaymentfor} 
                keyboardType="numeric" 
                style={styles.input} 
                placeholder="Enter payment for" 
            />

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleSubmit} 
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        flexGrow: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default AddPayment;
