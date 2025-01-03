import React, { useState } from 'react';

function Emp_ClientManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([
    { id: 'C001', name: 'John Doe', mobile: '1234567890', wallet: '2000' },
    { id: 'C002', name: 'Jane Smith', mobile: '0987654321', wallet: '5000' },
    { id: 'C003', name: 'Alice Johnson', mobile: '5678901234', wallet: '10000' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({ id: '', name: '', mobile: '', wallet: '' });

  const filteredClients = clients.filter(client =>
    client.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    if (newClient.id && newClient.name && newClient.mobile && newClient.wallet) {
      setClients([...clients, newClient]);
      setNewClient({ id: '', name: '', mobile: '', wallet: '' });
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Client Management</h2>
      <div className="flex items-center mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Client ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg flex-grow mr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {/* Add Client Button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
        >
          Add Client
        </button>
      </div>

      {/* Client List */}
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="p-4 text-left ">Client ID</th>
            <th className="p-4 text-left ">Name</th>
            <th className="p-4 text-left ">Mobile Number</th>
            <th className="p-4 text-left ">Account Balance</th>
            <th className="p-4 text-left ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-800">{client.id}</td>
                <td className="p-4 text-gray-800">{client.name}</td>
                <td className="p-4 text-gray-800">{client.mobile}</td>
                <td className="p-4 text-gray-800">{client.wallet}</td>
                <td className="p-4">
                  <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-teal-600 transition duration-200 mr-2">
                    View History
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 transition duration-200 mr-2">
                    Investment
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition duration-200">
                    Withdrawal
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Add New Client</h3>
            <input
              type="text"
              placeholder="Client ID"
              value={newClient.id}
              onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={newClient.mobile}
              onChange={(e) => setNewClient({ ...newClient, mobile: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Account Balance"
              value={newClient.wallet}
              onChange={(e) => setNewClient({ ...newClient, wallet: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 mr-4 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Emp_ClientManagement;
