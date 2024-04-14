import Hero from '../../Components/HeroP';
import img from "../../assets/Images/95fbbb13-32e7-4037-a0b7-86d3c3d1027c.jpg";
import StaticNavBar from '../../Components/Navigation/StaticNavBar';
import brgycbg from '../../assets/Images/brgyclearancebg.jpg';
import pwdbg from '../../assets/Images/pwdbg.jpeg';
import senior from '../../assets/Images/senior.jpg';
import complaint from '../../assets/Images/complaint.jpg';
import ServicesCard from '../../Components/ServicesCard';
import { FaHome, FaUser, FaWheelchair, FaFileAlt } from 'react-icons/fa';

function Services() {
  return (
    <div>
      <StaticNavBar />
      <Hero text='Services' />

      <div className='flex mx-auto justify-center text-center w-1/2 '>
        <div className='flex flex-col md:flex-row gap-6 my-10 justify-center border shadow-md py-5 px-10'>
          <ServiceItem icon={<FaHome className='text-blue-300' size={40} />} title="Barangay Clearance" />
          <ServiceItem icon={<FaUser className='text-blue-300' size={40} />} title="Barangay Indigency" />
          <ServiceItem icon={<FaFileAlt className='text-blue-300' size={40} />} title="Complaints" />
        </div>
      </div>


      <div className=' mx-10 my-10 text-center border-b'><p className='text-3xl'>Online Services</p></div>
      <div className="flex justify-center items-center mb-10 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServicesCard img={''} reactIcon={<FaHome/>} title="Barangay Clearance" path={'/barangay-clearance'} />
          <ServicesCard img={''} reactIcon={<FaUser />} title="Barangay Indigency" path={'/barangay-indigency'} />
          <ServicesCard img={''} reactIcon={<FaFileAlt />} title="Complaints" path={'/complaints'} />
        </div>
      </div>

    </div>
  )
}

const ServiceItem = ({ icon, title }) => (
  <div className='flex flex-col items-center mx-4'>
    {icon}
    <span>{title}</span>
  </div>
);

export default Services;
