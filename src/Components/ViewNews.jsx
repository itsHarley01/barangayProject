import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import { ref, get } from 'firebase/database';
import HeroP from "../Components/HeroP";
import StaticNavBar from "../Components/Navigation/StaticNavBar";

function ViewNews() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [fbLink, setFbLink] = useState('');
  const [address, setAddress] = useState('');


  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const snapshot = await get(ref(db, `/page-info/news/${id}`));
        if (snapshot.exists()) {
          setNewsItem(snapshot.val());
        } else {
          // Handle not found scenario
        }
      } catch (error) {
        // Handle fetch error
      }
    };

    fetchNewsItem();
  }, [id]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const contactSnapshot = await get(ref(db, '/page-info/contact'));
        if (contactSnapshot.exists()) {
          const { facebook, address } = contactSnapshot.val();
          setFbLink(facebook);
          setAddress(address);
        } else {
          // Handle not found scenario
        }
      } catch (error) {
        // Handle fetch error
      }
    };

    fetchContactInfo();
  }, []);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <StaticNavBar />
        <HeroP text="Read Event" />
        <div className='flex w-full'>
            <div className='flex flex-col mx-20'>
                <h1 className='text-5xl text-center m-10 font-semibold text-gray-800'>{newsItem.title}</h1>
                <div className='flex mx-auto w-full h-1/2'>
                    <img className='mx-auto' src={newsItem.image} alt="" />
                </div>
                <div className='flex flex-col mx-36 my-20 border-t'>
                    <p className='text-2xl pt-2'>{newsItem.description}</p>
                    <p className='mt-10'>Date Published: {newsItem.datePublished}</p>
                </div>
                <div className='flex flex-col mx-36 bg-blue-200 p-10 mb-10'>
                    <p className="text-lg ">If you want to know more about this event, visit our 
                    <a href={fbLink} target='_blank' className="text-blue-600 underline px-2 hover:text-indigo-800"> Facebook Page</a>
                    or come visit us at the Barangay:<p className='text-blue-600'>{address}</p>
                    </p>
                
                    <p className="text-lg mt-10">For inquiries or further information, feel free to contact us:</p>
                    <NavLink
                        className='text-2xl text-blue-600 relative bg-blue-300 mr-auto px-5 py-2 rounded-md'
                        to='/contact'
                        onMouseEnter={handleHover}
                        onMouseLeave={handleMouseLeave}
                        >Contact us
                        <span className={`inline-block transition-transform transform-gpu ${isHovered ? 'translate-x-2' : ''}`}>
                          →
                        </span>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ViewNews;
