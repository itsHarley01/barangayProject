import imgbg from '../assets/Images/logo.png';
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 pt-24">
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-32">
        <div id="left" className="lg:mr-8 flex items-center ">
          <img src={imgbg} alt="Logo" className="h-32 mb-2 mr-4" />
          <p className="p-2 text-sm w-48">Barangay Guadalupe: Embracing Diversity, Building Unity, and Fostering a Community where Harmony Prevails.</p>
        </div>
        <div id="right" className="text-center ">
          <h1 className="text-2xl font-semibold mb-4 text-left">More Pages</h1>
          <div className="grid grid-cols-2 gap-2">
            <ul className="text-lg text-left">
              <li><Link to='/contact' className="hover:underline">Contact</Link></li>
              <li><Link to='/services' className="hover:underline">Services</Link></li>
              <li><Link to='/about' className="hover:underline">About</Link></li>
            </ul>
            <ul className="text-lg text-left">
              <li><Link to='/privacy-policy' className="hover:underline">Privacy Policy</Link></li>
              <li><Link to='/download' className="hover:underline">Download App</Link></li>
              <li><Link to='/faq' className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div id="right" className="text-center ">
          <h1 className="text-2xl font-semibold mb-4 text-left">Services</h1>
          <div className="grid grid-cols-2 gap-2">
            <ul className="text-lg text-left">
              <li><Link to='/barangay-clearance'  className="hover:underline">Brgy. Clearance</Link></li>
              <li><Link to='/barangay-indigency'  className="hover:underline">Brgy. Indigency</Link></li>
              {/* <li><Link to='/pwd-application'  className="hover:underline">PWD Application</Link></li>
              <li><Link to='/senior-citizen-application'  className="hover:underline">Senior App.</Link></li> */}
            </ul>
            <ul className="text-lg text-left">
              <li><Link to='/complaints'  className="hover:underline">Complaints</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center pt-10">
        <p className="text-sm">&copy; 2024 | COPYRIGHT: Barangay Guadalupe</p>
      </div>
    </footer>
  );
}

export default Footer;
