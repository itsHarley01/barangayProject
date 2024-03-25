import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';

function AddOfficial() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const storage = getStorage();
    const folderRef = storageRef(storage, 'page-sources/officials');
  
    try {
      const imageRef = storageRef(folderRef, file.name);
      const uploadTask = uploadBytesResumable(imageRef, file);
  
      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, 
          (error) => {
            reject(error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImage(downloadURL);
              resolve();
            });
          }
        );
      });
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('An error occurred while uploading the image. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const database = getDatabase();
    const officialsRef = dbRef(database, 'page-info/officials');
    const newOfficialRef = push(officialsRef);
  
    const newOfficialData = {
      image: image || '', 
      title,
      name,

    };
  
    try {
      await set(newOfficialRef, newOfficialData); 
      setImage(null);
      setTitle('');
      setName('');

      window.location.href='/admin/manage-pages/officials'
    } catch (error) {
      console.error('Error adding official:', error.message);
      alert('An error occurred while adding the official. Please try again.');
    }
  };
  


  return (
    <div>
      <div className='m-5'>
        <h1 className="text-2xl text-pink-400 font-semibold mb-4">Add Official</h1>
        <form onSubmit={handleSubmit}>
          <div className='border h-[85vh] w-full p-4 overflow-y-scroll'>
            <div className="mb-2">
                <label htmlFor="image" className="block font-semibold">Image:</label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageUpload}
                  className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {image && <img src={image} alt="Uploaded" className="mt-2 h-32" />}
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="title" className="block font-semibold">Title:</label>
                    <input
                        type="text"
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 w-full px-3 font-semibold py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
       
            <div className='mb-2'>
                <label htmlFor="name" className="block font-semibold">Name:</label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full px-3 font-semibold py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Add Official
            </button>
            <NavLink to='/admin/manage-pages/officials' className=" bg-gray-500 mx-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </div>

  );
}

export default AddOfficial;
