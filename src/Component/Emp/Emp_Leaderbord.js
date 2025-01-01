import React from 'react';

const employeeData = [
  { id: 1, name: 'Alice Johnson', incentive: 3000, image: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Bob Smith', incentive: 2800, image: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Charlie Brown', incentive: 2600, image: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'David Lee', incentive: 2400, image: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Eva Green', incentive: 2200, image: 'https://i.pravatar.cc/150?img=5' },
];

function Emp_Leaderboard() {
  return (
    <div className=" mx-auto mt-10  bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header Section */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 p-2">🏆 Employee Incentive Leaderboard</h2>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-left">Employee</th>
              <th className="py-3 px-6 text-left">Incentive</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee, index) => (
              <tr
                key={employee.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition-colors`}
              >
                <td className="py-4 px-6 font-medium">{index + 1}</td>
                <td className="py-4 px-6 flex items-center gap-4">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <span className="text-gray-800 font-medium">{employee.name}</span>
                </td>
                <td className="py-4 px-6 text-gray-700 font-semibold">${employee.incentive}</td>
                <td className="py-4 px-6">
                  {index === 0 ? (
                    <span className="px-3 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-md">
                      🥇 Top Performer
                    </span>
                  ) : index === 1 ? (
                    <span className="px-3 py-1 text-sm font-semibold text-white bg-gray-400 rounded-md">
                      🥈 Runner-Up
                    </span>
                  ) : index === 2 ? (
                    <span className="px-3 py-1 text-sm font-semibold text-white bg-orange-400 rounded-md">
                      🥉 Third Place
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-md">
                      Participant
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Emp_Leaderboard;
