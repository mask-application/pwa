import React from "react";
import Home from "../components/Home/Home";
import Header from "../components/AppHeader/Header";
import StatisticalChart from "../components/StatisticalChart/StatisticalChart";

function HomePage() {
    return (
        <div style={{overflowX: "hidden", msOverflowY: "auto", height: '100%'}}>
            <Header/>
            <StatisticalChart/>
            <Home/>
        </div>
    )
}

export default HomePage;