import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import config from '../Config File/config';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const regex = /\S+@\S+\.\S+/; // Basic email regex
        return regex.test(email);
    };

    const handleForgotPassword = async () => {
        if (!isValidEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${config.BASE_URL}/forgot-password`, { email });
            Alert.alert('Success', response.data.message);
            navigation.navigate('SignInScreen'); // Navigate back to LoginScreen after sending the reset link
        } catch (error) {
            Alert.alert('Error', error.response ? error.response.data.error : 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Your Password?</Text>
            <Text style={styles.subtitle}>Enter your email to receive a password reset link.</Text>
            <TextInput
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                accessibilityLabel="Email Input"
            />
            <TouchableOpacity onPress={handleForgotPassword} style={styles.button} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#777',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#C97339',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;
