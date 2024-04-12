import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';
import LoadingAnimation from "../../Components/Loading/LoadingAnimation";

function Complaints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [searchTerm]);

  const fetchSubmissions = async () => {
    const db = getDatabase();
    const submissionsRef = ref(db, 'submissions/forms/complaints');

    onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allSubmissions = Object.keys(data).map((submissionId) => {
          const submissionData = data[submissionId];
          return {
            id: submissionId,
            name: getSubmissionName(submissionData),
            date: submissionData.dateSubmitted,
            contact: submissionData.contact,
            email: submissionData.email,
            firstName: submissionData.firstName,
            middleName: submissionData.middleName,
            lastName: submissionData.lastName,
            complaintsT: submissionData.complaint, 
            details: submissionData,
          };
        });

        // Filter submissions based on search term
        const filteredSubmissions = allSubmissions.filter(submission =>
          submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.date.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setLoading(false);
        setSubmissions(filteredSubmissions);
      } else {
        console.log('No data found for submissions.');
        setLoading(false);
      }
    });
  };

  const getSubmissionName = (submissionData) => {
    const { firstName, middleName, lastName } = submissionData;
    return `${firstName} ${middleName} ${lastName}`;
  };
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    setShowDetails(true);
  };

  return (
    <div className="m-10">
      <h1 className='font-semibold text-3xl pb-4 border-b'>Complaints</h1>

      <div className="flex items-center mt-10 mb-4">
        <input
          type="text"
          placeholder="Search Complaints..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="border overflow-x-auto h-[69vh]">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 bg-white z-50">
            <tr className="">
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Date Submitted</th>
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 bg-blue-400 text-left text-xs font-semibold text-black uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 h-[calc(100% - 3.5rem)] overflow-y-auto">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap">{submission.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{submission.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{submission.contact}</td>
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
              <h1 className="text-xl pb-2 font-semibold">Complaint Details</h1>
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
              <div className="flex flex-col space-y-4 border border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-2">
                  <span className="font-semibold">First Name:</span>
                  <span className="border border-gray-300 p-1">{selectedSubmission.firstName}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-semibold">Middle Name:</span>
                  <span className="border border-gray-300 p-1">{selectedSubmission.middleName}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-semibold">Last Name:</span>
                  <span className="border border-gray-300 p-1">{selectedSubmission.lastName}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-semibold">Contact:</span>
                  <span className="border border-gray-300 p-1">{selectedSubmission.contact}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-semibold">Email:</span>
                  <span className="border border-gray-300 p-1">{selectedSubmission.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Complaint:</span>
                  <span className="border border-gray-300 p-1">{selectedSubmission.complaintsT}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaints;

