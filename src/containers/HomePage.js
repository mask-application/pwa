import React from "react";
import Home from "../components/Home/Home";
import Header from "../components/AppHeader/Header";
import ProvinceStatistics from "../components/ProvinceStatistics/ProvinceStatistics";

function HomePage() {
    return (
        <>
            <Header/>
            <ProvinceStatistics/>
            <Home/>
        </>
    )
}

export default HomePage;