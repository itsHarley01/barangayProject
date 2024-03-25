import React from "react";

const ManageOfficialsCards = ({ image, name, title, onDelete }) => {
  return (
    <div className="m-5 bg-white shadow-lg border rounded-lg relative">
      <button
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        onClick={onDelete}
      >
        Delete
      </button>
      <div className="flex justify-center m-2">
        <img className="h-48 border" src={image} alt={name} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default ManageOfficialsCards;
