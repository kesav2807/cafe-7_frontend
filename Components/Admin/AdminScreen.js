import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios'; // Ensure you import axios
import config from '../Config File/config';

const AdminLoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/admin/login`, {
        username,
        password,
      });

      setLoading(false);

      if (response.status === 200) {
        Alert.alert("Login Success", response.data.message);
        navigation.navigate('Adminlogo'); // Replace with your actual navigation target
      } else {
        Alert.alert("Login Failed", response.data.error);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/iogo3.jpg')} // Background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back to Cafe-7 Cashier</Text>
          <Text style={styles.subtitle}>Get ready to indulge in chocolatey goodness once again!</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Your Cashier Name"
            placeholderTextColor="#FFF"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor="#FFF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Sign In</Text>}
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AdminLoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background with transparency
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFF',
  },
  button: {
    backgroundColor: '#C97339', // Brownish color matching the design
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  orText: {
    color: '#FFF',
    marginBottom: 10,
  },
  socialButtonsContainer: {
    width: '100%',
  },
  socialButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
