import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'; // Import axios for API calls
import { BaseUrl } from '../Auth/Url';
import CryptoJS from 'crypto-js';
import { useLocation } from 'react-router-dom';

const Emp_Attendance = () => {
    const location = useLocation();
    const { id, name } = location.state || {}; // Fetching data passed via location state
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [EditModel, setEditModel] = useState(false);
    const [SelectedDataForEditModel, setSelectedDataForEditModel] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        date: '',
        inTime: '',
        outTime: '',
        lunchStart: '',
        lunchEnd: '',
        status: 'Full Day'
    });
    console.log(SelectedDataForEditModel, "SelectedDataForEditModel")
    console.log(updatedData,"updatedData")
    const recordsPerPage = 10;
    const [userData, setUserData] = useState(null);
    const SECRET_KEY = 'your-secret-key';

    useEffect(() => {
        const encryptedToken = sessionStorage.getItem('authToken');
        const encryptedUserData = sessionStorage.getItem('userData');
        if (encryptedToken && encryptedUserData) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedUserData, SECRET_KEY);
                const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                setUserData(decryptedUserData);
            } catch (error) {
                console.error("Decryption failed:", error);
            }
        }
    }, []);

    // Fetch attendance records from API
    const fetchAttendanceData = async (page = 1, recordsPerPage = 10) => {
        try {
            const response = await axios.post(`${BaseUrl}/api/attendance/Get-AllpunchRecords`, {
                empId: id ? id : userData?.id, // Use userData.id if id is not provided
                page,
                recordsPerPage
            });
            setAttendanceData(response.data.attendance);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceData(currentPage, recordsPerPage);
    }, [currentPage, userData]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = attendanceData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

    const HandleEditModelOpen = (data) => {
        setSelectedDataForEditModel(data);
        setUpdatedData({
            date: data.date,
            inTime: data.inTime,
            outTime: data.outTime,
            lunchStart: data.lunchStart,
            lunchEnd: data.lunchEnd,
            status: data.status
        });
        setEditModel(true);
    };

    const HandleEditModelClose = () => {
        setEditModel(false);
        setSelectedDataForEditModel(null);
    };

    const handleSave = async () => {
        debugger
        try {
            const updatedDataStore = {
                id: SelectedDataForEditModel.id,
                empId: SelectedDataForEditModel.empId,
                date: updatedData.date, // Use updatedData state value
                inTime: updatedData.inTime,
                outTime: updatedData.outTime,
                lunchStart: updatedData.lunchStart,
                lunchEnd: updatedData.lunchEnd,
                status: updatedData.status
            };

            // Call API to update the attendance record
            const response = await fetch(`${BaseUrl}/api/attendance/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDataStore),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Attendance updated successfully:', result);
                fetchAttendanceData(currentPage, recordsPerPage); // Refresh the attendance data
                HandleEditModelClose(); // Close the modal
            } else {
                console.error('Failed to update attendance:', result);
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };
    const handleDelete = async (id, empId) => {
        try {
            const response = await fetch(`${BaseUrl}/api/attendance/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, empId }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Attendance deleted successfully:', result);
                fetchAttendanceData(currentPage, recordsPerPage); // Refresh the attendance data
            } else {
                console.error('Failed to delete attendance:', result);
            }
        } catch (error) {
            console.error('Error deleting attendance:', error);
        }
    };


    return (
        <div className="container mx-auto max-w-7xl">
            <h2 className="mb-6 font-serif text-3xl font-semibold text-gray-800">Employee {name} Attendance</h2>
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
                            {userData?.role === "HR" && (
                                <th className="px-6 py-3 text-left border">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record) => {
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
                                        <span className={`px-2 py-1 text-xs rounded-full ${record.status === 'Full Day' ? 'bg-green-200 text-green-800' : record.status === 'Late' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                                            {record.status || 'N/A'}
                                        </span>
                                    </td>
                                    {userData?.role === "HR" && (
                                        <td className="flex gap-2 px-6 py-3 text-left ">
                                            <button className="text-blue-500 hover:text-blue-700" onClick={() => HandleEditModelOpen(record)}>
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(record.id ,record.empId)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-white transition duration-200 bg-indigo-500 rounded-l hover:bg-indigo-600 disabled:opacity-50">
                    Prev
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <button key={page + 1} onClick={() => paginate(page + 1)} className={`px-4 py-2 mx-1 rounded-full ${currentPage === page + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'} transition duration-200`}>
                        {page + 1}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 text-white transition duration-200 bg-indigo-500 rounded-r hover:bg-indigo-600 disabled:opacity-50">
                    Next
                </button>
            </div>

            {/* Edit Attendance Modal */}
            {EditModel && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="mb-4 text-xl font-semibold">Edit Attendance</h3>

                        {/* Date */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                value={updatedData.date || ''} // Ensure a fallback value in case of null or undefined
                                onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
                                className="w-full px-4 py-2 mt-1 border rounded-md"
                            />
                        </div>

                        {/* Punch In Time */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Punch In Time</label>
                            <input
                                type="time"
                                value={updatedData.inTime ? updatedData.inTime.substring(11, 16) : ''} // Ensure correct time format (HH:MM)
                                onChange={(e) => setUpdatedData({ ...updatedData, inTime: `${updatedData.date} ${e.target.value}:00` })} // Update state with the full date-time
                                className="w-full px-4 py-2 mt-1 border rounded-md"
                            />
                        </div>

                        {/* Punch Out Time */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Punch Out Time</label>
                            <input
                                type="time"
                                value={updatedData.outTime ? updatedData.outTime.substring(11, 16) : ''} // Ensure correct time format (HH:MM)
                                onChange={(e) => setUpdatedData({ ...updatedData, outTime: `${updatedData.date} ${e.target.value}:00` })} // Update state with the full date-time
                                className="w-full px-4 py-2 mt-1 border rounded-md"
                            />
                        </div>

                        {/* Lunch Start Time */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Lunch Start Time</label>
                            <input
                                type="time"
                                value={updatedData.lunchStart ? updatedData.lunchStart.substring(11, 16) : ''} // Ensure correct time format (HH:MM)
                                onChange={(e) => setUpdatedData({ ...updatedData, lunchStart: `${updatedData.date} ${e.target.value}:00` })} // Update state with the full date-time
                                className="w-full px-4 py-2 mt-1 border rounded-md"
                            />
                        </div>

                        {/* Lunch End Time */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Lunch End Time</label>
                            <input
                                type="time"
                                value={updatedData.lunchEnd ? updatedData.lunchEnd.substring(11, 16) : ''} // Ensure correct time format (HH:MM)
                                onChange={(e) => setUpdatedData({ ...updatedData, lunchEnd: `${updatedData.date} ${e.target.value}:00` })} // Update state with the full date-time
                                className="w-full px-4 py-2 mt-1 border rounded-md"
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={updatedData.status || ''} // Ensure a fallback value
                                onChange={(e) => setUpdatedData({ ...updatedData, status: e.target.value })}
                                className="w-full px-4 py-2 mt-1 border rounded-md"
                            >
                                <option value="Full Day">Full Day</option>
                                <option value="Late">Late</option>
                                <option value="Absent">Absent</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={handleSave} className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Save</button>
                            <button onClick={HandleEditModelClose} className="px-6 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-700">Cancel</button>
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
};

export default Emp_Attendance;
