import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon setup
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Replace with your custom icon URL
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const LocationPicker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Helper component to update the map center
    const MapCenterUpdater = ({ center }) => {
        const map = useMap();
        map.setView(center, map.getZoom());
        return null;
    };

    // Reverse geocoding function to get location name from coordinates
    const reverseGeocode = async (lat, lon) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const name = data.display_name || 'Unknown Location';
            setLocationName(name);
            console.log('Reverse geocode result:', name);  // Debugging line
            return name;
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            setLocationName('Unknown Location');
            return 'Unknown Location';
        }
    };

    // Map event handler for clicking on the map
    const MapEvents = () => {
        useMapEvents({
            click: async (event) => {
                const { lat, lng } = event.latlng;
                setPosition({ lat, lng });
                console.log('Map clicked at lat:', lat, 'lng:', lng);  // Debugging line
                const name = await reverseGeocode(lat, lng);
                if (onLocationSelect) {
                    console.log('Location selected:', { name, coordinates: { lat, lng } });  // Debugging line
                    onLocationSelect({
                        name,
                        coordinates: {
                            lat,
                            lng,
                        },
                    });
                }
            },
        });
        return null;
    };

    // Search handler
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data.length > 0 ? data : []);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    // Handler for selecting a location from search results
    const handleSelectLocation = async (lat, lon, displayName) => {
        const selectedPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(selectedPosition);
        setLocationName(displayName);
        setSearchResults([]);
        if (onLocationSelect) {
            console.log('Location selected from search:', { name: displayName, coordinates: { lat: selectedPosition.lat, lng: selectedPosition.lng } });  // Debugging line
            onLocationSelect({
                name: displayName,
                coordinates: {
                    lat: selectedPosition.lat,
                    lng: selectedPosition.lng,
                },
            });
        }
    };

    // Handler to get the user's current location
    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const userPosition = { lat: latitude, lng: longitude };
                setPosition(userPosition);
                const name = await reverseGeocode(latitude, longitude);
                if (onLocationSelect) {
                    console.log('Using current location:', { name, coordinates: { lat: latitude, lng: longitude } });  // Debugging line
                    onLocationSelect({
                        name,
                        coordinates: {
                            lat: latitude,
                            lng: longitude,
                        },
                    });
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to retrieve your location.');
            }
        );
    };

    // Save location name after editing
    const handleSaveLocationName = () => {
        setIsEditing(false);
        if (onLocationSelect) {
            console.log('Saving location name:', { name: locationName, coordinates: { lat: position.lat, lng: position.lng } });  // Debugging line
            onLocationSelect({
                name: locationName,
                coordinates: {
                    lat: position.lat,
                    lng: position.lng,
                },
            });
        }
    };

    return (
        <div>
            {/* Instructional Text */}
            <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                Search for your location or click on the map
            </div>

            {/* Search Input and Buttons */}
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for location"
                    style={{ padding: '5px', width: '70%', marginRight: '10px' }}
                />
                <button onClick={handleSearch} style={{ padding: '5px' }}>Search</button>
                <button onClick={handleUseMyLocation} style={{ padding: '5px', marginLeft: '10px' }}>
                    Use My Location
                </button>
            </div>

            {/* Display Search Results */}
            {searchResults.length > 0 && (
                <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}>
                    {searchResults.map((result) => (
                        <button
                            key={result.place_id}
                            onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'left',
                                marginBottom: '5px',
                                padding: '5px',
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {result.display_name}
                        </button>
                    ))}
                </div>
            )}

            {/* Editable Location Name */}
            <div style={{ marginBottom: '10px' }}>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            style={{ padding: '5px', marginRight: '10px', width: '60%' }}
                        />
                        <button onClick={handleSaveLocationName} style={{ padding: '5px' }}>Save</button>
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '16px', marginRight: '10px' }}>{locationName}</span>
                        <button onClick={() => setIsEditing(true)} style={{ padding: '5px' }}>Edit</button>
                    </>
                )}
            </div>

            {/* Map Component */}
            <MapContainer center={position || [-1.286389, 36.817223]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && (
                    <>
                        <Marker position={position} icon={customIcon}>
                            <Popup>{locationName}</Popup>
                        </Marker>
                        <MapCenterUpdater center={position} />
                    </>
                )}
                <MapEvents />
            </MapContainer>
        </div>
    );
};

export default LocationPicker;
