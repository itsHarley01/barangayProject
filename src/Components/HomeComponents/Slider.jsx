import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/Firebase';
import { onValue, ref } from 'firebase/database';
import NewsCard from '../../Components/NewsCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NewsSlider() {
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const newsRef = ref(db, 'page-info/news');

    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNewsData(newsArray);
      }
    });

    return () => {
      // Clean up event listener
      // This is optional if you're using onValue as it handles cleanup internally
    };
  }, []);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + newsData.length) % newsData.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % newsData.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  return (
    <div className="m-8 md:m-8 lg:m-12 xl:m-40 ">
      <div className="pl-10 w-full text-left font-semibold text-4xl font-sans border-b pb-2"> 
        Get Updated with the news!
      </div>
      <Slider {...settings}>
        {newsData.map((news) => (
          <div key={news.id}>
            <div className="bg-white overflow-hidden">
              <NewsCard
                image={news.image}
                headerText={news.title}
                description={news.description}
                date={news.datePublished}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewsSlider;
