import React, { useState } from 'react';

function FaqCard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="bg-white shadow-md mx-10 h-full transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-lg p-2 font-semibold">•{question}</h3>
        <button onClick={toggleAnswer} className="toggle-btn text-blue-900 p-2 text-3xl font-bold focus:outline-none">
          {showAnswer ? '-' : '+'}
        </button>
      </div>
      <div className={`answer overflow-hidden transition-all duration-300 ${showAnswer ? 'max-h-96' : 'max-h-0'}`}>
        <p className="bg-pink-200 p-2 text-gray-700">{answer}</p>
      </div>
    </div>
  );
}

export default FaqCard;
