import { FaHome, FaUser, FaFileAlt } from 'react-icons/fa';
import img1 from '../../assets/Images/cappng.png'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function ExServices() {
  const [isHoveredClearance, setIsHoveredClearance] = useState(false);
  const [isHoveredIndigency, setIsHoveredIndigency] = useState(false);
  const [isHoveredComplaints, setIsHoveredComplaints] = useState(false);
  
  const handleHoverClearance = () => {
    setIsHoveredClearance(true);
  };

  const handleMouseLeaveClearance = () => {
    setIsHoveredClearance(false);
  };

  const handleHoverIndigency = () => {
    setIsHoveredIndigency(true);
  };

  const handleMouseLeaveIndigency = () => {
    setIsHoveredIndigency(false);
  };

  const handleHoverComplaints = () => {
    setIsHoveredComplaints(true);
  };

  const handleMouseLeaveComplaints = () => {
    setIsHoveredComplaints(false);
  };
  
  const ServiceItem = ({ icon, title }) => (
    <div className='flex flex-col items-center mx-4'>
      {icon}
      <span>{title}</span>
    </div>
  );

  return (
    <div>
        <div className='justify-center  text-center w-1/2 mx-auto mb-10'>
            <h1 className="text-3xl">Explore our Services</h1>
            <div className='flex  flex-col md:flex-row gap-6 my-10 justify-center border shadow-md py-10 px-10'>
              <ServiceItem icon={<FaHome className='text-blue-300' size={40} />} title="Barangay Clearance" />
              <ServiceItem icon={<FaUser className='text-blue-300' size={40} />} title="Barangay Indigency" />
              <ServiceItem icon={<FaFileAlt className='text-blue-300' size={40} />} title="Complaints" />
            </div>

            <div className="flex flex-col md:flex-row">
              <div className='flex w-full md:w-1/2'>
                <img src={img1} alt="" className="w-full" />
              </div>
              <div className='flex flex-col my-auto w-full md:w-1/2'>
                <NavLink
                        className='border border-gray-300 m-4 text-xl p-5 text-blue-400 hover:text-blue-600 hover:border-blue-500'
                        to='/barangay-clearance'
                        onMouseEnter={handleHoverClearance}
                        onMouseLeave={handleMouseLeaveClearance}
                        >Barangay Clearance
                        <span className={`inline-block transition-transform transform-gpu ${isHoveredClearance ? 'translate-x-4' : ''}`}>
                          →
                        </span>
                  </NavLink>
                  <NavLink
                        className='border border-gray-300 m-4 text-xl p-5 text-blue-400 hover:text-blue-600 hover:border-blue-500'
                        to='/barangay-indigency'
                        onMouseEnter={handleHoverIndigency}
                        onMouseLeave={handleMouseLeaveIndigency}
                        >Barangay Indigency
                        <span className={`inline-block transition-transform transform-gpu ${isHoveredIndigency ? 'translate-x-4' : ''}`}>
                          →
                        </span>
                  </NavLink>
                  <NavLink
                        className='border border-gray-300 m-4 text-xl p-5 text-blue-400 hover:text-blue-600 hover:border-blue-500'
                        to='/complaints'
                        onMouseEnter={handleHoverComplaints}
                        onMouseLeave={handleMouseLeaveComplaints}
                        >Complaints
                        <span className={`inline-block transition-transform transform-gpu ${isHoveredComplaints ? 'translate-x-4' : ''}`}>
                          →
                        </span>
                  </NavLink>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ExServices;
