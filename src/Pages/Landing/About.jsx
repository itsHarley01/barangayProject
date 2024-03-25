import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database'; // Import the get function from Firebase Realtime Database

import Hero from '../../Components/HeroP';
import MVG from '../../Components/AboutComponents/MVG';
import StaticNavBar from '../../Components/Navigation/StaticNavBar';

function About() {
  const [captainDetails, setCaptainDetails] = useState({ name: '', description: '', imageUrl: '' });

  useEffect(() => {
    const db = getDatabase(); // Initialize the database instance

    const fetchCaptainDetails = async () => {
      try {
        const captainDetailsRef = ref(db, '/page-info/captain-details'); // Create a reference to the captain details path
        const captainDetailsSnapshot = await get(captainDetailsRef); // Use the get function to fetch the data
        const captainData = captainDetailsSnapshot.val();
        
        if (captainData) {
          setCaptainDetails({
            name: captainData.name || '',
            description: captainData.description || '',
            imageUrl: captainData.imageUrl || ''
          });
        }
      } catch (error) {
        console.error('Error fetching captain details:', error);
      }
    };

    fetchCaptainDetails();
  }, []);

  return (
    <div>
      <StaticNavBar />
      <Hero text='About Us' />

      <div className="flex justify-center pt-10">
        <div className="text-center">
          <div className='text-black text-5xl'>Barangay Guadalupe</div>
          <p className="text-black text-lg mt-10 max-w-lg px-4 text-left">
            We're thrilled to have you here. Our vibrant community, nestled in the heart of Guadalupe, seamlessly blends tradition and modernity. Explore local government services, community projects, and Applications and certificates. Thank you for visiting, and we hope you enjoy exploring all that Barangay Guadalupe has to offer.
          </p>
        </div>
      </div>

      <div className="pt-20 pb-40 mx-10 flex">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2">
              <div className="pl-48 mb-10 ">
                <img className="rounded-lg" src={captainDetails.imageUrl} alt="Barangay Captain" />
              </div>
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-16">
              <div>
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">{captainDetails.name}</h2>
                    <h6 className="left_line">Barangay Captain</h6>
                    <p className="text-gray-700 mt-4">{captainDetails.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>

      </div>

      <MVG />
    </div>
  );
}

export default About;
