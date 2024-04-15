import muPhone from '../../assets/Images/pmock.png'
import { NavLink } from 'react-router-dom'

function MobileApp() {
  return (
  <div id='mobile' className="w-full h-[50vh] flex bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6">
    <div className="flex-1 flex items-center justify-center">
      <img src={muPhone} alt="Mock up" />
    </div>

  <div className="flex-1 flex flex-col justify-center">
    <h1 className="text-4xl text-white mb-4">Mobile Application</h1>
    <p className="text-white mb-6">Introducing our new mobile app! Stay connected with our community and access local Barangay services—all from your phone. Download now for convenience at your fingertips.</p>
    <NavLink to='/download' className="w-64 bg-white text-blue-500 text-center px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white">Download Now</NavLink>
  </div>
</div>

  )
}

export default MobileApp