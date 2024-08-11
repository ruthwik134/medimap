import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Testing = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [hospitalLocation, setHospitalLocation] = useState(null);
    const [route, setRoute] = useState([]);

    // Obtain User's Location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            findNearestHospital(latitude, longitude);
        });
    }, []);

    // Find Nearest Hospital using OpenStreetMap
    const findNearestHospital = (lat, lng) => {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=hospital&lat=${lat}&lon=${lng}`;

        fetch(nominatimUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat: hospitalLat, lon: hospitalLng } = data[0];
                    setHospitalLocation([hospitalLat, hospitalLng]);
                    calculateRoute(lat, lng, hospitalLat, hospitalLng);
                }
            });
    };

    // Calculate Route using OSRM
    const calculateRoute = (userLat, userLng, hospitalLat, hospitalLng) => {
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${hospitalLng},${hospitalLat}?overview=full&geometries=geojson`;

        fetch(osrmUrl)
            .then(response => response.json())
            .then(data => {
                const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                setRoute(routeCoordinates);
            });
    };

    return (
        <div>
            {userLocation && (
                <MapContainer center={userLocation} zoom={13} style={{ height: '100vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userLocation && <Marker position={userLocation} />}
                    {hospitalLocation && <Marker position={hospitalLocation} />}
                    {route.length > 0 && <Polyline positions={route} color="blue" />}
                </MapContainer>
            )}
        </div>
    );
};

export default Testing;
