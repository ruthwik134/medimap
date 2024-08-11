import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Location from "@/components/Location";
import PointRoute from "@/components/PointRoute";
import TopFive from "@/components/TopFive";
const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Location />
            <TopFive />
            <Footer />
        </div>
    );
};

export default HomePage;
