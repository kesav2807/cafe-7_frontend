import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from '../Config File/config';

const AddProductForm = () => {
    const navigation = useNavigation();
    const [productName, setProductName] = useState('');
   // const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    //const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    const handleAddProduct = async () => {
        // Input validation
        if (!productName || !price || !ingredients || !image) {
            Alert.alert('Validation Error', 'Please fill all fields.');
            return;
        }

        try {
            const newProduct = {
                name: productName,
    
                price,
                ingredients,
        
                image,
            };

            const response = await axios.post(`${config.BASE_URL}/products`, newProduct);
            Alert.alert('Product Added!', `Product Name: ${response.data.name}`);
            navigation.navigate('Adminlogo');
        } catch (error) {
            Alert.alert('Error', 'There was an issue adding the product.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
            />
            {/* <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            /> */}
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Ingredients"
                value={ingredients}
                onChangeText={setIngredients}
            />
            {/* <TextInput
                style={styles.input}
                placeholder="Benefits"
                value={benefits}
                onChangeText={setBenefits}
            /> */}
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e9f5ec', // Light green background
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd', // Light gray border
        borderRadius: 12,
        marginBottom: 15,
        backgroundColor: '#ffffff', // White background for inputs
        shadowColor: '#000', // Shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2, // For Android shadow effect
    },
    button: {
        backgroundColor: '#4CAF50', // Vibrant green
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%', // Full-width button
        alignItems: 'center',
        shadowColor: '#000', // Shadow for button depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // For Android shadow effect
    },
    buttonText: {
        color: '#ffffff', // White text
        fontSize: 18, // Larger font size for emphasis
        fontWeight: 'bold',
    },
});

export default AddProductForm;
