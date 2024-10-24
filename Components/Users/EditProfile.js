import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Alert } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from './cartContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import config from '../Config File/config';

export default function EditProfile() {
    const { userId } = useContext(CartContext);
    const navigation = useNavigation(); // Get navigation prop
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://192.168.106.103:1503/user-details/${userId}`);
            setData(response.data.user);
            setName(response.data.user.name);
            setEmail(response.data.user.email);
            setPhoneNumber(response.data.user.phoneNumber);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateUserProfile = async () => {
        try {
            const response = await axios.put(`${config.BASE_URL}/user-details/${userId}`, {
                name,
                email,
                phoneNumber,
            });
            Alert.alert('Success', 'Profile updated successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('profile'), // Navigate to Profile page
                },
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to update profile. Please try again later.');
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/logo4.jpg')} // Profile image placeholder
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{data?.name}</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                
                <TouchableOpacity style={styles.button} onPress={updateUserProfile}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light background for better visibility
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: '#f8f8f8', // Slightly off-white background
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2, // Add border to profile image
        borderColor: '#4A90E2', // Border color matching the theme
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        marginVertical: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10, // More rounded corners for inputs
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff', // White background for inputs
        elevation: 2, // Shadow effect for input fields
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 10,
        elevation: 3, // Add slight elevation to the button
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16, // Increased font size for better readability
    },
});
