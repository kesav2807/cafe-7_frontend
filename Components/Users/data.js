// UserProfile.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const UserProfile = ({ route }) => {
    const { userId } = route.params; // Get userId from navigation params
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://192.168.226.137:1503/users`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            {user ? (
                <View style={styles.profileContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{user.name}</Text>

                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{user.email}</Text>

                    <Text style={styles.label}>Date of Birth:</Text>
                    <Text style={styles.value}>{new Date(user.dateOfBirth).toLocaleDateString()}</Text>

                    <Text style={styles.label}>Phone Number:</Text>
                    <Text style={styles.value}>{user.phoneNumber}</Text>

                    {user.profileImage && (
                        <Image
                            source={{ uri: `http://192.168.226.137:1503/user` }}
                            style={styles.profileImage}
                        />
                    )}
                </View>
            ) : (
                <Text>User not found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        marginTop: 20,
    },
    label: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
    value: {
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
    },
});

export default UserProfile;
