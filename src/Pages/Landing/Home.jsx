
import Hero from "../../Components/HomeComponents/Hero"
import MVGfh from "../../Components/HomeComponents/MVGfh"
import MobileApp from "../../Components/HomeComponents/MobileApp"
import Officials from "../../Components/HomeComponents/Officials"
import Slider from "../../Components/HomeComponents/Slider"
import StaticNavBar from "../../Components/Navigation/StaticNavBar"
import { FaHome, FaUser, FaWheelchair, FaFileAlt } from 'react-icons/fa';


function Home() {

  const ServiceItem = ({ icon, title }) => (
    <div className='flex flex-col items-center mx-4'>
      {icon}
      <span>{title}</span>
    </div>
  );

  return (
    <div >
      <StaticNavBar />
      <Hero />
      <MVGfh />
      <Slider />
      <MobileApp />
      <Officials />
      
      <div className='justify-center  text-center w-1/2 mx-auto'>
        <h1 className="text-3xl">Explore our Services</h1>
        <div className='flex  flex-col md:flex-row gap-6 my-10 justify-center border shadow-md py-10 px-10'>
          <ServiceItem icon={<FaHome className='text-blue-300' size={40} />} title="Barangay Clearance" />
          <ServiceItem icon={<FaWheelchair className='text-blue-300' size={40} />} title="PWD Application" />
          <ServiceItem icon={<FaUser className='text-blue-300' size={40} />} title="Senior Citizen Application" />
          <ServiceItem icon={<FaFileAlt className='text-blue-300' size={40} />} title="Complaints" />
        </div>
      </div>
      
    </div>
  )
}


export default Home