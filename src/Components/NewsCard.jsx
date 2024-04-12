import React from 'react';
import { NavLink } from 'react-router-dom';

const NewsCard = ({ image, headerText, description, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border justify-center w-full h-[600px] flex flex-col"> 
      <img src={image} alt="News" className="w-full h-3/4 " />
      <div className="p-4 h-1/4 overflow-hidden">
        <h2 className="text-xl font-bold mb-2">{headerText}</h2> 
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600 pt-1">Date Published: {date}</p>
      </div>
      <NavLink className='m-5 p-2 mr-auto rounded-md bg-blue-200 text-blue-600 hover:bg-blue-100' to='/news'><p>Read More</p></NavLink>
    </div>
  );
};

export default NewsCard;
