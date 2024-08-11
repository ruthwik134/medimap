import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

// Create a custom icon for the marker
const redIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
});

const RoutingMachine = ({ userLocation, destination }) => {
    const map = useMap();
    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(userLocation), L.latLng(destination)],
            lineOptions: {
                styles: [{ color: "red", weight: 4 }],
            },
            createMarker: (i, waypoint, n) => {
                const icon = i === 0 ? redIcon : undefined;
                return L.marker(waypoint.latLng, { icon });
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, userLocation, destination]);

    return null;
};

const MapComponent = () => {
    const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default location
    const destination = [51.515, -0.1]; // Example destination

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        });
    }, []);

    return (
        <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: "600px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={userLocation} icon={redIcon} />
            <RoutingMachine
                userLocation={userLocation}
                destination={destination}
            />
        </MapContainer>
    );
};

export default MapComponent;
