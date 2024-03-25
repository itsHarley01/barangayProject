import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import { getUnixTime, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

function CreateNews() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const storage = getStorage();
    const folderRef = storageRef(storage, 'page-sources/news');
  
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
    const newsRef = dbRef(database, 'page-info/news');
    const newNewsRef = push(newsRef);

    
    const currentDate = getUnixTime(new Date() * 1000);
    const timeZone = 'Asia/Manila';
    const zonedDate = utcToZonedTime(currentDate, timeZone);
    const formatted = format(zonedDate, 'MMMM dd yyyy');
    setFormattedDate(formatted);
  
    const newNewsData = {
      image: image || '', 
      datePublished: formatted, 
      title,
      description,
    };
  
    try {
      await set(newNewsRef, newNewsData); 
      setImage(null);
      setTitle('');
      setDescription('');
      setFormattedDate('');
    
      window.location.href='/admin/manage-pages/news'
    } catch (error) {
      console.error('Error adding news:', error.message);
      alert('An error occurred while adding the news. Please try again.');
    }
  };
  

  return (
    <div className='m-5'>
      <h1 className="text-2xl text-pink-400 font-semibold mb-4">Create News</h1>
      <form onSubmit={handleSubmit}>
        <div className='border w-full p-4'>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 font-semibold py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="description" className="block font-semibold">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create News
          </button>
          <NavLink to='/admin/manage-pages/news' className=" bg-gray-500 mx-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Cancel
            </NavLink>
        </div>
      </form>
    </div>
  );
}

export default CreateNews;
