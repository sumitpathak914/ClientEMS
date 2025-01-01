import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios for API calls
import { FaRegEdit, FaRegCopy, FaRegTrashAlt } from 'react-icons/fa'; // Import icons for edit, copy, delete
import { BaseUrl } from '../Auth/Url';
import CryptoJS from 'crypto-js';
const Emp_Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
  const [userData, setUserData] = useState(null);
    console.log(userData, "userdata")
    const SECRET_KEY = 'your-secret-key'; 
   

     useEffect(() => {
            const encryptedToken = sessionStorage.getItem('authToken');
            const encryptedUserData = sessionStorage.getItem('userData');
            console.log("Encrypted Token:", encryptedToken);  // Check if token is in sessionStorage
            console.log("Encrypted UserData:", encryptedUserData);  // Check if userData is in sessionStorage
    
            if (encryptedToken && encryptedUserData) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encryptedUserData, SECRET_KEY);
                    const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
                    setUserData(decryptedUserData);
                    
                } catch (error) {
                    console.error("Decryption failed:", error); // Log if decryption fails
                }
            } else {
                console.log("No user data or token found in sessionStorage");
            }
        }, []);
    
    // Fetch attendance records from API
    const fetchAttendanceData = async (page = 1, recordsPerPage = 10) => {
        try {
            const response = await axios.post(`${BaseUrl}/api/attendance/Get-AllpunchRecords`, {
                empId: userData.id, // Replace with the actual empId
                page,
                recordsPerPage
            });
            setAttendanceData(response.data.attendance);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    // Fetch data on component mount and when page changes
    useEffect(() => {
        fetchAttendanceData(currentPage, recordsPerPage);
    }, [currentPage, userData]);

    // Logic to paginate the data
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = attendanceData.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

    return (
        <div className="container p-6 mx-auto max-w-7xl">
            <h2 className="mb-6 font-serif text-3xl font-semibold text-gray-800">Employee Attendance</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full border border-collapse border-gray-300 table-auto">
                    <thead className="text-white bg-indigo-600">
                        <tr>
                            <th className="px-6 py-3 text-left border">Date</th>
                            <th className="px-6 py-3 text-left border">Punch In Time</th>
                            <th className="px-6 py-3 text-left border">Punch Out Time</th>
                            <th className="px-6 py-3 text-left border">Lunch Start Time</th>
                            <th className="px-6 py-3 text-left border">Lunch End Time</th>
                            <th className="px-6 py-3 text-left border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record) => {
                            // Format date, inTime, outTime, lunchStart, and lunchEnd
                            const formattedDate = new Date(record.date).toLocaleDateString();
                            const formattedInTime = record.inTime ? new Date(record.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
                            const formattedOutTime = record.outTime ? new Date(record.outTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
                            const formattedLunchStart = record.lunchStart ? new Date(record.lunchStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
                            const formattedLunchEnd = record.lunchEnd ? new Date(record.lunchEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';

                            return (
                                <tr key={record.id} className="transition duration-200 hover:bg-gray-50">
                                    <td className="px-6 py-4 border">{formattedDate}</td>
                                    <td className="px-6 py-4 border">{formattedInTime}</td>
                                    <td className="px-6 py-4 border">{formattedOutTime}</td>
                                    <td className="px-6 py-4 border">{formattedLunchStart}</td>
                                    <td className="px-6 py-4 border">{formattedLunchEnd}</td>
                                    <td className="px-6 py-4 border">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${record.status === 'Full Day' ? 'bg-green-200 text-green-800' :
                                                record.status === 'Late' ? 'bg-yellow-200 text-yellow-800' :
                                                    record.status === 'Half Day' ? 'bg-orange-200 text-orange-800' :
                                                        'bg-red-200 text-red-800'}`}>
                                            {record.status || 'N/A'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white transition duration-200 bg-indigo-500 rounded-l hover:bg-indigo-600 disabled:opacity-50">
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
                    className="px-4 py-2 text-white transition duration-200 bg-indigo-500 rounded-r hover:bg-indigo-600 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Emp_Attendance;
