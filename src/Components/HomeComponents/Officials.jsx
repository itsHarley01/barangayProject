import { useEffect, useState } from "react";
import Slider from "react-slick";
import OfficialCard from "../OfficialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../../Firebase/Firebase";
import { onValue, ref, off } from "firebase/database";

function Officials() {
  const [officialsData, setOfficialsData] = useState([]);
  
  useEffect(() => {
    const officialsRef = ref(db, "page-info/officials");

    if (!officialsRef) return;

    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const officialsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOfficialsData(officialsArray);
      }
    };

    const onDataChange = onValue(officialsRef, handleData);

    return () => {
      off(officialsRef, "value", onDataChange);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Default number of slides to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides on screens smaller than 1024px
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 slide on screens smaller than 768px
        },
      },
    ],
  };

  return (
    <div className="w-3/4 m-auto my-20">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-2xl">Meet our</h1>
        <h1 className="text-4xl">Officials</h1>
      </div>
      <div className="mt-20">
        <Slider {...settings}>
          {officialsData.map((official) => (
            <OfficialCard
              key={official.id}
              image={official.image}
              name={official.name}
              title={official.title}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Officials;
