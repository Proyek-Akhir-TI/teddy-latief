"use client";

import React from 'react';
import Header from '../components/dashboard/header';
import HeroSection from '../components/dashboard/homepage/heroSection';
import Deskripsi from '../components/dashboard/homepage/deskripsi';
import PlaceList from '../components/dashboard/homepage/placeList';
import Footer from '../components/dashboard/footer';
import '../app/globals.css';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Deskripsi />
      <PlaceList />
      <Footer />
    </div>
  );
};

export default HomePage;
