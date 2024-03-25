import MissionVisionGoal from '../../../Components/ManageGeneralComponent/MissionVisionGoal';
import ContactInfo from '../../../Components/ManageGeneralComponent/ContactInfo';
import { useState } from 'react';
import CaptainDetails from '../../../Components/ManageGeneralComponent/CaptainDetails';

function General() {
  const [showMVG, setShowMVG] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showCaptainDetails, setShowCaptianDetails] = useState(false)

  const handleOnlickMVG = () =>{
    if(!showMVG){
      setShowMVG(true)
    }else{
      setShowMVG(false)
    }
  }

  const handleOnlickContact = () =>{
    if(!showContact){
      setShowContact(true)
    }else{
      setShowContact(false)
    }
  }

  const handleOnlickCaptain = () =>{
    if(!showCaptainDetails){
      setShowCaptianDetails(true)
    }else{
      setShowCaptianDetails(false)
    }
  }

  return (
    <div className=' w-full h-[77vh] overflow-y-scroll p-5 border'>
      <MissionVisionGoal showMVG={showMVG} onclick={handleOnlickMVG} />
      <ContactInfo showContact={showContact} onclick={handleOnlickContact}/>
      <CaptainDetails showCaptain={showCaptainDetails} onclick={handleOnlickCaptain} />
    </div>
  );
}

export default General;
