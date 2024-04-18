

const Confiramtion = ({ text, onConfirm, onCancel, confirmText, cancelText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg mb-4 text-black">{text}</p>
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onConfirm}>{confirmText}</button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={onCancel}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
};

export default Confiramtion;


//Notes
/*
import Confimation

 const [showPopup, setShowPopup] = useState(false);

 setShowPopup(true);
 setShowPopup(false);



const handleConfirm = () => {
  window.location.href='/'
  setShowPopup(false);
};

const handleCancel = () => {
  // Logic for canceling action
  setShowPopup(false);
};

  
 onClick={() => setShowPopup(true)}


 {showPopup && (
   <Confirmation
     text="Are you sure you want to proceed?"
     onConfirm={handleConfirm}
     onCancel={handleCancel}
     confirmText="Confirm"
     cancelText="Cancel"
   />
 )}

*/