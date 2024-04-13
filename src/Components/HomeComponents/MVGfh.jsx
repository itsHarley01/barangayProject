import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import img from '../../assets/Images/img1.jpg';
import { NavLink } from 'react-router-dom';

function MVGfh() {
  const [captainImageUrl, setCaptainImageUrl] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [goals, setGoals] = useState('');
  const [activeSection, setActiveSection] = useState('mission');
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const captainRef = ref(db, 'page-info/captain-details/imageUrl');
      const mvgRef = ref(db, 'page-info/mvg');

      try {
        const captainSnapshot = await get(captainRef);
        const mvgSnapshot = await get(mvgRef);

        if (captainSnapshot.exists()) {
          setCaptainImageUrl(captainSnapshot.val() || '');
        }

        if (mvgSnapshot.exists()) {
          const mvgData = mvgSnapshot.val();
          setMission(mvgData.mission || '');
          setVision(mvgData.vision || '');
          setGoals(mvgData.goal || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container mx-auto my-32 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-center my-10">

        <div className='sm:w-[40%] sm:mr-4 mb-4 sm:mb-0'>
          <img className='w-full' src={img} alt="" />
        </div>

        <div className="flex flex-col w-full sm:w-1/2 rounded-lg pl-5">

          <div className='text-4xl pb-6 font-semibold text-gray-800'>
            <p>The change starts within each of us, shaping a world of possibilities.</p>
          </div>

          <div className="flex mb-4 flex-wrap">
            <button
              className={`text-lg font-semibold mx-2 border p-2 px-4 shadow-md rounded-md hover:border-blue-400 ${activeSection === 'mission' ? 'active border-blue-600 border-2' : ''}`}
              onClick={() => handleSectionClick('mission')}
            >
              Mission
            </button>
            <button
              className={`text-lg font-semibold mx-2 border p-2 px-4 shadow-md rounded-md hover:border-blue-400 ${activeSection === 'vision' ? 'active border-blue-600 border-2' : ''}`}
              onClick={() => handleSectionClick('vision')}
            >
              Vision
            </button>
            <button
              className={`text-lg font-semibold mx-2 border p-2 px-4 shadow-md rounded-md hover:border-blue-400 ${activeSection === 'goals' ? 'active border-blue-600 border-2' : ''}`}
              onClick={() => handleSectionClick('goals')}
            >
              Goals
            </button>
          </div>

          <div className="text-left mb-20">
            {activeSection === 'mission' && <p>{mission}</p>}
            {activeSection === 'vision' && <p>{vision}</p>}
            {activeSection === 'goals' && <p>{goals}</p>}
          </div>

          <div className='flex flex-col mt-auto border-t'>
            <p>Contact us to ask any Questions</p>
            <div className="relative">
              <NavLink
                className='text-2xl text-blue-500 relative'
                to='/contact'
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
              >
                Contact us
                <span className={`inline-block transition-transform transform-gpu ${isHovered ? 'translate-x-2' : ''}`}>
                  →
                </span>
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MVGfh;
