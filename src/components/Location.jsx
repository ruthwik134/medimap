import React, { useRef, useState } from "react";
import { useEffect } from "react";
import MainForm from "./MainForm";
import MapView from "./Mapview";
import { useForm } from "react-hook-form";

const Location = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
    } = useForm();
    const [location, setLocation] = useState({
        latitude: 17.392178250125472,
        longitude: 78.31931877834387,
    });
    const [filteredLocations, setfilteredLocations] = useState([]);

    const [error, setError] = useState(null);
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };
    useEffect(() => {
        getLocation();
    }, []);

    const showPosition = (position) => {
        console.log("Geolocation is supported!");

        setLocation({
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
            latitude: 17.364505803582524,
            longitude: 78.47399117559762,
        });
    };

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.");
                break;
            default:
                setError("An unknown error occurred.");
                break;
        }
    };
    const onSubmit = async (data) => {
        console.log(data);
        let dataArray = data.sym;
        let realData = dataArray.replace(/\s/g, "").split(",");
        let num = realData.length;
        let sendData = {};
        for (let i = 0; i < num; i++) {
            sendData[`feature${i + 1}`] = realData[i];
        }
        console.log(sendData);
        if (data.status === "emergency") {
            let response = await fetch("http://localhost:3000/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(location),
            });
            let content = await response.json();
            setfilteredLocations(content);
        } else {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendData),
            });

            let content = await response.json();
            let insuranceProvider = data.ins;
            console.log(content.prediction, insuranceProvider);
            let sendObj = {
                spec: content.prediction,
                location: location,
                insurance: insuranceProvider,
            };
            console.log("compelted the form");
            const res = await fetch("http://localhost:3000/getdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendObj),
            });

            let realcontent = await res.json();
            console.log(realcontent);
            console.log("compelted the form");

            setfilteredLocations(realcontent.doc);
        }
    };

    return (
        <>
            <div className="main">
                <div className="wrapper flex ">
                    <div className="form w-[30%] flex justify-center ">
                        <MainForm onSubmitHandler={onSubmit} filLocLength={filteredLocations.length}/>
                    </div>
                    <div className="map w-[70%]">
                        {/* <MapView userloc={location}  /> */}
                        <MapView
                            userloc={location}
                            filLoc={filteredLocations}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Location;
