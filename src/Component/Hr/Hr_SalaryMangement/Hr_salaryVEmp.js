import React, { useState } from 'react';

const Hr_salaryVEmp = () => {
  const [salaryData, setSalaryData] = useState([
    { empId: '02', name: 'EMP Monthly', salary: 1000, status: 'Paid' },
    { empId: '03', name: 'John Doe', salary: 1200, status: 'Unpaid' },
  ]);

  const handleChange = (index, field, value) => {
    const updatedData = [...salaryData];
    updatedData[index][field] = value;
    setSalaryData(updatedData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Monthly Payslip</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <select className="border p-2 rounded">
          <option>All Employees</option>
        </select>

        <select className="border p-2 rounded">
          <option>2023</option>
        </select>
        <select className="border p-2 rounded">
          <option>February</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all">
          Next
        </button>
      </div>

      {/* Salary Table */}
      <table className="table-auto w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2">Employee ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Salary</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((data, index) => (
            <tr key={index} className="text-center">
              <td className="p-2">{data.empId}</td>
              <td className="p-2">{data.name}</td>
              <td className="p-2">${data.salary.toFixed(2)}</td>
              <td className="p-2">
                <div className="flex items-center justify-center space-x-2">
                  <select
                    className="border p-1 rounded focus:outline-none"
                    value={data.status}
                    onChange={(e) => handleChange(index, 'status', e.target.value)}
                  >
                    <option>Paid</option>
                    <option>Unpaid</option>
                  </select>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                      data.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {data.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Payslip Button */}
      <div className="mt-4 text-right">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all">
          Create Payslip
        </button>
      </div>
    </div>
  );
};

export default Hr_salaryVEmp;
