import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import { FaBars } from 'react-icons/fa'; // Import the burger icon

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); 
  const dropdownRef = useRef(null); 
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
    if(!showDropdown){
      setShowDropdown(!false)
    }else{
      setShowDropdown(false)
    }
  };


  return (
    <div className={`fixed top-0 h-auto left-0 w-full flex flex-col justify-between px-4 py-2 z-50 bg-white/50 backdrop-blur-lg cursor-default transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className='flex justify-between text-center'>
        <img className='w-auto top-0 left-0 h-20' src={logo} alt="Barangay guadalupe logo" />
        <div className=' my-auto'>
          <FaBars className="text-xl md:hidden cursor-pointer right-0 justify-center" onClick={toggleDropdown} />
            {/* Conditional rendering of navLinks */}
          <div className="hidden md:flex right-0 gap-10">
            <NavLink className={`relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/' ? 'after:scale-x-100 after:bg-pink-500' : ''}`} to='/' >Home</NavLink>
            <NavLink className={`relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/about' ? 'after:scale-x-100 after:bg-pink-500' : ''}`} to='/about'>About</NavLink>
            <NavLink className={`relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/services' || activeLink === '/barangay-clearance' || activeLink === '/barangay-indigency' || activeLink === '/complaints' ? 'after:scale-x-100 after:bg-pink-500' : ''}`} to='/services'>Services</NavLink>
            <NavLink className={`relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/contact' ? 'after:scale-x-100 after:bg-pink-500' : ''}`} to='/contact'>Contact</NavLink>
            <NavLink className={`relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink.startsWith('/news') ? 'after:scale-x-100 after:bg-pink-500' : ''}`} to='/news'>Events</NavLink>
            <NavLink className={`relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/faq' ? 'after:scale-x-100 after:bg-pink-500' : ''}`} to='/faq'>FAQ</NavLink>
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      <div ref={dropdownRef} className={`md:hidden flex flex-col right-0 border-t border-gray-200 z-50 ${showDropdown ? 'block' : 'hidden'}`}>
        <NavLink className={` text-center ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/' ? 'after:scale-x-100 after:bg-pink-500' : ''} `} to='/'>Home</NavLink>
        <NavLink className={` text-center ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/about' ? 'after:scale-x-100 after:bg-pink-500' : ''} `} to='/about'>About</NavLink>
        <NavLink className={` text-center ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/services' ? 'after:scale-x-100 after:bg-pink-500' : ''} `} to='/services'>Services</NavLink>
        <NavLink className={` text-center ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/contact' ? 'after:scale-x-100 after:bg-pink-500' : ''} `} to='/contact'>Contact</NavLink>
        <NavLink className={` text-center ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink.startsWith('/news') ? 'after:scale-x-100 after:bg-pink-500' : ''} `} to='/news'>Events</NavLink>
        <NavLink className={` text-center ml-auto my-2 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-pink-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ${activeLink === '/faq' ? 'after:scale-x-100 after:bg-pink-500' : ''} `} to='/faq'>FAQ</NavLink>
      </div>
        

    </div>
  );
}

export default NavBar;


