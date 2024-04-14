import React from 'react';
import { NavLink } from 'react-router-dom';

const NewsCardNews = ({ id, image, headerText, description, date }) => {
  return (
    <div className="bg-white flex flex-col rounded-lg h-full shadow-md border w-full"> 
      <img src={image} alt="News" className="w-auto h-auto object-cover " />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{headerText}</h2> 
        <p className="text-gray-600 h-[10vh] overflow-hidden">{description}</p>
        <p className="text-gray-600 pt-5">Date Published: {date}</p>
      </div>
      <NavLink
        className='m-5 p-2 mr-auto rounded-md bg-blue-200 text-blue-600 hover:bg-blue-100'
        to={`/news/${id}`} 
      >
        Read More
      </NavLink>
    </div>
  );
};

export default NewsCardNews;
