import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/Firebase';
import { onValue, ref } from 'firebase/database';
import NewsCard from '../NewsCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function NewsSlider() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="absolute top-0 right-0 flex items-center h-full" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="absolute top-0 left-0 flex items-center h-full z-50" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [newsData, setNewsData] = useState([]);
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const newsRef = ref(db, '/page-info/news');
    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newsArray = Object.values(data); 
        setNewsData(newsArray);
      }
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const slidesToShow = window.innerWidth <= 768 ? 1 : 3; // Adjust as needed
      setSettings({ ...settings, slidesToShow });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [settings, setSettings] = useState({
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3, 
    dots: true,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setNewsIndex(next),  
  });

  return (
    <div className="m-20 h-full" >
      <h1 className='w-full text-center text-4xl mb-20 font-semibold'>Get Updated with the Barangay</h1>
      <Slider {...settings}>
        {newsData.map((newsItem, idx) => (
          <div key={idx} className={idx === newsIndex ? "justify-center transform scale-100 opacity-100 transition-transform duration-300 w-full" : "justify-center opacity-50 transform scale-[0.6] transition-transform duration-300"}>
            <NewsCard   
              image={newsItem.image}
              headerText={newsItem.title}
              description={newsItem.description}
              date={newsItem.datePublished}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewsSlider;
