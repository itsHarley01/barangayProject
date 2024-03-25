import React, { useState, useEffect } from 'react';
import Hero from '../../Components/HeroP';
import { FaPhone, FaEnvelope, FaMapMarker, FaFacebook } from 'react-icons/fa';
import { getDatabase, ref, get } from 'firebase/database';
import LoadingAnimation from '../../Components/Loading/LoadingAnimation';
import StaticNavBar from '../../Components/Navigation/StaticNavBar';

function Contact() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [facebookPage, setFacebookPage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const contactRef = ref(database, 'page-info/contact');
      const contactSnapshot = await get(contactRef);
      if (contactSnapshot.exists()) {
        const contactData = contactSnapshot.val();
        setPhone(contactData.phone || '');
        setEmail(contactData.email || '');
        setAddress(contactData.address || '');
        setFacebookPage(contactData.facebook || '');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <StaticNavBar />
      <Hero text='Contact' />

      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContactInfo icon={<FaPhone className="text-6xl m-10 text-sky-600" />} title="Phone" info={phone} />
          <ContactInfo icon={<FaEnvelope className="text-6xl m-10 text-sky-600" />} title="Email" info={email} />
          <ContactInfo icon={<FaMapMarker className="text-6xl m-10 text-sky-600" />} title="Address" info={address} />
          <ContactInfo icon={<FaFacebook className="text-6xl m-10 text-sky-600" />} title="Facebook Page" info={facebookPage} />
        </div>
      </div>

      {/* Google Maps Embed */}
      <div>
        <p className="text-2xl font-semibold pl-10">Address</p>
      </div>
      <div className="w-full h-[600px] p-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d981.3094864114088!2d123.88341306956328!3d10.322832918760033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99ecb61a2d209%3A0x4446727ef8fb4ce7!2sGuadalupe%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1710244375699!5m2!1sen!2sph"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className='w-full h-full'
        ></iframe>
      </div>
      {loading && <LoadingAnimation />}
    </div>
  );
}

// ContactInfo component for displaying contact information
const ContactInfo = ({ icon, title, info }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md truncate flex flex-col items-center text-center m-10">
    {icon}
    <p className="text-lg font-semibold">{title}</p>
    <p className="text-sm ">{info}</p>
  </div>
);

export default Contact;
