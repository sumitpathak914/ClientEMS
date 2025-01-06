// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Hr_EmpWlist = () => {
//   const navigate = useNavigate();

//   const employees = [
//     { id: 1, name: 'John Doe', role: 'Developer', position: 'Frontend' },
//     { id: 2, name: 'Jane Smith', role: 'Designer', position: 'UI/UX' },
//     { id: 3, name: 'Bob Brown', role: 'Manager', position: 'HR' },
//   ];

//   const handleViewWorkReport = (id) => {
//     navigate(`/work-report/${id}`);
//   };

//   return (
//     <div className="container p-4 mx-auto">
//       <h1 className="mb-4 text-2xl font-bold">Employee Documents</h1>
//       <table className="w-full border border-collapse border-gray-300">
//         <thead>
//           <tr className="text-white bg-indigo-700">
//             <th className="p-2 border ">Emp ID</th>
//             <th className="p-2 border ">Name</th>
//             <th className="p-2 border ">Role</th>
//             <th className="p-2 border ">Position</th>
//             <th className="p-2 border ">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.id} className="hover:bg-gray-100">
//               <td className="p-2 text-center border border-gray-300">{employee.id}</td>
//               <td className="p-2 border border-gray-300">{employee.name}</td>
//               <td className="p-2 border border-gray-300">{employee.role}</td>
//               <td className="p-2 border border-gray-300">{employee.position}</td>
//               <td className="p-2 text-center border border-gray-300">
//                 <button
//                   className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                   onClick={() => handleViewWorkReport(employee.id)}
//                 >
//                   Work Report
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };



// export default Hr_EmpWlist;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../Auth/Url';

const Hr_Attendance_EMP_List = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
 
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/employees`);
      if (response.data.statusCode === 200) {
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  useEffect(() => {

    fetchEmployees();
  }, []);
  // const handleViewAttendance = (id) => {
  //     navigate(`/Attendance/${id}`);
  // };
  // const handleViewWorkReport = (id) => {
  //   navigate(`/Work_Report/${id}`);
  //    };
  const handleViewWorkReport = (id, name) => {
    navigate(`/Work_Report`, { state: { id, name } });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold">Employee Work Report List</h2>
      <table className="w-full border border-collapse border-gray-300">
        <thead>
          <tr className="text-white bg-indigo-600">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="text-center hover:bg-gray-100">
              <td className="p-2 border">{employee.id}</td>
              <td className="p-2 border">{employee.name}</td>
              <td className="p-2 border">{employee.department}</td>
              <td className="p-2 border">
                <button
                                   className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                   onClick={() => handleViewWorkReport(employee.id,employee.name)}
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

export default Hr_Attendance_EMP_List;
