import React from 'react';

interface PlaceCardProps {
  name: string;
  image: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ name, image }) => {
  return (
    <div className="bg-white shadow-sm hover:shadow-lg transition-shadow-300 duration-100 rounded-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg text-center font-bold">{name}</h3>
      </div>
    </div>
  );
};

export default PlaceCard;
