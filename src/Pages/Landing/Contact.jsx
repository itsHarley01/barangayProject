import React, { useState, useEffect } from 'react';
import Hero from '../../Components/HeroP';
import { FaPhone, FaEnvelope, FaMapMarker, FaFacebook } from 'react-icons/fa';
import { getDatabase, ref, get } from 'firebase/database';
import LoadingAnimation from '../../Components/Loading/LoadingAnimation';
import StaticNavBar from '../../Components/Navigation/StaticNavBar';
import emailjs from '@emailjs/browser';

function Contact() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [facebookPage, setFacebookPage] = useState('');
  const [loading, setLoading] = useState(true);

  const[sname, setSName] = useState('')
  const[semail, setSEmail] = useState('')
  const[smessage, setSMessage] = useState('')
  
  

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const serviceId = 'service_v7dp4yg'
    const templateId = 'template_kpkp48i'
    const publicKey = 'AGpI6zeuhFsu1Ok5t'

    const templateParams = {
      from_name: sname,
      from_email: semail,
      to_name: "Barangay Guadalupe",
      message: smessage
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log('Email sent successfully!', response);
      
      setSName('');
      setSEmail('');
      setSMessage('');
      alert('Thank you for sending your message!');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });


    
  };

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
      <div className="flex flex-col md:flex-row justify-center items-center border-t">
        <div className="w-full md:w-1/2 p-10 order-2 md:order-1">
          {/* Google Maps Embed */}
          <div>
            <p className="text-2xl font-semibold pl-10">Address</p>
          </div>
          <div className="w-full h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d981.3094864114088!2d123.88341306956328!3d10.322832918760033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99ecb61a2d209%3A0x4446727ef8fb4ce7!2sGuadalupe%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1710244375699!5m2!1sen!2sph"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className='w-full h-full'
            ></iframe>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-10 order-1 md:order-2">
          {/* Contact Form */}
          <form onSubmit={handleFormSubmit} className="bg-blue-100 flex flex-col p-6 rounded-lg shadow-md ">
            <p className="text-lg font-semibold mb-4">Send Us a Message</p>
            <label htmlFor="name" className="mb-2">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" className="rounded-md p-2 input-field mb-4" value={sname} onChange={(e) => setSName(e.target.value)} />

            <label htmlFor="email" className="mb-2">Email:</label>
            <input type="email" id="email" placeholder="Enter your email address" className="rounded-md p-2 input-field mb-4" value={semail} onChange={(e) => setSEmail(e.target.value)} />

            <label htmlFor="message" className="mb-2">Message:</label>
            <textarea id="message" placeholder="Enter your message" rows={4} className="rounded-md p-2 input-field mb-4" value={smessage} onChange={(e) => setSMessage(e.target.value)} />

            <button type="submit" className="bg-blue-300 px-5 ml-auto p-2 rounded-xl">Send</button>
          </form>
        </div>
      </div>
      {loading && <LoadingAnimation />}
    </div>
  );
}

// ContactInfo component for displaying contact information
// ContactInfo component for displaying contact information
const ContactInfo = ({ icon, title, info }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md truncate flex flex-col items-center text-center m-10">
    {icon}
    <p className="text-lg font-semibold">{title}</p>
    {title === 'Facebook Page' && info && (
      <a href={info} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        {info}
      </a>
    )}
    {title !== 'Facebook Page' && <p className="text-sm text-blue-500">{info}</p>}
  </div>
);


export default Contact;
