import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import img1 from '../../assets/Images/img1.jpg';
import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa';

import Hero from '../../Components/HeroP';
import MVG from '../../Components/AboutComponents/MVG';
import StaticNavBar from '../../Components/Navigation/StaticNavBar';

function About() {
  const [captainDetails, setCaptainDetails] = useState({ name: '', description: '', imageUrl: '' });
  const [facebookLink, setFacebookLink] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const db = getDatabase();

    const fetchData = async () => {
      try {
        // Fetch captain details
        const captainDetailsRef = ref(db, '/page-info/captain-details');
        const captainDetailsSnapshot = await get(captainDetailsRef);
        const captainData = captainDetailsSnapshot.val();

        if (captainData) {
          setCaptainDetails({
            name: captainData.name || '',
            description: captainData.description || '',
            imageUrl: captainData.imageUrl || ''
          });
        }

        const contactRef = ref(db, '/page-info/contact');
        const contactSnapshot = await get(contactRef);
        const contactData = contactSnapshot.val();
        setEmail(contactData.email || '');
        setPhone(contactData.phone || '');
        setFacebookLink(contactData.facebook || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <StaticNavBar />
      <Hero text='About Us' />
      
      {/* Captain Details */}
      <div className="pt-20 pb-40 mx-10 flex">
        {/* Image */}
        <div className="container">
          <div className="flex items-center  m-10">
            <div className="w-full md:w-1/2 flex items-center justify-end">
              <div className="">
                <img className="rounded-md w-[60vh] h-full" src={captainDetails.imageUrl} alt="Barangay Captain" />
              </div>
            </div>
            {/* Captain Info */}
            <div className="w-full md:w-1/2 pl-10 pr-10">
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{captainDetails.name}</h2>
                  <h6 className="left_line text-gray-500">Barangay Captain</h6>
                  <p className="text-gray-700 mt-4">{captainDetails.description}</p>

                  {/* Facebook Link */}
                  <div className="mt-5 flex items-center">
                    <div className="w-10 h-10 flex items-center rounded-md bg-gray-200 text-blue-600 justify-center mr-2">
                      <FaFacebook size={30} />
                    </div>
                    <a className='text-blue-500 hover:underline pl-5' href={facebookLink} target="_blank" rel="noopener noreferrer">
                      Visit our Facebook page 
                    </a>
                  </div>

                  {/* Email */}
                  <div className="mt-5 flex items-center">
                    <div className="w-10 h-10 flex items-center rounded-md bg-gray-200 text-blue-600 justify-center mr-2">
                      <FaEnvelope size={30} />
                    </div>
                    <p className='pl-5 text-blue-500'>{email}</p>
                  </div>

                  {/* Phone */}
                  <div className="mt-5 flex items-center">
                    <div className="w-10 h-10 flex items-center rounded-md bg-gray-200 text-blue-600 justify-center mr-2">
                      <FaPhone size={30} />
                    </div>
                    <p className='pl-5 text-blue-500'>{phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barangay Guadalupe Section */}
      <h1 className='font-semibold text-5xl mx-40 my-5 text-gray-700 border-b pb-5'>Barangay Guadalupe</h1>
      <div className="flex justify-center pt-10 mx-10">
        <div className="">
          <div className='mx-10 flex'>
            <img className='w-full h-[50vh]' src={img1} alt="Image" />
            <div className='mx-10 items-end'>
              <p className="text-black text-lg mt-5 max-w-lg text-left">
                We're thrilled to have you here. Our vibrant community, nestled in the heart of Guadalupe, seamlessly blends tradition and modernity. Explore local government services, community projects, and Applications and certificates. Thank you for visiting, and we hope you enjoy exploring all that Barangay Guadalupe has to offer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Text */}
      <body class="font-sans">
        <div class="container mx-auto my-5">
          <p class="text-lg text-gray-700 mb-6 mx-20">
            Welcome to Barangay Guadalupe a place renowned for its historic charm, cultural diversity, and strong community bonds.
            Our barangay is steeped in history, with iconic religious landmarks that symbolize our rich heritage.
            As we embrace the rapid pace of modern life, Guadalupe remains a unique and sought-after location,
            offering a blend of tradition and contemporary living that makes it a truly special place to call home.
          </p>
        </div>
      </body>

      {/* MVG Component */}
      <MVG />
    </div>
  );
}

export default About;
