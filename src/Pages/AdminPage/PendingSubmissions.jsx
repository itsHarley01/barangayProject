import { useState, useEffect } from "react";
import { getDatabase, ref, push, remove, update, get, set, onValue } from 'firebase/database';
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";
import Confirmation from "../../Components/PopUps/Confirmation";
import { getUnixTime, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import emailjs from '@emailjs/browser';

function PendingSubmissions() {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    fetchSubmissions(sortBy, searchTerm);
  }, [sortBy, searchTerm]);

  const fetchSubmissions = async (category, search) => {
    const db = getDatabase();
    const submissionsRef = ref(db, 'submissions/forms');
  
    onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allSubmissions = [];
        Object.keys(data).forEach((cat) => {
          if (cat === category || category === 'all') {
            const submissionsData = data[cat]?.pending || {};
            Object.keys(submissionsData).forEach((submissionId) => {
              const submissionData = submissionsData[submissionId];
              const formattedSubmission = {
                id: submissionId,
                category: cat,
                displayCategory: getCategoryName(cat), 
                name: getSubmissionName(cat, submissionData),
                date: submissionData.dateSubmitted,
                details: getSubmissionDetails(cat, submissionData),
              };
              allSubmissions.push(formattedSubmission);
            });
          }
        });

        allSubmissions.sort((a, b) => new Date(b.date) - new Date(a.date));

        const filteredSubmissions = allSubmissions.filter(submission =>
          submission.name.toLowerCase().includes(search.toLowerCase()) ||
          submission.date.toLowerCase().includes(search.toLowerCase())
        );
        setLoading(false);
        setSubmissions(filteredSubmissions);
      } else {
        console.log('No data found for submissions.');
        setLoading(false);
      }
    });
  };
  


  // Helper functions for submission details formatting
  const getSubmissionDetails = (category, submissionData) => {
    switch (category) {
      case 'barangay-clearance':
        return {
          contact: submissionData.contact,
          dateSubmitted: submissionData.dateSubmitted,
          email: submissionData.email,
          firstName: submissionData.firstName,
          lastName: submissionData.lastName,
          sex: submissionData.sex,
          maritalStatus: submissionData.maritalStatus,
          middleName: submissionData.middleName,
          address: submissionData.address,
          reason: submissionData.reason,
        };
        case 'barangay-indigency':
          return {
            contact: submissionData.contact,
            dateSubmitted: submissionData.dateSubmitted,
            email: submissionData.email,
            firstName: submissionData.firstName,
            lastName: submissionData.lastName,
            sex: submissionData.sex,
            maritalStatus: submissionData.maritalStatus,
            middleName: submissionData.middleName,
            address: submissionData.address,
            reason: submissionData.reason,
          };
      case 'pwd':
      case 'senior':
        return {
          address: submissionData.address,
          age: submissionData.age,
          birthDate: submissionData.birthDate,
          contact: submissionData.contact,
          dateSubmitted: submissionData.dateSubmitted,
          email: submissionData.email,
          firstName: submissionData.firstName,
          idBack: submissionData.idBack,
          idFront: submissionData.idFront,
          lastName: submissionData.lastName,
          maritalStatus: submissionData.maritalStatus,
          middleName: submissionData.middleName,
        };
      default:
        return {};
    }
  };

  // Render category name based on category string
  const getCategoryName = (category) => {
    switch (category) {
      case 'barangay-clearance':
        return 'Barangay Clearance';
      case 'barangay-indigency':
          return 'Barangay Indigency';
      case 'pwd':
        return 'PWD Application';
      case 'senior':
        return 'Senior Citizen Application';
      default:
        return 'Unknown Category';
    }
  };

  // Render submission name based on category and submission data
  const getSubmissionName = (category, submissionData) => {
    switch (category) {
      case 'barangay-clearance':
        return `${submissionData.firstName} ${submissionData.lastName}`;
      case 'barangay-indigency':
        return `${submissionData.firstName} ${submissionData.lastName}`;
      case 'pwd':
        return `${submissionData.firstName} ${submissionData.lastName}`;
      case 'senior':
        return `${submissionData.firstName} ${submissionData.lastName}`;
      default:
        return 'Unknown Name';
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort dropdown change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle view details button click
  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    setShowDetails(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    if (selectedSubmission) {
      const { category, id, details, date } = selectedSubmission;
  
      setLoading(true);
  
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'MMMM dd yyyy');
      setFormattedDate(formattedDate);
      console.log(formattedDate);
  
      const formDataWithDate = {
        ...details,
        dateApproved: formattedDate,
      };
  
      const database = getDatabase();
      const pendingPath = `submissions/forms/${category}/pending/${id}`;
      let approvedPath = '';
  
      switch (category) {
        case 'barangay-clearance':
          approvedPath = `submissions/forms/${category}/accepted/${id}`;
          break;
        case 'barangay-indigency':
          approvedPath = `submissions/forms/${category}/approved/${id}`;
          break;
        default:
          console.error('Invalid category:', category);
          setLoading(false);
          return;
      }
  
      const psubmissionRef = ref(database, pendingPath);
      const approvedRef = ref(database, approvedPath);
  
      try {
        const pendingSnapshot = await get(psubmissionRef);
        if (pendingSnapshot.exists()) {
          const pendingData = pendingSnapshot.val();
          await set(approvedRef, { ...pendingData, ...formDataWithDate });
          await remove(psubmissionRef);
          console.log('Submission moved to approved successfully.');
  
          await sendEmail({ ...selectedSubmission.details, dateApproved: formattedDate, category:category });
          console.log('Email sent after form approval.');
          setLoading(false);
        } else {
          console.error('Pending submission not found.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error moving submission to approved:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
  
      setShowPopup(false);
      setShowDetails(false);
    } else {
      console.error('No selected submission found.');
      setLoading(false);
    }
  };
  

const sendEmail = async (formData) => {
  try {
    const templateParams = {
      to_email: formData.email, 
      message1: 'has been accepted',
      message2: 'You may now proceed to the Barangay for payment of the clearance fee.',
      category: getCategoryName(formData.category), 
      dateApproved: formData.dateApproved, 
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    const response = await emailjs.send(
      'service_v7dp4yg',
      'template_81jzmx4',
      templateParams,
      'AGpI6zeuhFsu1Ok5t'
    );

    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


  const handleCancel = () => {
    setShowPopup(false);
  };
  
  return (
    <div className="">

      <div className="flex items-center mt-10 mb-4">
        <input
          type="text"
          placeholder="Search Submission..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <h1 className="ml-5 mr-2">Sort by: </h1>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="mr-2 pr-3 py-2 border border-gray-300 rounded-tr-lg rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="barangay-clearance">Barangay Clearance</option>
          {/* <option value="pwd">PWD Application</option>
          <option value="senior">Senior Citizen Application</option> */}
          <option value="barangay-indigency">Barangay Indigency</option>
        </select>
      </div>

      <div className="border overflow-x-auto h-[63vh]">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 bg-white z-50">
            <tr className="">
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Date Submitted</th>
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 h-[calc(100% - 3.5rem)] overflow-y-auto">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap">{submission.displayCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap">{submission.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{submission.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-200 p-2 rounded-md font-semibold text-blue-900 hover:text-blue-700" onClick={() => handleViewDetails(submission)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && <LoadingAnimation />}
    
          {showDetails && selectedSubmission && (
                  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white py-10 w-[80vh] px-4 rounded-lg max-w-md h-[80vh] " style={{ maxHeight: '80vh' }}>
                      <div className="flex justify-between  border-b" >
                        <h1 className="text-xl pb-2 font-semibold">{selectedSubmission.displayCategory}</h1>
                        <div className="flex justify-end">
                          <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowDetails(false)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="overflow-y-scroll h-[90%] ">
                        {/* Baarangay Clerance view */}
                        {selectedSubmission.displayCategory === 'Barangay Clearance' && (
                          <div className="flex flex-col space-y-4 border border-gray-300 rounded-lg p-4">
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Date Submitted:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.dateSubmitted}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">First Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.firstName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Middle Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.middleName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Last Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.lastName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Sex:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.sex}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Marital Status:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.maritalStatus}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Address:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.address}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Contact:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.contact}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Email:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.email}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold">Reason:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.reason}</span>
                            </div>
                          </div>
                        )}
                        {selectedSubmission.displayCategory === 'Barangay Indigency' && (
                          <div className="flex flex-col space-y-4 border border-gray-300 rounded-lg p-4">
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Date Submitted:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.dateSubmitted}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">First Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.firstName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Middle Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.middleName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Last Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.lastName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Sex:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.sex}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Marital Status:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.maritalStatus}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Address:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.address}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Contact:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.contact}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Email:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.email}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold">Reason:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.reason}</span>
                            </div>
                          </div>
                        )}
                        {selectedSubmission.displayCategory === 'PWD Application' && (
                          <div className="flex flex-col space-y-4 border border-gray-300 rounded-lg p-4">
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Date Submitted:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.dateSubmitted}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">First Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.firstName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Middle Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.middleName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Last Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.lastName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Age:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.age}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Birth Date:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.birthDate}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Marital Status:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.maritalStatus}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Contact:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.contact}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Email:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.email}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold">Address:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.address}</span>
                            </div>
                            {/* Include ID images if available */}
                            {selectedSubmission.details.idFront && (
                              <div className="mt-4">
                                <span className="font-semibold">ID Front:</span>
                                <img src={selectedSubmission.details.idFront} alt="ID Front" className="block mt-2" style={{ maxWidth: '100%' }} />
                              </div>
                            )}
                            {selectedSubmission.details.idBack && (
                              <div className="mt-4">
                                <span className="font-semibold">ID Back:</span>
                                <img src={selectedSubmission.details.idBack} alt="ID Back" className="block mt-2" style={{ maxWidth: '100%' }} />
                              </div>
                            )}
                          </div>
                        )}
                        {selectedSubmission.displayCategory === 'Senior Citizen Application' && (
                          <div className="flex flex-col space-y-4 border border-gray-300 rounded-lg p-4">
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Date Submitted:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.dateSubmitted}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">First Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.firstName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Middle Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.middleName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Last Name:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.lastName}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Age:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.age}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Birth Date:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.birthDate}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Marital Status:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.maritalStatus}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Contact:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.contact}</span>
                            </div>
                            <div className="grid grid-cols-2">
                            <span className="font-semibold">Email:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.email}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Address:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.address}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Age:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.age}</span>
                            </div>
                            <div className="grid grid-cols-2">
                              <span className="font-semibold">Marital Status:</span>
                              <span className="border border-gray-300 p-1">{selectedSubmission.details.maritalStatus}</span>
                            </div>
                            {/* Include ID images if available */}
                            {selectedSubmission.details.idFront && (
                              <div className="mt-4">
                                <span className="font-semibold">ID Front:</span>
                                <img src={selectedSubmission.details.idFront} alt="ID Front" className="block mt-2" style={{ maxWidth: '100%' }} />
                              </div>
                            )}
                            {selectedSubmission.details.idBack && (
                              <div className="mt-4">
                                <span className="font-semibold">ID Back:</span>
                                <img src={selectedSubmission.details.idBack} alt="ID Back" className="block mt-2" style={{ maxWidth: '100%' }} />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
    
                      <div className="pt-2">
                         <button className="w-full py-2 bg-green-400 text-gray-600 hover:bg-green-200 hover:text-blue-900" onClick={() => setShowPopup(true)}>{`${selectedSubmission.category === 'barangay-clearance' ? 'Accept form':'Approved form'}`}</button>
                      </div>
                        
                    </div>
                    {showPopup && (
                      
                      <Confirmation
                      text={`Mark this submission as ${selectedSubmission.category === 'barangay-clearance'? 'accepted':'approved'}?`}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        confirmText="Confirm"
                        cancelText="Cancel"
                      />
                    )}
                  </div>
                )}
              </div>
          );
        }
        
export default PendingSubmissions;

    
