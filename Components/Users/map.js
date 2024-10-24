import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const BranchLocationMap = () => {
  // Define branch locations
  const branchLocations = [
    {
      id: 1,
      latitude: 11.0183,  // Lakshmi Mills, Coimbatore
      longitude: 76.9741,
      title: 'Lakshmi Mills, Coimbatore',
      description: '15.7km away',
      distance: '15.7km',
      name: 'Cafe-7',
      openHours: '08 AM • Closes: 12 PM',
    },
    {
      id: 2,
      latitude: 11.0301,  // Peelamedu, Coimbatore
      longitude: 77.0282,
      title: 'Peelamedu, Coimbatore',
      description: '10.3km away',
      distance: '10.3km',
      name: 'Cafe-7',
      openHours: '09 AM • Closes: 11 PM',
    },
    {
      id: 3,
      latitude: 11.1271,  // Gandhipuram, Coimbatore
      longitude: 77.0017,
      title: 'Gandhipuram, Coimbatore',
      description: '12.5km away',
      distance: '12.5km',
      name: 'Cafe-7',
      openHours: '07 AM • Closes: 10 PM',
    },
    {
      id: 4,
      latitude: 11.0180,  // Sulur, Coimbatore
      longitude: 77.1256,
      title: 'Sulur, Coimbatore',
      description: '25km away',
      distance: '25km',
      name: 'Cafe-7 Sulur',
      openHours: '10 AM • Closes: 09 PM',
    },
    {
      id: 5,
      latitude: 10.3665,  // Gandhigram Rural Institute, Dindigul
      longitude: 77.9686,
      title: 'Gandhigram Rural Institute, Dindigul',
      description: 'Deemed to be University in Dindigul, 60km away',
      distance: '60km',
      name: 'Cafe-7 Gandhigram',
      openHours: '07 AM • Closes: 08 PM',
    },
  ];

  // Function to handle opening directions in a maps app
  const handleShowDirections = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Find a store near you"
          placeholderTextColor="#888"
        />
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 11.0183,  // Centered around Lakshmi Mills, Coimbatore
          longitude: 76.9741,
          latitudeDelta: 0.2, // Adjust the zoom level to cover multiple locations
          longitudeDelta: 0.2,
        }}
      >
        {/* Loop through branchLocations array and add markers */}
        {branchLocations.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
            description={location.description}
          />
        ))}
      </MapView>

      {/* Nearby Locations */}
      <View style={styles.nearbyContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {branchLocations.map(location => (
            <View key={location.id} style={styles.storeCard}>
              <Text style={styles.storeName}>{location.name}</Text>
              <Text style={styles.storeLocation}>{location.title}</Text>
              <Text style={styles.storeDistance}>Open: {location.openHours}</Text>
              <Text style={styles.storeDistance}>{location.distance} away • Open</Text>
              <Text style={styles.storeDetails}>Drive • Wifi available</Text>

              {/* Show Directions Button */}
              <TouchableOpacity 
                style={styles.directionsButton}
                onPress={() => handleShowDirections(location.latitude, location.longitude)}
              >
                <Text style={styles.directionsButtonText}>Show Directions</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    backgroundColor: '#2b4239',
    padding: 10,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  nearbyContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  storeCard: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 300,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b4239',
  },
  storeLocation: {
    fontSize: 14,
    color: '#2b4239',
    marginTop: 5,
  },
  storeDistance: {
    fontSize: 14,
    color: '#2b4239',
    marginTop: 5,
  },
  storeDetails: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  directionsButton: {
    marginTop: 10,
    backgroundColor: '#2b4239',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  directionsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BranchLocationMap;