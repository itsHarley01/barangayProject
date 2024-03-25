import { NavLink } from 'react-router-dom';

function ServicesCard({ img, title, path, reactIcon }) {
  return (
    <div className="w-full h-auto relative">
      <div
        className="relative bg-gray-100 py-10 px-20 mx-5 my-10  rounded-lg shadow-md flex flex-col items-center text-center"
        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', }}
      >
        {/* Fading shadow */}
        <div className="absolute inset-x-0 bottom-0 bg-gray-500 opacity-75 rounded-lg h-[100%]"></div>
        <div className='flex text-center align-middle' style={{ zIndex: 1 }}>
          {reactIcon && <div className="text-5xl text-blue-400 mb-4">{reactIcon}</div>}
          <p className="text-3xl px-2 font-semibold w-full text-white pb-3">{title}</p>
        </div>

        <div className='w-full' style={{ zIndex: 1 }}>
          <div className='pt-5'>
            <NavLink className='w-full rounded-md bg-blue-300 font-semibold p-2 ' to={path}>Apply Now</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;
