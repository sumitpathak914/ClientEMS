import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';

const Hr_Attendance_Managment = () => {
    const { id } = useParams(); // Get employee ID from the route

    // Mock Attendance Data for the selected employee
    const [attendanceData, setAttendanceData] = useState([
        { id: 1, date: '2024-12-01', punchIn: '09:00 AM', punchOut: '05:00 PM', status: 'Full Day' },
        { id: 2, date: '2024-12-02', punchIn: '08:45 AM', punchOut: '04:50 PM', status: 'Full Day' },
        { id: 3, date: '2024-12-03', punchIn: '09:10 AM', punchOut: '05:15 PM', status: 'Late' },
        { id: 4, date: '2024-12-04', punchIn: '08:30 AM', punchOut: '05:30 PM', status: 'Full Day' },
    ]);

    return (
        <div className="container p-6 mx-auto max-w-7xl">
            <h2 className="mb-6 text-3xl font-bold">Attendance Details for Employee #{id}</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full border border-collapse border-gray-300">
                    <thead className="text-white bg-indigo-600">
                        <tr>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Punch In</th>
                            <th className="px-4 py-2 border">Punch Out</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{record.date}</td>
                                <td className="px-4 py-2 border">{record.punchIn}</td>
                                <td className="px-4 py-2 border">{record.punchOut}</td>
                                <td className="px-4 py-2 border">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${record.status === 'Full Day'
                                                ? 'bg-green-200 text-green-800'
                                                : record.status === 'Late'
                                                    ? 'bg-yellow-200 text-yellow-800'
                                                    : 'bg-orange-200 text-orange-800'
                                            }`}
                                    >
                                        {record.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-center border">
                                    <button className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                        <FaRegEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Hr_Attendance_Managment;
