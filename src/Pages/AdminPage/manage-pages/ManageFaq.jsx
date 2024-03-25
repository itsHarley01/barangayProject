import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, remove, onValue } from 'firebase/database';
import LoadingAnimation from '../../../Components/Loading/LoadingAnimation';

function ManageFaq() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [editModeId, setEditModeId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');

  useEffect(() => {
    const database = getDatabase();
    const faqRef = ref(database, 'faqs');
    const unsubscribe = onValue(faqRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const faqs = Object.entries(data).map(([id, { question, answer }]) => ({ id, question, answer }));
        setQuestions(faqs);
      } else {
        setQuestions([]);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleCreateFaq = () => {
    if (newQuestion && newAnswer) {
      const database = getDatabase();
      const faqRef = ref(database, 'faqs');
      push(faqRef, { question: newQuestion, answer: newAnswer });
      setNewQuestion('');
      setNewAnswer('');
    } else {
      alert('Please enter both question and answer.');
    }
  };

  const handleEditFaq = (id, question, answer) => {
    setEditModeId(id);
    setEditedQuestion(question);
    setEditedAnswer(answer);
  };

  const handleUpdateFaq = (id) => {
    const database = getDatabase();
    const faqRef = ref(database, `faqs/${id}`);
    set(faqRef, { question: editedQuestion, answer: editedAnswer });
    setEditModeId(null);
  };

  const handleDeleteFaq = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this FAQ?');
    if (confirmDelete) {
      const database = getDatabase();
      const faqRef = ref(database, `faqs/${id}`);
      remove(faqRef);
    }
  };

  return (
    <div className=''>
      <h1 className="text-2xl text-pink-400 font-semibold mb-4">Manage FAQs</h1>


      <div className="w-full h-[50%] border rounded-sm ">
        <h1 className=' p-2 font-semibold w-full bg-blue-400'>Add new FAQ</h1>
        <form onSubmit={handleCreateFaq}>
          <div className='flex w-full px-2'>
            <div className="w-full">
              <input
                placeholder='Question:'
                type="text"
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="mt-1 w-full px-3 font-semibold py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              /><textarea
                placeholder='Answer:'
                id="answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="resize-none w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className='py-5 mx-2'>
              <button type="submit" className="bg-gradient-to-r from-pink-500 to-blue-500 h-full text-white px-4 rounded-md hover:bg-gradient-to-r hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Create FAQ</button>
            </div>
          </div>
        </form>
        <h1 className=' p-2 font-semibold w-full bg-blue-400'>FAQ's</h1>
      </div>

      {/* Display existing FAQs */}
      <div className=' border h-[45vh] overflow-y-scroll'>
        {questions.map((faq) => (
          <div key={faq.id} className="m-2 border rounded-md p-4">
            {editModeId === faq.id ? (
              <div className="flex justify-between items-center">
                <div className='w-full'>
                  <label htmlFor="fq" className=''>Question:</label>
                  <input
                    type="text"
                    name='fq'
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    className="text-lg font-semibold w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <label htmlFor="fa" className=''>Answer:</label>
                  <input
                    name='fa'
                    type="text"
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    className="text-lg w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className='px-5'>
                  <button onClick={() => handleUpdateFaq(faq.id)} className="text-blue-500 mr-2">Update</button>
                  <button onClick={() => setEditModeId(null)} className="text-red-500">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className='flex flex-col'>
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                </div>
                <div>
                  <button onClick={() => handleEditFaq(faq.id, faq.question, faq.answer)} className="text-blue-500 flex mr-2">Edit</button>
                  <button onClick={() => handleDeleteFaq(faq.id)} className="text-red-500 flex">Delete</button>
                </div>
              </div>
              
            )}
          </div>
        ))} 
      </div>
      {loading && <LoadingAnimation />}
    </div>
  );
}

export default ManageFaq;
