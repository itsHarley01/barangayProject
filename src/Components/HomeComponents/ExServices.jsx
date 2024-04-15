import { FaHome, FaUser, FaFileAlt } from 'react-icons/fa';

function ExServices() {
  
  const ServiceItem = ({ icon, title }) => (
    <div className='flex flex-col items-center mx-4'>
      {icon}
      <span>{title}</span>
    </div>
  );

  return (
    <div>
        <div className='justify-center  text-center w-1/2 mx-auto'>
            <h1 className="text-3xl">Explore our Services</h1>
            <div className='flex  flex-col md:flex-row gap-6 my-10 justify-center border shadow-md py-10 px-10'>
              <ServiceItem icon={<FaHome className='text-blue-300' size={40} />} title="Barangay Clearance" />
              <ServiceItem icon={<FaUser className='text-blue-300' size={40} />} title="Barangay Indigency" />
              <ServiceItem icon={<FaFileAlt className='text-blue-300' size={40} />} title="Complaints" />
            </div>

            <div className="flex">

            </div>
        </div>
    </div>
  )
}

export default ExServices