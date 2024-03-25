import Hero from '../../Components/HeroP';
import img from "../../assets/Images/graph.png";
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

      <div className='justify-center text-center'>
        <div className='flex flex-col md:flex-row gap-6 my-10 justify-center border shadow-md py-5 px-10'>
          <ServiceItem icon={<FaHome className='text-blue-300' size={40} />} title="Barangay Clearance" />
          <ServiceItem icon={<FaWheelchair className='text-blue-300' size={40} />} title="PWD Application" />
          <ServiceItem icon={<FaUser className='text-blue-300' size={40} />} title="Senior Citizen Application" />
          <ServiceItem icon={<FaFileAlt className='text-blue-300' size={40} />} title="Complaints" />
        </div>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServicesCard img={brgycbg} reactIcon={<FaHome />} title="Barangay Clearance" path={'/barangay-clearance'} />
          <ServicesCard img={pwdbg} reactIcon={<FaWheelchair />} title="PWD Application" path={'/pwd-application'} />
          <ServicesCard img={senior} reactIcon={<FaUser />} title="Senior Citizen Application" path={'/senior-citizen-application'} />
          <ServicesCard img={complaint} reactIcon={<FaFileAlt />} title="Complaints" path={'/complaints'} />
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
