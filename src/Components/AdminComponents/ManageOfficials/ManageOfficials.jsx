import { useEffect, useState } from "react";
import { db } from "../../../Firebase/Firebase";
import { onValue, ref, remove } from "firebase/database";
import LoadingAnimation from "../../Loading/LoadingAnimation";

import ManageOfficialsCards from "./ManageOfficialsCards";

function ManageOfficials() {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const officialsRef = ref(db, "page-info/officials");

    onValue(officialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const officialsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLoading(false);
        setOfficials(officialsArray);
      }
    });

    return () => {
      // Clean up event listener
      // This is optional if you're using onValue as it handles cleanup internally
    };
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Card?");
    if (confirmDelete) {
      const officialRef = ref(db, `page-info/officials/${id}`);
      remove(officialRef)
        .then(() => {
          setOfficials((prevOfficials) =>
            prevOfficials.filter((official) => official.id !== id)
          );
          console.log("Official deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting official: ", error);
        });
    }
  };

  return (
    <div className="grid grid-cols-3 w-full h-[59vh] border overflow-y-scroll">
      {officials.map((official) => (
        <ManageOfficialsCards
          key={official.id}
          image={official.image}
          name={official.name}
          title={official.title}
          onDelete={() => handleDelete(official.id)} 
        />
      ))}
      {loading && <LoadingAnimation/>}
    </div>
  );
}

export default ManageOfficials;
