import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase/Firebase";
import { onValue, ref, remove } from "firebase/database";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import NewsCard2 from "./NewsCard2";

function ManageNewsList() {
  const [newsList, setNewsList] = useState([]);
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
        setNewsList(newsArray);
      }
    });

    return () => {
      // Clean up event listener
      // This is optional if you're using onValue as it handles cleanup internally
    };
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this news?");
    if (confirmDelete) {
      const newsRef = ref(db, `page-info/news/${id}`);
      remove(newsRef)
        .then(() => {
          setNewsList((prevNewsList) =>
            prevNewsList.filter((news) => news.id !== id)
          );
          console.log("News deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting news: ", error);
        });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5 overflow-y-scroll h-[60vh]">
      {newsList.map((news) => (
        <NewsCard2
          key={news.id}
          image={news.image}
          title={news.title}
          des={news.description}
          onDelete={() => handleDelete(news.id)}
        />
      ))}
      {loading && <LoadingAnimation />}
    </div>
  );
}

export default ManageNewsList;
