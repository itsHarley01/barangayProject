import { NavLink } from 'react-router-dom';

function ServicesCard({ title, path, reactIcon }) {
  return (
    <div className="w-[50vh] h-full relative border rounded-md mx-5 py-3">
      <div className="relative h-full">
        <div className="absolute right-[50%] inset-0 bg-gradient-to-l from-white to-transparent z-20"></div>
        <div className="absolute left-[50%] w-[50%] inset-0 bg-white z-20"></div>
        {reactIcon && <div className="text-[10rem] ml-5 text-blue-400   z-10 relative">{reactIcon}</div>}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-30">
          <p className="text-3xl text-center px-2 font-semibold text-black pb-3">{title}</p>
          <NavLink className="w-[1/2] rounded-md bg-pink-400 font-semibold p-2 text-center hover:bg-pink-200 hover:border hover:border-black" to={path}>Apply Now</NavLink>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;
