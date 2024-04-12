import React, { useState, useEffect, useRef } from 'react';
import { getDatabase,ref as dbref, get } from 'firebase/database';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-date-fns';
import LoadingAnimation from '../../Components/Loading/LoadingAnimation';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

function Dashboard() {
  
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [submissionTypes, setSubmissionTypes] = useState({
    'barangay-clearance': { pending: 0, approved: 0 },
    'pwd': { pending: 0, approved: 0 },
    'senior': { pending: 0, approved: 0 },
    'complaints': 0,
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [submissions, setSubmissions] = useState({});
  const [submissionsByDate, setSubmissionsByDate] = useState([]);
  const [loading, setLoading] = useState(true); 
  

  const chartContainer = useRef(null);
  const barChartContainer = useRef(null);
  const chartInstance = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const submissionsByDate = {};
      const db = getDatabase();
      const submissionPaths = {
        'barangay-clearance': ['pending', 'approved'],
        'pwd': ['pending', 'approved'],
        'senior': ['pending', 'approved'],
      };
  
      const submissionPromises = [];
      const userPromise = get(dbref(db, 'users/')).then((snapshot) =>
        snapshot.exists() ? Object.keys(snapshot.val()).length : 0
      );
  
      const dates = [];
  
      for (const type of Object.keys(submissionPaths)) {
        for (const status of submissionPaths[type]) {
          const refPath = `submissions/forms/${type}/${status}/`;
          const submissionRef = dbref(db, refPath);
          submissionPromises.push(
            get(submissionRef).then((snapshot) => {
              if (snapshot.exists()) {
                const submissionsData = snapshot.val();
                Object.values(submissionsData).forEach((submission) => dates.push(submission.dateSubmitted));
                // Merge new submissions data with existing data
                setSubmissions((prevState) => ({ ...prevState, ...submissionsData }));
                return Object.keys(submissionsData).length;
              }
              return 0;
            })
          );
        }
      }
  
      const complaintsRef = dbref(db, 'submissions/forms/complaints/');
      const complaintsPromise = get(complaintsRef).then((snapshot) =>
        snapshot.exists() ? Object.keys(snapshot.val()).length : 0
      );
  
      const results = await Promise.all(submissionPromises.concat(complaintsPromise, userPromise));
  
      const newData = {};
      let index = 0;
  
      dates.forEach((date) => {
        // Convert the date string to a Date object
        const formattedDate = new Date(date);
  
        // Extract the month, day, and year components from the Date object
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const year = formattedDate.getFullYear();
  
        const formattedDateString = `${month}/${day}/${year}`;
  
        // Add the formatted date to submissionsByDate
        if (!submissionsByDate[formattedDateString]) {
          submissionsByDate[formattedDateString] = 0;
        }
        submissionsByDate[formattedDateString]++;
      });
  
      for (const type of Object.keys(submissionPaths)) {
        newData[type] = {
          pending: results[index++],
          approved: results[index++],
        };
      }
  
      newData['complaints'] = results[index++];
      setSubmissionTypes(newData);
  
      const totalSubmissions = results.slice(0, index).reduce((acc, value) => acc + value, 0);
      setTotalSubmissions(totalSubmissions);
  
      const totalUsersCount = results[index];
      setTotalUsers(totalUsersCount);
  
      setSubmissionsByDate(submissionsByDate);
      setLoading(false);
    };
  
    fetchData();
  }, []);
  
  

  useEffect(() => {
    if (!loading && Object.keys(submissionsByDate).length > 0) { 
      const sortedDates = Object.keys(submissionsByDate).sort((a, b) => new Date(a) - new Date(b));
      const sortedData = sortedDates.map(date => submissionsByDate[date]);


      const ctx = chartContainer.current.getContext('2d');
  
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: sortedDates, 
          datasets: [{
            label: 'Number of Submissions',
            data: sortedData, 
            borderColor: 'blue',
            borderWidth: 1,
            fill: false,
          }],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time', 
              time: {
                parser: 'MM/dd/yyyy',
                tooltipFormat: 'll',
                unit: 'day',
                displayFormats: {
                  day: 'MMM dd'
                },
              },
              title: {
                display: false,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Submissions',
              },
            },
          },
        },
      });
    }
    
  }, [loading, submissionsByDate]);

  useEffect(() => {
    if (!loading) { 
      const barCtx = barChartContainer.current.getContext('2d');
  
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
  
      barChartInstance.current = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Barangay-clearance', 'PWD Application', 'Senior Citizen Application', 'Complaints'],
    datasets: [{
      label: '',
      data: [submissionTypes['barangay-clearance'].pending + submissionTypes['barangay-clearance'].approved,
             submissionTypes['pwd'].pending + submissionTypes['pwd'].approved,
             submissionTypes['senior'].pending + submissionTypes['senior'].approved,
             submissionTypes['complaints']],
      backgroundColor: ['rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    }],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {  
              stacked: true,
            },
          },
          plugins: {
            legend: {
              display: false, 
            },
          },
        },
      });
    }
  }, [loading]);
  
  
  
  
  

  return (
    <div className="m-10">
      <h1 className='border-b font-semibold text-3xl pb-4'>Dashboard</h1>

      <div className="max-w-7xl mx-auto px-4 py-8 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className='text-xl font-semibold'>Total submissions: {totalSubmissions}</p>
            {Object.keys(submissionTypes).map((type) => {
          let text;
          switch (type) {
            case 'barangay-clearance':
              text = 'Barangay-clearance';
              break;
            case 'complaints':
              text = 'Complaints';
              break;
            case 'pwd':
              text = 'PWD Application';
              break;
            case 'senior':
              text = 'Senior Citizen Application';
              break;
            default:
              text = type.replace('-', ' ');
              break;
          }
          return (
            <p key={type}>
              {`  ${text}: `}
              {typeof submissionTypes[type] === 'object'
                ? submissionTypes[type].pending + submissionTypes[type].approved
                : submissionTypes[type]}
            </p>
          );
        })}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <p className="text-gray-600">Registered Users: {totalUsers}</p>
          </div>

          <div className='w-auto justify-center'>
            {loading ? (
              <LoadingAnimation/>
            ) : (
              <canvas className='w-full h-full' ref={chartContainer} />
            )}
          </div>

          <div className='w-full h-full justify-center'>
            {loading ? (
              <LoadingAnimation/>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <canvas className='w-full h-full' ref={barChartContainer} />
                <div className='w-full h-full'>

                  <canvas/>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
