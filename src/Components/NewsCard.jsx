import React from 'react';

const NewsCard = ({ image, headerText, description, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border m-10">
      <img src={image} alt="News" className="w-full h-[60vh] object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{headerText}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600 pt-5">Date Published: {date}</p>
      </div>
    </div>
  );
};

export default NewsCard;
