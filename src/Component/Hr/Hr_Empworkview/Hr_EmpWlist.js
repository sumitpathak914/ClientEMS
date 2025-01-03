import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hr_EmpWlist = () => {
  const navigate = useNavigate();

  const employees = [
    { id: 1, name: 'John Doe', role: 'Developer', position: 'Frontend' },
    { id: 2, name: 'Jane Smith', role: 'Designer', position: 'UI/UX' },
    { id: 3, name: 'Bob Brown', role: 'Manager', position: 'HR' },
  ];

  const handleAddDocument = (id) => {
    navigate(`/add-document/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Documents</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Emp ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Position</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">{employee.id}</td>
              <td className="border border-gray-300 p-2">{employee.name}</td>
              <td className="border border-gray-300 p-2">{employee.role}</td>
              <td className="border border-gray-300 p-2">{employee.position}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleAddDocument(employee.id)}
                >
                  Work Report 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};





export default Hr_EmpWlist;