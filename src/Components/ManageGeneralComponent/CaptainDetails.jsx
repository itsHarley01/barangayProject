import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function CaptainDetails({showCaptain, onclick}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const nameRef = ref(database, '/page-info/captain-details/name');
      const descriptionRef = ref(database, '/page-info/captain-details/description');
      const imageRef = ref(database, '/page-info/captain-details/imageUrl');
      
      const nameSnapshot = await get(nameRef);
      if (nameSnapshot.exists()) {
        const nameData = nameSnapshot.val();
        setName(nameData || '');
      }

      const descriptionSnapshot = await get(descriptionRef);
      if (descriptionSnapshot.exists()) {
        const descriptionData = descriptionSnapshot.val();
        setDescription(descriptionData || '');
      }

      const imageSnapshot = await get(imageRef);
      if (imageSnapshot.exists()) {
        const imageData = imageSnapshot.val();
        setImageUrl(imageData || '');
      }
    };
    fetchData();
  }, []);

  const handleUpdateName = async () => {
    const database = getDatabase();
    const nameRef = ref(database, 'page-info/captain-details/name');
    await set(nameRef, name);
    setIsEditingName(false);
  };

  const handleUpdateDescription = async () => {
    const database = getDatabase();
    const descriptionRef = ref(database, 'page-info/captain-details/description');
    await set(descriptionRef, description);
    setIsEditingDescription(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const storage = getStorage();
    const folderRef = storageRef(storage, 'page-sources/captain-details');
  
    try {
      const imageRef = storageRef(folderRef, file.name);
      const uploadTask = uploadBytesResumable(imageRef, file);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading image:', error.message);
          alert('An error occurred while uploading the image. Please try again.');
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(downloadURL);
  
            const database = getDatabase();
            const imageRefInDB = ref(database, 'page-info/captain-details/imageUrl');
            await set(imageRefInDB, downloadURL);
  
            console.log('Image URL updated successfully');
          } catch (error) {
            console.error('Error updating image URL in the database:', error.message);
            alert('An error occurred while updating the image URL in the database.');
          }
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('An error occurred while uploading the image. Please try again.');
    }
  };
  

  const handleUpdateImage = async () => {
    if (imageUrl) {
      const database = getDatabase();
      const imageRef = ref(database, 'page-info/captain-details/imageUrl');
      await set(imageRef, imageUrl);
      setIsEditingImage(false);
    }
  };

  return (
    <div className="mt-2 border rounded-sm">
      <h1 className="text-2xl text-pink-400 font-semibold mb-4">Captain Details</h1>
      <button className='font-semibold w-full pl-2 my-2 bg-blue-300 text-left' onClick={onclick}>{showCaptain ? 'Minimize':'Show'}</button>
      {showCaptain && (
        <div className='grid grid-cols-2'>
          <div className='border flex  flex-col m-2'>
            {imageUrl && <img src={imageUrl} alt="Captain" className="h-full w-auto" />}
            {isEditingImage ? (
              <div>
                  <input className='m-2' type="file"  onChange={handleImageUpload} />
              </div>
            ) : (
              <div>
                  <button className="m-2   px-3 py-2 border rounded-md bg-blue-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" onClick={() => setIsEditingImage(true)}>Edit Image</button>
              </div>
            )}
            {isEditingImage && (
              <div className='ml-2'>
                <button className="mb-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2" onClick={handleUpdateImage}>Update Image</button>
                <button className="mb-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={() => setIsEditingImage(false)}>Cancel</button>
              </div>
            )}
          </div>
          <div className='flex m-2 h-full flex-col'>
            <div className="border p-3">
              <label htmlFor="name" className="block mb-1 font-semibold">Name:</label>
              {isEditingName ? (
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className='border px-3 py-2'>{name}</div>
              )}
              {isEditingName ? (
                <div>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2" onClick={handleUpdateName}>Update</button>
                  <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={() => setIsEditingName(false)}>Cancel</button>
                </div>
              ) : (
                <button className="my-2 px-3 py-2 border rounded-md bg-blue-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" onClick={() => setIsEditingName(true)}>Edit</button>
              )}
  
              <label htmlFor="description" className="block mt-4 mb-1 font-semibold">Description:</label>
              {isEditingDescription ? (
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className='border px-3 py-2'>{description}</div>
              )}
              {isEditingDescription ? (
                <div>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2" onClick={handleUpdateDescription}>Update</button>
                  <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={() => setIsEditingDescription(false)}>Cancel</button>
                </div>
              ) : (
                <button className="my-2 px-3 py-2 border rounded-md bg-blue-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" onClick={() => setIsEditingDescription(true)}>Edit</button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CaptainDetails;
