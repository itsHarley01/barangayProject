import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/Firebase";
import { onValue, ref } from "firebase/database";
import StaticNavBar from "../../Components/Navigation/StaticNavBar";
import HeroP from "../../Components/HeroP";
import NewsCardNews from "../../Components/NewsCardNews";
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newsRef = ref(db, "page-info/news");

    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLoading(false);
        setNewsData(newsArray);
      }
    });

    return () => {
      // Clean up event listener
      // This is optional if you're using onValue as it handles cleanup internally
    };
  }, []);

  return (
    <div>
      <StaticNavBar />
      <HeroP text="Latest News" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-20 p-10">
        {newsData.map((news) => (
          <NewsCardNews
            key={news.id}
            image={news.image}
            headerText={news.title}
            description={news.description}
            date={news.datePublished}
          />
        ))}
      </div>

      {loading && <LoadingAnimation />}
    </div>
  );
}

export default News;
