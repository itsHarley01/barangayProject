import React from 'react';

function OfficialCard({ image, name, title }) {
  return (
    <div className="bg-white h-450px text-black rounded-xl mx-5 border ">
      <div className='h-56 flex justify-center items-center rounded-t-xl'>
        <img src={image} alt={name} className="h-44 w-44 border rounded-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-2">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-center">{title}</p>
      </div>
    </div>
  );
}

export default OfficialCard;
