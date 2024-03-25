import { Outlet } from "react-router-dom"


function Dashboard() {
  return (
    <div className="m-10">
      <h1 className=' border-b font-semibold text-3xl pb-4'>Dashboard</h1>

      <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Submissions</h2>
          <p className="text-gray-600">Today:</p>
          <p className="text-gray-600">Total:</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <p className="text-gray-600">Total Users:</p>
        </div>

      </div>
    </div>
    </div>
  )
  
 
}


export default Dashboard