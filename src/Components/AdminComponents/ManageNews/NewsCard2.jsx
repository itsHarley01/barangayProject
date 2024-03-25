import React from "react";

const NewsCard2 = ({ image, title, des, onDelete }) => {
  return (
    <div className="m-5 flex bg-white shadow-lg border rounded-lg relative">
      <div className="flex justify-center m-2">
        <img className="h-auto w-auto border" src={image} alt={title} />
      </div>
      <div className="flex flex-col">
        <div className="text-right mt-5 mr-2">
            <button className=" bg-red-500 text-white px-2 py-1 rounded" onClick={onDelete}>Delete</button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-500">{des}</p>
        </div>
      </div>

    </div>
  );
};

export default NewsCard2;
