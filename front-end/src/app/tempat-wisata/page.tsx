// pages/index.tsx
import React from 'react';
import Header from '../../components/dashboard/header';
import Footer from '@/src/components/dashboard/footer';
import PlaceList from '../../components/dashboard/tempatWisata/placeList';

const HomePage = () => {
  return (
    <div>
      <Header />
      <PlaceList />
      <Footer />
    </div>
  );
};

export default HomePage;
