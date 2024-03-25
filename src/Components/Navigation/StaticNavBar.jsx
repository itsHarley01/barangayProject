import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGlobe, FaBars } from 'react-icons/fa';
import logo from '../../assets/Images/logo.png';

const StaticNavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-full flex flex-col items-center top-0 absolute z-10">
      <div className='w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-1 px-4 flex items-center justify-between'>
        <div>
          <h1 className="text-sm font-bold">Open Hours of Barangay Guadalupe</h1>
          <p className="text-xs">Mon - Fri: 8.00 am - 6.00 pm</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaGlobe size={20} />
          <div className='gap-1 flex'>
            <button className="text-sm">English</button>
            <button className="text-sm">Cebuano</button>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between items-center px-4 py-2 '>
        <img className='w-20 h-20' src={logo} alt="Barangay Guadalupe Logo" />
        {isMobile ? (
          <div className='flex justify-between text-center'>
            <FaBars className="text-xl md:hidden cursor-pointer right-0 justify-center" onClick={toggleDropdown} />
          </div>
        ) : (
          <>
            <div className="hidden md:flex right-0 gap-10">
              <NavLink className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/'>Home</NavLink>
              <NavLink className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/about'>About</NavLink>
              <NavLink className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/services'>Services</NavLink>
              <NavLink className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/contact'>Contact</NavLink>
              <NavLink className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/news'>News</NavLink>
              <NavLink className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/faq'>FAQ</NavLink>
            </div>
          </>
        )}
      </div>
      <div className='ml-auto mr-2'>
      <div ref={dropdownRef} className={`md:hidden flex flex-col right-0 border-t border-gray-200 z-50 ${showDropdown ? 'block' : 'hidden'}`}>
        <NavLink className=" ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/'>Home</NavLink>
        <NavLink className=" ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/about'>About</NavLink>
        <NavLink className=" ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/services'>Services</NavLink>
        <NavLink className=" ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/contact'>Contact</NavLink>
        <NavLink className=" ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/news'>News</NavLink>
        <NavLink className=" ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left" to='/faq'>FAQ</NavLink>
      </div>

      </div>

    </div>
  );
}

export default StaticNavBar;
