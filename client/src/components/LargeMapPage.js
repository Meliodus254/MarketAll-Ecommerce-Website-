import React, { useState } from 'react'; 
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// Default marker icon
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const LargeMapPage = () => {
    const nairobiCoordinates = [-1.286389, 36.817223]; // Nairobi's latitude and longitude
    const [position, setPosition] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // Handle map click event to select location
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition(e.latlng);
                
                // Reverse geocoding to get the location name
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.display_name) {
                            setLocationName(data.display_name);
                        } else {
                            setLocationName('Custom Location');
                        }
                    })
                    .catch(() => setLocationName('Custom Location'));
            },
        });
        return null;
    };

    // Handle location search
    const handleSearch = async () => {
        if (!searchQuery) return;

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                setSearchResults(data);
            } else {
                console.log("No results found");
            }
        } catch (error) {
            console.error("Error while searching for location:", error);
        }
    };

    // Select a location from search results
    const handleSelectLocation = (lat, lon, displayName) => {
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setLocationName(displayName);
    };

    // Confirm the location and navigate back to the product create form
    const handleConfirmLocation = () => {
        if (position) {
            navigate(`/product-create?lat=${position.lat}&lng=${position.lng}&name=${locationName}`);
        } else {
            alert('Please select a location on the map.');
        }
    };

    // Hook to center the map when position changes
    const MapCenterUpdater = () => {
        const map = useMap();
        if (position) {
            map.setView([position.lat, position.lng], map.getZoom());
        }
        return null;
    };

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000, padding: '10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                {isEditingName ? (
                    <input
                        type="text"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', width: '200px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                ) : (
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {locationName || "Select a Location"}
                    </span>
                )}
                <button
                    onClick={() => setIsEditingName(!isEditingName)}
                    style={{ padding: '5px 10px', marginLeft: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    {isEditingName ? "Save" : "Edit"}
                </button>
            </div>

            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for location"
                style={{ padding: '10px', fontSize: '16px', width: '100%', position: 'absolute', top: '50px', left: '10px', zIndex: 1000 }}
            />
            <button onClick={handleSearch} style={{ padding: '10px', fontSize: '16px', position: 'absolute', top: '100px', left: '10px', zIndex: 1000 }}>
                Search
            </button>

            <div style={{ position: 'absolute', top: '150px', left: '10px', zIndex: 1000 }}>
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((result) => (
                            <li
                                key={result.place_id}
                                onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
                                style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9', marginBottom: '5px' }}
                            >
                                {result.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <MapContainer
                center={position || nairobiCoordinates}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && (
                    <Marker position={position} icon={customIcon}>
                        <Popup>{locationName}</Popup>
                    </Marker>
                )}
                <MapClickHandler />
                <MapCenterUpdater />
            </MapContainer>

            <button
                onClick={handleConfirmLocation}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '15px 30px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 1000,
                }}
            >
                Confirm Location
            </button>
        </div>
    );
};

export { LargeMapPage };
