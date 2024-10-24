import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Alert,
    ImageBackground,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import config from '../Config File/config';

const RegisterScreen = ({ navigation }) => {
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfBirthVisible, setDateOfBirthVisible] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading

    const registrationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
    });

    const handleRegistration = async (values) => {
        const formData = {
            ...values,
            dateOfBirth: dateOfBirth.toISOString(),
        };

        setLoading(true); // Set loading to true

        try {
            const response = await axios.post(`${config.BASE_URL}/register`, formData);
            Alert.alert('Success', response.data.message);
            navigation.navigate('SignInScreen');
        } catch (error) {
            Alert.alert('Error', error.response ? error.response.data.error : 'Registration failed');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground 
                source={require('../../assets/logo4.jpg')} // Make sure the path is correct
                style={styles.container}
                resizeMode="cover"
            >
                <Text style={styles.title}>Welcome to Cafe-7</Text>
                <Text style={styles.subtitle}>Create your account to indulge in chocolatey goodness!</Text>
                <Formik
                    initialValues={{ name: '', email: '', password: '', phoneNumber: '' }}
                    validationSchema={registrationSchema}
                    onSubmit={handleRegistration}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <TextInput
                                placeholder="Name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={[styles.input, errors.name && styles.inputError]}
                            />
                            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                            <TextInput
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={[styles.input, errors.email && styles.inputError]}
                                keyboardType="email-address"
                            />
                            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                            <TextInput
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={[styles.input, errors.password && styles.inputError]}
                                secureTextEntry
                            />
                            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                            <TextInput
                                placeholder="Phone Number"
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                                style={[styles.input, errors.phoneNumber && styles.inputError]}
                                keyboardType="phone-pad"
                            />
                            {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

                            <TouchableOpacity style={styles.dateButton} onPress={() => setDateOfBirthVisible(true)}>
                                <Text style={styles.dateButtonText}>Select Date of Birth</Text>
                            </TouchableOpacity>

                            {dateOfBirthVisible && (
                                <DateTimePicker
                                    value={dateOfBirth}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setDateOfBirthVisible(false);
                                        if (selectedDate) {
                                            setDateOfBirth(selectedDate);
                                        }
                                    }}
                                />
                            )}
                            <Text style={styles.dateText}>
                                Date of Birth: {dateOfBirth.toLocaleDateString()}
                            </Text>

                            <TouchableOpacity 
                                style={[styles.button, loading && styles.buttonDisabled]} 
                                onPress={handleSubmit} 
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Register</Text>}
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>

                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                    <Text style={styles.loginLink}>Already have an account? Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background with transparency
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Similar background for input
        color: '#FFF', // White text for input
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
    },
    dateButton: {
        backgroundColor: '#C97339', // Match button color with AdminLoginScreen
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    dateButtonText: {
        color: '#FFF', // White text
        fontSize: 16,
    },
    dateText: {
        marginVertical: 10,
        fontSize: 16,
        color: '#FFF', // Match text color
    },
    button: {
        backgroundColor: '#C97339', // Match button color with AdminLoginScreen
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#FFF', // White text for button
        fontSize: 18,
    },
    loginLink: {
        color: '#FFF', // White text for the login link
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default RegisterScreen;
