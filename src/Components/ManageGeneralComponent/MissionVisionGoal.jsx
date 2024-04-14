import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import LoadingAnimation from '../Loading/LoadingAnimation';


function MissionVisionGoal({showMVG, onclick}) {
  const [loading, setLoading] = useState(true); 
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [goal, setGoal] = useState('');
  const [isEditingMission, setIsEditingMission] = useState(false);
  const [isEditingVision, setIsEditingVision] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempMission, setTempMission] = useState('');
  const [tempVision, setTempVision] = useState('');
  const [tempGoal, setTempGoal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const mvgRef = ref(database, 'page-info/mvg');
      const snapshot = await get(mvgRef);
      if (snapshot.exists()) {
        const mvgData = snapshot.val();
        setMission(mvgData.mission || '');
        setTempMission(mvgData.mission || '');
        setVision(mvgData.vision || '');
        setTempVision(mvgData.vision || '');
        setGoal(mvgData.goal || '');
        setTempGoal(mvgData.goal || '');
      }
      setLoading(false)
    };
    fetchData();
  }, []);

  const handleUpdateMission = async () => {
    const database = getDatabase();
    const mvgRef = ref(database, 'page-info/mvg/mission');
    await set(mvgRef, tempMission);
    setMission(tempMission);
    setIsEditingMission(false);
  };

  const handleUpdateVision = async () => {
    const database = getDatabase();
    const mvgRef = ref(database, 'page-info/mvg/vision');
    await set(mvgRef, tempVision);
    setVision(tempVision);
    setIsEditingVision(false);
  };

  const handleUpdateGoal = async () => {
    const database = getDatabase();
    const mvgRef = ref(database, 'page-info/mvg/goal');
    await set(mvgRef, tempGoal);
    setGoal(tempGoal);
    setIsEditingGoal(false);
  };

  return (
    <div className="border rounded-sm">
      <h1 className="text-2xl text-pink-400 font-semibold mb-4">Mission, Vision, Goal</h1>
      <button className='font-semibold px-2 mx-2 rounded-md my-2 bg-blue-300 text-left' onClick={onclick}>
        {showMVG ? 'Minimize Settings -' : 'Show Settings +'}
      </button>
      {showMVG &&(
        <div className='m-2 grid grid-cols-3 gap-4'>
        <div className="border p-3">
          <label htmlFor="mission" className="block mb-1 font-semibold">Mission:</label>
          {isEditingMission ? (
            <input
              type="text"
              id="mission"
              value={tempMission}
              onChange={(e) => setTempMission(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div className='w-96 max-w-full overflow-x-auto'>{mission}</div>
          )}
          {isEditingMission && (
            <div>
              <button onClick={handleUpdateMission} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => { setIsEditingMission(false); setTempMission(mission); }} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          )}
          {!isEditingMission && (
            <button onClick={() => setIsEditingMission(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit
            </button>
          )}
        </div>
        <div className="border p-3">
          <label htmlFor="vision" className="block mb-1 font-semibold">Vision:</label>
          {isEditingVision ? (
            <input
              type="text"
              id="vision"
              value={tempVision}
              onChange={(e) => setTempVision(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div>{vision}</div>
          )}
          {isEditingVision && (
            <div>
              <button onClick={handleUpdateVision} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => { setIsEditingVision(false); setTempVision(vision); }} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          )}
          {!isEditingVision && (
            <button onClick={() => setIsEditingVision(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit
            </button>
          )}
        </div>
        <div className="border p-3">
          <label htmlFor="goal" className="block mb-1 font-semibold">Goal:</label>
          {isEditingGoal ? (
            <input
              type="text"
              id="goal"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              className="w-full max-h-10 overflow-y-auto px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div>{goal}</div>
          )}
          {isEditingGoal && (
            <div>
              <button onClick={handleUpdateGoal} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">
                Update
              </button>
              <button onClick={() => { setIsEditingGoal(false); setTempGoal(goal); }} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          )}
          {!isEditingGoal && (
            <button onClick={() => setIsEditingGoal(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit
            </button>
          )}
        </div>
      </div>
      )}
      {loading && <LoadingAnimation/>}
    </div>
  );
}

export default MissionVisionGoal;
