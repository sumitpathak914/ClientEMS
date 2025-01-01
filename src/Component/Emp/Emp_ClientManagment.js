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
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Client Management</h2>
      <div className="flex items-center mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Client ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow mr-4"
        />
        {/* Add Client Button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Client
        </button>
      </div>

      {/* Client List */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Client ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Mobile Number</th>
            <th className="p-2 text-left">Account Balance</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="p-2">{client.id}</td>
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.mobile}</td>
                <td className="p-2">{client.wallet}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                    View History
                  </button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded-md">
                  Investment
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">
                   Withdrawal
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Add New Client</h3>
            <input
              type="text"
              placeholder="Client ID"
              value={newClient.id}
              onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={newClient.mobile}
              onChange={(e) => setNewClient({ ...newClient, mobile: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Account Balance"
              value={newClient.wallet}
              onChange={(e) => setNewClient({ ...newClient, wallet: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
