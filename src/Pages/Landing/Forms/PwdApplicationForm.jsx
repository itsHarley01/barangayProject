import React, { useState } from 'react';
import StepProgressBar from '../../../Components/StepProgressBar';
import HeroP from '../../../Components/HeroP';
import StaticNavBar from '../../../Components/Navigation/StaticNavBar';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref as dbRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import LoadingAnimation from '../../../Components/Loading/LoadingAnimation';
import { getUnixTime, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const PwdApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [agreement, setAgreement] = useState(false);
  const [postSubmit, setPostSubmit] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [formValues, setFormValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    birthDate:'',
    maritalStatus: '',
    contact: '',
    address: '',
    email: '',
    idFront: null,
    idBack: null,
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(step + 1);
    } else if (step === 2 && formValues.firstName && formValues.lastName) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleAgreementChange = (e) => {
    setAgreement(e.target.checked);
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    if (!frontImage || !backImage) {
      alert('Please upload both front and back images.');
      setLoading(false);
      return;
    }
  
    const storage = getStorage();
    const folderRef = storageRef(storage, 'Forms/pwd');
  
    const imageRefFront = storageRef(folderRef, `${frontImage.name}`);
    const imageRefBack = storageRef(folderRef, `${backImage.name}`);
  
    try {
      // Upload front image
      const frontSnapshot = await uploadBytesResumable(imageRefFront, frontImage);
      const downloadURLFront = await getDownloadURL(frontSnapshot.ref);
  
      // Upload back image
      const backSnapshot = await uploadBytesResumable(imageRefBack, backImage);
      const downloadURLBack = await getDownloadURL(backSnapshot.ref);

      const currentDate = getUnixTime(new Date() * 1000);
      const timeZone = 'Asia/Manila';
      const zonedDate = utcToZonedTime(currentDate, timeZone);
      const formatted = format(zonedDate, 'MMMM dd yyyy');
      setFormattedDate(formatted);
  
      // Update form values with download URLs
      const formDataWithDate = {
        ...formValues,
        dateSubmitted: formatted,
        idFront: downloadURLFront,
        idBack: downloadURLBack,
      };
  
      const database = getDatabase();
      const formRef = dbRef(database, 'submissions/forms/pwd/pending');
  
      // Push form data to the database
      await push(formRef, formDataWithDate);
  
      setPostSubmit(true);
    } catch (error) {
      console.error('Error submitting form or uploading images:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  


  
  return (
    <div>
        <StaticNavBar />
        <HeroP text='PWD Application'/>
        <div className="flex justify-center py-10 w-full h-full bg-gray-100">

          <div className="bg-white rounded-lg shadow-lg w-[60%]">
            <div className='text-center items-center w-full bg-blue-200 mb-10'>
              <h1 className='text-center text-2xl align-middle py-10'>PWD Application</h1>
            </div>
            <StepProgressBar currentStep={postSubmit ? 4 : step} totalSteps={3} /> 
             
            <div className="flex border p-2 m-2 flex-col ">
            {!postSubmit && (
              <>
              {step === 1 && (
                <div className='text-left'>
                  <h2 className="text-xl mb-4">Step 1: Requirements</h2>
                  <ul>
                    <li>-Personal info</li>
                    <li>-Contact info</li>
                    <li>-Valid Id</li>
                  </ul>
                  <p className='py-5'>By submitting your contact information for a PWD Application, you agree to keep it accurate and private. We'll use your information only for processing your application. </p>
                  <label className="">
                    <input type="checkbox" checked={agreement} onChange={handleAgreementChange} className="mr-2 mb-5" />
                    I agree and I want to continue.
                  </label>
                  <div className='justify-center text-center'>
                    <button onClick={handleNextStep} disabled={!agreement} className={`bg-blue-500 text-white px-4 py-2 rounded-md w-1/2 hover:bg-blue-600 ${!agreement && 'opacity-50 cursor-not-allowed'}`}>Next</button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className='flex flex-col'>
                  <h2 className="text-xl mb-4">Step 2: Personal Info</h2>
                  <label className="mb-2">
                    First Name:
                    <input type="text" name="firstName" value={formValues.firstName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    Middle Name:
                    <input type="text" name="middleName" value={formValues.middleName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    Last Name:
                    <input type="text" name="lastName" value={formValues.lastName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    Age:
                    <input type="text" name="age" value={formValues.age} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    Birth Date:
                    <input type="date" name="birthDate" value={formValues.birthDate} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    Marital Status:
                    <input type="text" name="maritalStatus" value={formValues.maritalStatus} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    Contact Number:
                    <input type="text" name="contact" value={formValues.contact} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    Address:
                    <input type="text" name="address" value={formValues.address} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <label className="mb-4">
                    email:
                    <input type="text" name="email" value={formValues.email} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                  </label>
                  <div className='flex'>
                    <button onClick={handlePrevStep} className="bg-gray-400 text-white px-4 py-2 w-1/2 rounded-md mr-2 hover:bg-gray-500">Back</button>
                    <button onClick={handleNextStep} disabled={!formValues.firstName || !formValues.lastName} className="bg-blue-500 w-1/2 text-white px-4 py-2 rounded-md hover:bg-blue-600">Next</button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className='flex flex-col'>
                  <p className='py-5'><b>Note:</b> Make sure that the images are is clear and readable</p>
                  <div className="mb-4 border">
                    <label htmlFor="front" className="mb-2 block font-semibold">Front of Valid ID:</label>
                    <input type="file" id="front" accept="image/*" onChange={(e) => setFrontImage(e.target.files[0])} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                    {frontImage && <img src={URL.createObjectURL(frontImage)} alt="Front of Valid ID" className="mt-2 w-1/2 h-auto" />}
                  </div>
                  <div className="mb-4 border">
                    <label htmlFor="back" className="mb-2 block font-semibold">Back of Valid ID:</label>
                    <input type="file" id="back" accept="image/*" onChange={(e) => setBackImage(e.target.files[0])} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
                    {backImage && <img src={URL.createObjectURL(backImage)} alt="Back of Valid ID" className="mt-2 w-1/2 h-auto" />}
                  </div>
                  <div className='flex'>
                    <button onClick={handlePrevStep} className="bg-gray-400 text-white px-4 py-2 w-1/2 rounded-md mr-2 hover:bg-gray-500">Back</button>
                    <button onClick={handleSubmit} className={`bg-blue-500 text-white w-1/2 px-4 py-2 rounded-md hover:bg-blue-600 ${frontImage && backImage ? '' : ''}`}>Submit</button>
                  </div>
                </div>
              )}
              </>
              )}
              {postSubmit && (
                <div className='flex flex-col'>
                  <h2 className="text-xl mb-4 "></h2>
                    <p className='text-center py-10'>Well done! You've finished filling out the form. Please wait for approval. We'll contact you shortly.</p>
                  <div className='flex justify-center'>
                    <NavLink to='/services' className="bg-gray-400 text-center text-white px-4 py-2 w-1/2 rounded-md mr-2 hover:bg-gray-500">Go Back</NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading && <LoadingAnimation/>}
    </div>
    
  );
};

export default PwdApplicationForm;

