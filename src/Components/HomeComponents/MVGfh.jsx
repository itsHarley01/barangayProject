import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database'; // Import appropriate methods for Realtime Database

function MVGfh() {
  const [captainImageUrl, setCaptainImageUrl] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const captainRef = ref(db, 'page-info/captain-details/imageUrl');
      const mvgRef = ref(db, 'page-info/mvg');

      try {
        const captainSnapshot = await get(captainRef);
        const mvgSnapshot = await get(mvgRef);

        if (captainSnapshot.exists()) {
          setCaptainImageUrl(captainSnapshot.val() || '');
        }

        if (mvgSnapshot.exists()) {
          const mvgData = mvgSnapshot.val();
          setMission(mvgData.mission || '');
          setVision(mvgData.vision || '');
          setGoals(mvgData.goal || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
<div className="flex items-center justify-center my-10 mx-auto h-full">
  <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg p-6 items-center">
    <div className="md:w-1/3">
      {captainImageUrl && (
        <img src={captainImageUrl} alt="Mission Vision Goal" className="w-full " />
      )}
    </div>
    <div className="md:w-2/3 md:pl-4">
      <h2 className="text-lg font-semibold">Mission</h2>
      <p>{mission}</p>
      <h2 className="text-lg font-semibold">Vision</h2>
      <p>{vision}</p>
      <h2 className="text-lg font-semibold">Goal</h2>
      <p>{goals}</p>
    </div>
  </div>
</div>

  );
}

export default MVGfh;
