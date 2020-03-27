import React from "react";
import Home from "../components/Home/Home";
import Header from "../components/AppHeader/Header";
import StatisticalChart from "../components/StatisticalChart/StatisticalChart";

function HomePage() {
    return (
        <>
            <Header/>
            <StatisticalChart/>
            <Home/>
        </>
    )
}

export default HomePage;