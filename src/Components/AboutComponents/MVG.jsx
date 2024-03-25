import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import LoadingAnimation from '../Loading/LoadingAnimation';
import targetImage from '../../assets/Images/target.png';
import goalImage from '../../assets/Images/graph.png';
import visionImage from '../../assets/Images/vision.png';

function MVG() {
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const mvgRef = ref(database, 'page-info/mvg');
      const snapshot = await get(mvgRef);
      if (snapshot.exists()) {
        const mvgData = snapshot.val();
        setMission(mvgData.mission || '');
        setVision(mvgData.vision || '');
        setGoal(mvgData.goal || '');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center w-full my-24">
        <div className="w-1/3 pr-4 flex flex-col items-center">
          <img src={targetImage} alt="Mission" className="h-24 mb-4" />
          <div className="text-center">
            <p className="text-lg font-semibold">Our Mission</p>
            <p className="text-sm mx-10">{mission}</p>
          </div>
        </div>
        <div className="w-1/3 pr-4 border-x flex flex-col items-center">
          <img src={visionImage} alt="Vision" className="h-24 mb-4" />
          <div className="text-center">
            <p className="text-lg font-semibold">Our Vision</p>
            <p className="text-sm mx-10">{vision}</p>
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <img src={goalImage} alt="Goal" className="h-24 mb-4" />
          <div className="text-center">
            <p className="text-lg font-semibold">Our Goal</p>
            <p className="text-sm mx-10">{goal}</p>
          </div>
        </div>
      </div>
      {loading && <LoadingAnimation />}
    </div>
  );
}

export default MVG;
