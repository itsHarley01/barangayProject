import HeroP from '../../Components/HeroP'
import StaticNavBar from '../../Components/Navigation/StaticNavBar'
import img from '../../assets/Images/pmock.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'


function DownloadApp() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleDownload = () => {
    alert('Coming Soon...');
  };


  return (
    <div>
        <StaticNavBar />
        <HeroP text='Download Application'/>
        <div className='flex w-full h-full flex-col'>
          <div className="w-full mt-[20vh] mb-[10vh] h-[50vh] flex bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6">
           <div className="flex-1 flex items-center justify-center">
            <img src={img} alt="Mock up" />
           </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl text-white mb-4">Mobile Application</h1>
            <p className="text-white mb-6">Introducing our new mobile app! Stay connected with our community and access local Barangay services—all from your phone. Download now for convenience at your fingertips.</p>
          </div>
          </div>

          
          <div className='flex flex-col items-center mx-36 my-10'>
            <h1 className='text-3xl mb-6 font-semibold text-gray-600'>Download Latest Version</h1>
            <div className='flex flex-col items-left border w-full border-gray-200 p-8 rounded-lg shadow-lg'>
              <p className='text-xl mb-4'>APK Version 1.0.0</p>
              <p className='mb-4'>Release Date: coming soon</p>
              <p className='mb-4'>File Size: 0mb</p>
              <p className='mb-8'>Compatibility: Android 8.0 and above</p>
              <button
                onClick={handleDownload}
                className='bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full transition duration-300 cursor-pointer'
              >
                Download APK
              </button>
            </div>
          </div>

          <div className='flex flex-col mx-36 bg-blue-200 p-10 mb-10'>
                    <p className="text-lg">For inquiries or further information, feel free to contact us:</p>
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
  )
}

export default DownloadApp