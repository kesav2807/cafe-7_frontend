import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CartContext } from './cartContext'; 
import config from '../Config File/config';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { userId, setUserId } = useContext(CartContext); 
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/login`, values);
      setUserId(response.data.user.id);
      Alert.alert('Success', response.data.message);
      navigation.navigate('HomeScreen'); // Replace 'HomeScreen' with your actual navigation target
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.error : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/logo6.jpg')} // Background image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back to cafe-7</Text>
        <Text style={styles.subtitle}>Get ready to indulge in chocolatey goodness once again!</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter your Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={[styles.input, errors.email && styles.inputError]}
                  keyboardType="email-address"
                  placeholderTextColor="#ccc"
                />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter your Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={[styles.input, errors.password && styles.inputError]}
                  secureTextEntry
                  placeholderTextColor="#ccc"
                />
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Sign In</Text>}
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.registerLink}>Don't have an account? SignUp Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  forgotPasswordText: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#C97339',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#ccc',
    marginVertical: 10,
  },
  registerLink: {
    color: '#ffbf00',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
