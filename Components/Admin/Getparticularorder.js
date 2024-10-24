import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import config from '../Config File/config';

const PhoneNumberForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.BASE_URL}/getparticulardata`, { phoneNumber });
            // Handle the response as needed
            Alert.alert('Orders Retrieved', JSON.stringify(response.data, null, 2), [{ text: 'OK' }]);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                required
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default PhoneNumberForm;
