import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';
import PageNotFoundAdmin from './Pages/AdminPage/PageNotFoundAdmin'
import MainLayout from './Layout/MainLayout';
import AdminLayout from './Layout/AdminLayout';
import Home from './Pages/Landing/Home';
import About from './Pages/Landing/About';
import Services from './Pages/Landing/Services';
import Contact from './Pages/Landing/Contact';
import LoginLayout from './Layout/LoginLayout';
import ManageUsers from './Pages/AdminPage/ManageUsers';
import ManagePages from './Pages/AdminPage/ManagePages';
import DashBoard from './Pages/AdminPage/Dashboard';
import PendingSubmissions from './Pages/AdminPage/PendingSubmissions';
import Faq from './Pages/otherPages/Faq';
import PrivacyPolicy from './Pages/otherPages/PrivacyPolicy';
import ManageFaq from './Pages/AdminPage/manage-pages/ManageFaq';
import CreateAdmin from './Pages/AdminPage/SuperAdmin/CreateAdmin';
import Users from './Pages/AdminPage/Manage-users/Users';
import Admins from './Pages/AdminPage/SuperAdmin/Admins';
import General from './Pages/AdminPage/manage-pages/General';
import Officials from './Pages/AdminPage/manage-pages/Officials';
import AddOfficial from './Components/AdminComponents/ManageOfficials/AddOfficial';
import DownloadApp from './Pages/Landing/DownloadApp';
import BarangayClearanceForm from './Pages/Landing/Forms/BarangayClearanceForm';
import PwdApplicationForm from './Pages/Landing/Forms/PwdApplicationForm';
import SeniorCitizenApplicationForm from './Pages/Landing/Forms/SeniorCitizenApplicationForm';
import ComplaintsForm from './Pages/Landing/Forms/ComplaintsForm';
import News from './Pages/Landing/News';
import ManageNews from './Pages/AdminPage/manage-pages/ManageNews';
import CreateNews from './Components/AdminComponents/ManageNews/CreateNews';
import ApprovedSubmissions from './Pages/AdminPage/ApprovedSubmissions';
import Complaints from './Pages/AdminPage/Complaints';
import LoginPage from './Pages/Login/LoginPage';
import { AuthProvider } from './AuthContext/AuthContext';
import ProtectedRoute from './AuthContext/ProtectedRoute';
import BarangayIndigency from './Pages/Landing/Forms/BarangayIndigency';
import ViewNews from './Components/ViewNews';
import PendingNavBar from './Components/AdminComponents/PendingNavBar';
import AcceptedSubmission from './Pages/AdminPage/AcceptedSubmission';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <PageNotFound />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/services', element: <Services /> },
        { path: '/contact', element: <Contact /> },
        { path: '/privacy-policy', element: <PrivacyPolicy /> },
        { path: '/faq', element: <Faq /> },
        { path: '/download', element: <DownloadApp /> },
        { path: '/news', element: <News />, },
        { path: '/news/:id', element: <ViewNews/> },
        { path: '/barangay-clearance', element: <BarangayClearanceForm /> },
        { path: '/barangay-indigency', element: <BarangayIndigency /> },
        { path: '/pwd-application', element: <PwdApplicationForm /> },
        { path: '/senior-citizen-application', element: <SeniorCitizenApplicationForm /> },
        { path: '/complaints', element: <ComplaintsForm /> },
      ],
    },
    { path: '/login', element: <LoginPage/> },
    {
      path: '/admin',
      element:<ProtectedRoute> <AdminLayout /> </ProtectedRoute>,
      children: [
        { path:'/admin', element:<DashBoard/> },
        { path:'/admin/manage-users', element:<ManageUsers/>, children:[
            { path:'/admin/manage-users', element:<Users /> },
            { path:'/admin/manage-users/admins', element:<Admins /> },
          ]
        },
        {
          path:'/admin/manage-pages',
          element:<ManagePages/>,
          children:[
            { path:'/admin/manage-pages', element:<General /> },
            { path:'/admin/manage-pages/officials', element:<Officials /> },
            { path:'/admin/manage-pages/news', element:<ManageNews /> },
            { path:'/admin/manage-pages/faq', element:<ManageFaq /> },
          ]
        },
        { path:'/admin/submissions/pending-forms', element:<PendingNavBar/>, 
        children:[
          { path:'/admin/submissions/pending-forms', element:<PendingSubmissions /> },
          { path:'/admin/submissions/pending-forms/accepted', element:<AcceptedSubmission /> },
        ]},
        { path:'/admin/submissions/approved', element:<ApprovedSubmissions /> },
        { path:'/admin/submissions/complaints', element:<Complaints /> },
        { path:'/admin/add-new-admin', element:<CreateAdmin /> },
        { path:'/admin/manage-pages/add-official', element:<AddOfficial /> },
        { path:'/admin/manage-pages/create-news', element:<CreateNews /> },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
