import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { userContext } from "../context/userContext";

const TopFive = () => {
    const [insuranceData, setInsuranceData] = useState([]);
    const { LoginUser } = useContext(userContext);

    const fetchInsuranceData = async () => {
        if(!LoginUser){
            return
        }
        const response = await fetch(
            `http://localhost:3000/insurance/${LoginUser.email}`
        );
        const data = await response.json();
        setInsuranceData(data);
        console.log("the real data is", data);
    };

    useEffect(() => {
        fetchInsuranceData();
    }, []);
    return (
        <div className="container my-5 p-2  rounded-xl">
            <h1 className="font-bold text-3xl text-center ">
                Current Insurance Providers
            </h1>
            <div className="flex-wraper flex gap-5 ">
                {!insuranceData && (
                    <p className="bg-black">No active Insurance Plans available for the User</p>
                )}
                {insuranceData?.insurances?.length > 0 &&
                    insuranceData?.insurances.map((data) => (
                        <Card
                            key={data.id}
                            name={data.name}
                            coverage={data.coverage}
                            expiry={data.expiry}
                        />
                    ))}
            </div>
        </div>
    );
};

export default TopFive;
