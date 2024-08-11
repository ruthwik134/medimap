// src/components/MapView.js

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useEffect } from "react";
import { Circle } from "react-leaflet";
import { Polyline } from "react-leaflet";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { set } from "mongoose";

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
const limeOptions = { color: "lime" };
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapView = (props) => {
    const [locations, setLocations] = useState([]);
    const [first, setFirst] = useState(true);
    const [nearLoc, setNearLoc] = useState([]);
    const fillBlueOptions = { fillColor: "blue" };

    const fetchLocations = async () => {
        const response = await fetch("http://localhost:3000/find", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props.userloc),
        });

        const data = await response.json();
        console.log("the data is", data);
        console.log("the user location is", props.userloc);
        setLocations(data);
        setNearLoc(data[0]);
    };
    useEffect(() => {
        fetchLocations();
        setFirst(false);
    }, [first]);
    useEffect(() => {
        console.log("it is important");
        console.log(props.filLoc);
        if (props.filLoc.length > 0) {
            setLocations(props.filLoc);
        }
    }, [props.filLoc]);

    return (
        <MapContainer
            center={{
                lat: props.userloc.latitude,
                lng: props.userloc.longitude,
            }}
            zoom={10}
            style={{ height: "100vh", width: "100%" }}
        >
            //{" "}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Circle
                center={{
                    lat: props.userloc.latitude,
                    lng: props.userloc.longitude,
                }}
                pathOptions={fillBlueOptions}
                radius={2000}
            />
            {/* {console.log(locationsData)} */}
            {console.log(props.userloc, nearLoc)}
           
           
            <Marker
                icon={redIcon}
                position={{
                    lat: props.userloc.latitude,
                    lng: props.userloc.longitude,
                }}
            >
                <Popup>Your location</Popup>
            </Marker>
            {locations.length > 0 &&
                locations.map((loc, ind) => (
                    <Marker
                        position={{
                            lat: loc.location.coordinates[1],
                            lng: loc.location.coordinates[0],
                        }}
                        key={ind}
                    >
                        <Popup>
                            <span className="font-semibold">
                                {loc.Hospital} <br />
                            </span>
                            {loc.Address} <br />
                            {/* <ul>
                                {loc.Specialization.map((spec, ind) => (
                                    <li key={ind}>{spec}</li>
                                ))}
                            </ul> */}
                            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                {loc.Specialization.map((spec, ind) => (
                                    <li className="flex items-center" key={ind}>
                                        <svg
                                            className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
};

export default MapView;
