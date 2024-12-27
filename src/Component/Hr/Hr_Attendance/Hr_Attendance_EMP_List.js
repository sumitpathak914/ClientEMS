import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hr_Attendance_EMP_List = () => {
    const navigate = useNavigate();

    // Sample Employee Data
    const employees = [
        { id: 1, name: 'John Doe', department: 'IT' },
        { id: 2, name: 'Jane Smith', department: 'HR' },
        { id: 3, name: 'Michael Brown', department: 'Finance' },
    ];

    // Navigate to view attendance page
    const handleViewAttendance = (id) => {
        navigate(`/viewAttendance/${id}`);
    };

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-semibold">Employee Attendance List</h2>
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
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
                                    onClick={() => handleViewAttendance(employee.id)}
                                    className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    View Attendance
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
