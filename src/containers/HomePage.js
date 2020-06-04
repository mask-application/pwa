import React from 'react';
import Home from '../components/Home/Home';
import Header from '../components/AppHeader/Header';
import StatisticalChart from '../components/StatisticalChart/StatisticalChart';
import IranChart from '../components/StatisticalChart/Provinces/IranChart';

function HomePage() {
  return (
    <div style={{ overflowX: 'hidden', msOverflowY: 'auto', height: '100%' }}>
      <Header />
      <IranChart />
      <Home />
    </div>
  );
}

export default HomePage;
