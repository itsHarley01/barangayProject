import imgbg from '../../assets/Images/img2.jpg'
import {NavLink} from 'react-router-dom'

function Hero() {
  return (
    <div>
      <div id="about" className="relative h-screen w-full flex justify-start items-center">
        <div className="bg-cover bg-center h-auto absolute inset-0" style={{ backgroundImage: `url(${imgbg})`, opacity: '0.3' }}></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 text-left">
            <div className='text-black text-5xl mb-4'>Welcome to</div>
            <div className="relative">
              <span className="text-transparent pb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-7xl block font-semibold">Barangay Guadalupe</span>
            </div>
            <div className="text-black text-4xl mt-4">Official Website</div>

            <NavLink to='/about' className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-400 hover:to-blue-400 rounded-full px-4 py-2 text-white font-semibold transition duration-300 my-10">
              <p className='text-lg'>Learn More → </p>
            </NavLink>

          </div>
      </div>
    </div>
  )
}

export default Hero