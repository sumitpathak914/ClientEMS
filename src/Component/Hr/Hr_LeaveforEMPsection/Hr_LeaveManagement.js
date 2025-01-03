import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Hr_LeaveManagement() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const BaseUrl ="https://ems-backend-uat.vercel.app"
  console.log(employees,"employees")
  // const [employees] = React.useState([
  //   {
  //     empId: 101,
  //     name: "Sumit Pathak",
  //     department: "IT",
  //     role: "Developer",
  //     status: "Pending", // Pending status
  //     reason: "Fever and cold.",
  //   },
  //   {
  //     empId: 102,
  //     name: "Gauri Jadhav",
  //     department: "HR",
  //     role: "HR Manager",
  //     status: "Approved", // Approved status
  //     reason: "Family function.",
  //   },
  //   {
  //     empId: 103,
  //     name: "Shrutika",
  //     department: "Designer",
  //     role: "UI/UX",
  //     status: "Cancelled", // Cancelled status
  //     reason: "Personal reason.",
  //   },
  //   {
  //     empId: 104,
  //     name: "Nilesh Pathak",
  //     department: "Developer",
  //     role: "Flutter",
  //     status: "Rejected", // Rejected status
  //     reason: "Unexcused absence.",
  //   },
  // ]);

  const handleViewApplication = (empId) => {
    navigate(`/employee/${empId}`);
  };
 const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/Emp/employees`);
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
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-center">
        Application Users
      </h2>

      {/* Applications Table */}
      <table className="w-full bg-white border rounded shadow-md">
        <thead className="text-white bg-blue-500">
          <tr>
            <th className="p-2 text-left">Emp ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Department</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="transition border-b hover:bg-gray-100">
              <td className="p-2">{employee.empID}</td>
              <td className="p-2">{employee.name}</td>
              <td className="p-2">{employee.department}</td>
              <td className="p-2">{employee.role}</td>
              <td className="p-2">
                <button
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                  onClick={() => handleViewApplication(employee.empID)}
                >
                  Application🧐
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default Hr_LeaveManagement;