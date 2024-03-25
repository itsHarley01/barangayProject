import React, { useState, useEffect } from 'react';
import HeroP from "../../Components/HeroP";
import FaqCard from "../../Components/FaqComponent/faqCard";
import { getDatabase, ref, onValue } from 'firebase/database';
import LoadingAnimation from '../../Components/Loading/LoadingAnimation';
import StaticNavBar from '../../Components/Navigation/StaticNavBar';

function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const database = getDatabase();
    const faqsRef = ref(database, 'faqs');

    onValue(faqsRef, (snapshot) => {
      const faqsData = snapshot.val();
      if (faqsData) {
        const faqsArray = Object.keys(faqsData).map((key) => ({
          id: key,
          ...faqsData[key],
        }));
        setFaqs(faqsArray);
      } else {
        setFaqs([]);
      }
      setLoading(false);
    });

    return () => {
      onValue(faqsRef, null);
    };
  }, []);

  return (
    <div className="">
      <StaticNavBar/>
      <HeroP text='Frequently Asked Questions'/>

      <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-24">
  {faqs.map((faq) => (
    <div key={faq.id} className="flex flex-col gap-4 my-5">
      <FaqCard question={faq.question} answer={faq.answer} className="min-h-[10rem]" />
    </div>
  ))}
</div>

      {loading && <LoadingAnimation/>}
    </div>
  );
}

export default Faq;
