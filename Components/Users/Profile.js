import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from './cartContext';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import the image picker
import config from '../Config File/config';

export default function Profile() {
    const { userId } = useContext(CartContext);
    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null); // State for profile image
    

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/user-details/${userId}`);
            setData(response.data.user);
            setProfileImage(response.data.user.profileImage || null); // Initialize profileImage from fetched data
            setLoading(false);
        } catch (error) {
            console.log('Error fetching user data:', error);
            setLoading(false);
        }
    };

    const uploadImage = async (imageData) => {
        const formData = new FormData();
        formData.append('profileImage', {
            uri: imageData.uri,
            type: imageData.type,
            name: imageData.fileName || 'profile.jpg',
        });

        try {
            await axios.post(`${config.BASE_URL}/upload-profile-image/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchUser(); // Fetch user data again to update the profile image
        } catch (error) {
            console.log('Error uploading image:', error);
        }
    };

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri); // Update the local state for preview
                uploadImage(response.assets[0]); // Upload the image
            } else {
                console.log('Unexpected response:', response);
            }
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Define a valid URI for the profile image
    const imageSource = profileImage ? { uri: profileImage } : require('../../assets/logo4.jpg');

    return (
        <ImageBackground 
            source={require('../../assets/logo5.jpg')}
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Image
                        source={imageSource} // Use the valid image source
                        style={styles.profileImage}
                    />
                    <TouchableOpacity onPress={handleImagePicker}>
                        <Text style={styles.changeImageText}>Change Profile Image</Text>
                    </TouchableOpacity>
                    <Text style={styles.name}>{data?.name}</Text>
                    <Text style={styles.profession}>{data?.email}</Text>
                    <Text style={styles.location}>{data?.phoneNumber}</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>122</Text>
                            <Text style={styles.statLabel}>Followers</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>67</Text>
                            <Text style={styles.statLabel}>Following</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>37K</Text>
                            <Text style={styles.statLabel}>Likes</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Add Friends</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.photosSection}>
                    <Text style={styles.sectionTitle}>Photos</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Image source={require('../../assets/logo4.jpg')} style={styles.photo} />
                        <Image source={require('../../assets/logo4.jpg')} style={styles.photo} />
                        <Image source={require('../../assets/logo4.jpg')} style={styles.photo} />
                    </ScrollView>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    changeImageText: {
        color: '#4A90E2',
        fontSize: 14,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profession: {
        fontSize: 16,
        color: '#888',
    },
    location: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#777',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    photosSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
});
