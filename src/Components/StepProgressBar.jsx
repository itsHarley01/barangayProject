import { FaCheck } from 'react-icons/fa';

const StepProgressBar = ({ currentStep, totalSteps }) => {
  const isStepCompleted = (stepNumber) => {
    return stepNumber < currentStep;
  };

  const getStepClassName = (stepNumber) => {
    return isStepCompleted(stepNumber) ? 'bg-green-500' : 'bg-gray-300';
  };

  const getLineClassName = (stepNumber) => {
    return isStepCompleted(stepNumber) ? 'bg-green-500' : 'bg-gray-300';
  };

  const getLineBetweenClassName = (stepNumber) => {
    return isStepCompleted(stepNumber) ? 'bg-green-500 px-20 px-20 mb-2 ' : 'bg-gray-300 px-20 mb-2 ';
  };

  const getStepContent = (stepNumber) => {
    if (isStepCompleted(stepNumber)) {
      return <FaCheck className="w-full h-full p-2 text-white" />;
    } else {
      return <span className="text-gray-900">{stepNumber}</span>;
    }
  };

  return (
    <div className="flex justify-center pb-3">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((stepNumber, index) => (
        <div key={stepNumber} className=" flex item-center justify-center items-center">
          {index > 0 && (
            <div className={` ${getLineClassName(stepNumber - 1)}`}></div>
          )}
          <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center justify-center ${getStepClassName(stepNumber)}`}>
            {getStepContent(stepNumber)}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-10 h-1 bg-gray-300 mt-3 ${getLineBetweenClassName(stepNumber)}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
