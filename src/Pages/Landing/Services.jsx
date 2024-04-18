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
  const clearanceFees = [
    { name: 'EMPLOYMENT', fee: 'P100.00' },
    { name: 'POLICE CLEARANCE', fee: 'P100.00' },
    { name: 'NBI CLEARACNE', fee: 'P100.00' },
    { name: 'RESIDENCY', fee: 'P100.00' },
    { name: 'LOAN', fee: 'P100.00' },
    { name: 'ELECTRICAL', fee: 'P100.00' },
    { name: 'WATER', fee: 'P100.00' },
    { name: 'MARRIEGE LICENSE', fee: 'P100.00' },
    { name: 'OPENING OF BANK ACCOUNT', fee: 'P100.00' },
    { name: 'POSTAL ID', fee: 'P100.00' },
    { name: 'PNP REQUIRMENT', fee: 'P100.00' },
    { name: 'BFP REQUIREMENT', fee: 'P100.00' },
    { name: 'BJMP REQUIREMENT', fee: 'P100.00' },
    { name: 'PSA', fee: 'P100.00' },
    { name: 'FILING FEE(SUMMON)', fee: 'P150.00' },
    { name: 'CERT. FEE(CERT. TO FILE ACTION)', fee: 'P100.00' },
    { name: 'DRIVERS LICENSE', fee: 'P150.00' },
    { name: 'VISA/PASSPORT', fee: 'P150.00' },
    { name: 'PROBATION', fee: 'P100.00' },
    { name: 'FIREARM LICENSE/LTOF', fee: 'P530.00' },
    { name: 'BAILBOND', fee: 'P1,030.00' },
    
  ];

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

      <div className='w-full bg-gray-100 flex'>
        <div className='w-1/2 mx-auto'>
          <div className='my-5 mx-10 '>
            <p className='w-full bg-yellow-200 border border-gray-400 text-3xl p-2 text-center'>Barangay Clerance Fees</p>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Clearance</th>
                  <th className="border border-gray-400 px-4 py-2">Fee</th>
                </tr>
              </thead>
              <tbody>
                {clearanceFees.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
