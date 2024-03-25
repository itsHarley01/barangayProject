import React from 'react';

function Card(props) {
    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-md">
            <div className="relative rounded-full overflow-hidden w-20 h-20">
                <img src={props.image} alt={props.title} className="object-cover w-full h-full" />
            </div>
            <div className="">
                <h2 className="text-lg font-bold">{props.title}</h2>
                <p className="text-sm">{props.description}</p>
            </div>
        </div>
    );
}

export default Card;
