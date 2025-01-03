import React from 'react';
import { useParams } from 'react-router-dom';

const workReports = {
  1: [
    { date: '2025-01-01', task: 'Develop Login Page', manager: 'Alice' },
    { date: '2025-01-02', task: 'Fix UI Bugs', manager: 'Alice' },
  ],
  2: [
    { date: '2025-01-01', task: 'Design Dashboard', manager: 'Bob' },
    { date: '2025-01-03', task: 'Update UI Components', manager: 'Bob' },
  ],
  3: [
    { date: '2025-01-01', task: 'Review HR Policies', manager: 'Charlie' },
    { date: '2025-01-04', task: 'Manage Recruitment', manager: 'Charlie' },
  ],
};

const Hr_Empwork = () => {
  const { id } = useParams();
  const reports = workReports[id] || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Work Report for Employee ID: {id}</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Task</th>
            <th className="border border-gray-300 p-2">Reporting Manager</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">{report.date}</td>
                <td className="border border-gray-300 p-2">{report.task}</td>
                <td className="border border-gray-300 p-2">{report.manager}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No work reports found for this employee.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};



export default Hr_Empwork;