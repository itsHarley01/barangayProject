import React, { useState } from 'react';

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center mt-10 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="alphabetical">Sort A-Z</option>
        </select>
      </div>
      <div className="border border-gray-300 rounded-md p-4">
        {/* Placeholder for user table */}
        {/* You can replace this with your actual user table component */}
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {/* Placeholder for user rows */}
            {/* You can map through your user data here to populate the table */}
            <tr>
              <td>John Doe</td>
              <td>johndoe@example.com</td>
              {/* Add more table cells as needed */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
