// import React from 'react'

// const Hr_Attendance_Managment = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Hr_Attendance_Managment
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa'; // Import React Icon for edit

const Hr_Attendance_Managment = () => {
    // Create 15 dummy attendance records with status
    const [attendanceData, setAttendanceData] = useState([
        { id: 1, date: '2024-12-01', punchIn: '09:00 AM', punchOut: '05:00 PM', status: 'Full Day' },
        { id: 2, date: '2024-12-02', punchIn: '08:45 AM', punchOut: '04:50 PM', status: 'Full Day' },
        { id: 3, date: '2024-12-03', punchIn: '09:10 AM', punchOut: '05:15 PM', status: 'Late' },
        { id: 4, date: '2024-12-04', punchIn: '08:30 AM', punchOut: '05:30 PM', status: 'Full Day' },
        { id: 5, date: '2024-12-05', punchIn: '09:05 AM', punchOut: '05:10 PM', status: 'Half Day' },
        { id: 6, date: '2024-12-06', punchIn: '08:50 AM', punchOut: '04:45 PM', status: 'Full Day' },
        { id: 7, date: '2024-12-07', punchIn: '09:20 AM', punchOut: '05:25 PM', status: 'Late' },
        { id: 8, date: '2024-12-08', punchIn: '08:30 AM', punchOut: '05:15 PM', status: 'Full Day' },
        { id: 9, date: '2024-12-09', punchIn: '09:00 AM', punchOut: '05:00 PM', status: 'Full Day' },
        { id: 10, date: '2024-12-10', punchIn: '08:40 AM', punchOut: '04:40 PM', status: 'Half Day' },
        { id: 11, date: '2024-12-11', punchIn: '09:05 AM', punchOut: '05:05 PM', status: 'Full Day' },
        { id: 12, date: '2024-12-12', punchIn: '09:00 AM', punchOut: '05:00 PM', status: 'Late' },
        { id: 13, date: '2024-12-13', punchIn: '08:50 AM', punchOut: '05:00 PM', status: 'Full Day' },
        { id: 14, date: '2024-12-14', punchIn: '09:10 AM', punchOut: '05:10 PM', status: 'Half Day' },
        { id: 15, date: '2024-12-15', punchIn: '08:55 AM', punchOut: '05:00 PM', status: 'Full Day' }
    ]);

    // Set initial page state
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // Logic to paginate the data
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = attendanceData.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">Employee Attendance</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="border px-6 py-3 text-left">Date</th>
                            <th className="border px-6 py-3 text-left">Punch In Time</th>
                            <th className="border px-6 py-3 text-left">Punch Out Time</th>
                            <th className="border px-6 py-3 text-left">Lunch Start Time</th>
                            <th className="border px-6 py-3 text-left">Lunch End Time</th>
                            <th className="border px-6 py-3 text-left">Status</th>
                            <th className="border px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50 transition duration-200">
                                <td className="border px-6 py-4">{record.date}</td>
                                <td className="border px-6 py-4">{record.punchIn}</td>
                                <td className="border px-6 py-4">{record.punchOut}</td>
                                <td className="border px-6 py-4">{record.punchOut}</td>
                                <td className="border px-6 py-4">{record.punchOut}</td>
                                <td className="border px-6 py-4">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${record.status === 'Full Day' ? 'bg-green-200 text-green-800' :
                                            record.status === 'Late' ? 'bg-yellow-200 text-yellow-800' :
                                                record.status === 'Half Day' ? 'bg-orange-200 text-orange-800' :
                                                    'bg-red-200 text-red-800'}`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td className="border px-6 py-4 text-center">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 focus:outline-none transition duration-200">
                                        <FaRegEdit className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-l hover:bg-indigo-600 disabled:opacity-50 transition duration-200">
                    Prev
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page + 1}
                        onClick={() => paginate(page + 1)}
                        className={`px-4 py-2 mx-1 rounded-full ${currentPage === page + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'} transition duration-200`}>
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-r hover:bg-indigo-600 disabled:opacity-50 transition duration-200">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Hr_Attendance_Managment;
