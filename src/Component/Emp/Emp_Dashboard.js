import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import CryptoJS from 'crypto-js';
import { BaseUrl } from '../Auth/Url';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EmployeeDashboard = () => {
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-11 (0 = January, 11 = December)
    const [selectedType, setSelectedType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    console.log(userData, "userdata")
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState(null); // Store the role
    const SECRET_KEY = 'your-secret-key'; // Same secret key used during login
    const [attendance, setAttendance] = useState(null);
    console.log(attendance,"attendancedata")
    const [error, setError] = useState(null);
    const today = new Date();
    const date = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    useEffect(() => {
       
        if (userData) {
            fetchAttendance();
        }
    }, [userData]);

    const fetchAttendance = async () => {
        try {
            const empId = userData.id; // Ensure this is valid
            const response = await fetch(`${BaseUrl}/api/attendance/Get-punchRecords`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ empId, date }),
            });

            if (!response.ok) {
                throw new Error('Error fetching attendance record');
            }

            const data = await response.json();
            setAttendance(data.attendance); // Store attendance data
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message); // Set error if request fails
            console.error(err);
        }
    };
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
                setUserRole(decryptedUserData.role); // Assuming `role` is part of user data
            } catch (error) {
                console.error("Decryption failed:", error); // Log if decryption fails
            }
        } else {
            console.log("No user data or token found in sessionStorage");
        }
    }, []);


    const handleTypeChange = (type) => {
        setSelectedType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedType('');
    };
    // Generate the month and year for display
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[currentMonth];

    const [employeeData, setEmployeeData] = useState({
        name: 'John Doe',
        role: 'Software Developer',
        department: 'Engineering',
        leaves: [
            { date: '2024-12-01', status: 'Approved' },
            { date: '2024-12-15', status: 'Pending' },
            { date: '2024-12-22', status: 'Approved' },
        ],
        attendance: Array(31).fill(0).map((_, i) => Math.random() > 0.2 ? 1 : 0), // Random attendance data for the month
    });

    // Filter leaves for the current month and year
    const currentMonthLeaves = employeeData.leaves.filter(leave => {
        const leaveDate = new Date(leave.date);
        return leaveDate.getFullYear() === currentYear && leaveDate.getMonth() === currentMonth;
    });

    // Generate the attendance data for the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get number of days in the current month
    const attendanceData = {
        labels: Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`),
        datasets: [
            {
                label: 'Attendance',
                data: employeeData.attendance.slice(0, daysInMonth), // Get only the attendance data for the current month
                borderColor: '#FF6347',
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                fill: true,
            },
        ],
    };

    const getLeaveStatus = (status) => {
        switch (status) {
            case 'Approved':
                return <FaCheckCircle className="text-green-500" />;
            case 'Pending':
                return <FaTimesCircle className="text-yellow-500" />;
            default:
                return null;
        }
    };
    const handleTypeClick = (type) => {
        setSelectedType(type);
        setIsModalOpen(true);
    };

    const handlePunching = async (action) => {
        setLoading(true);
        try {
            const empId = userData.id; // Replace this with dynamic empId if available

            const response = await fetch(`${BaseUrl}/api/attendance/punch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ empId, action }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to process the request.');
            }

            const data = await response.json();
            alert(data.message);
            fetchAttendance()
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred while processing the request.');
        } finally {
            setLoading(false);
        }
    };
   
   
    if (!userData) {
        return <div>Loading...</div>; // Or a placeholder message
    }
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Employee Info Card */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex items-center mb-4 space-x-4">
                            {/* <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-teal-500">
                                {userData?.name[0]}
                            </div> */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{userData?.name}</h2>
                                <p className="text-sm text-gray-500">{userData?.role}</p>
                                <p className="text-sm text-gray-500">{userData?.department}</p>
                            </div>
                        </div>
                    </div>

                    {/* Leave Data Card */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">Leave Data for {monthName} {currentYear}</h3>
                        <div className="space-y-3">
                            {currentMonthLeaves.map((leave, index) => (
                                <div key={index} className="flex justify-between p-3 border rounded-md bg-gray-50">
                                    <div>{leave.date}</div>
                                    <div className="flex items-center space-x-2">
                                        {getLeaveStatus(leave.status)}
                                        <span className={`font-semibold ${leave.status === 'Approved' ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {leave.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Attendance Chart Card */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        {/* Dropdown for Selecting Punching Type */}
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">Attendance/Lunch Punching </h3>
                        <div className="w-full mt-10 mb-4 ">
                            {/* Attendance Punching */}
                            <p
                                className="font-medium text-blue-500 cursor-pointer hover:text-blue-700"
                                onClick={() => handleTypeClick('attendance')}
                            >
                                Attendance Punching
                            </p>

                            {/* Lunch Punching */}
                            <p
                                className="mt-10 font-medium text-blue-500 cursor-pointer hover:text-blue-700"
                                onClick={() => handleTypeClick('lunch')}
                            >
                                Lunch Punching
                            </p>
                        </div>

                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="p-6 bg-white rounded-lg shadow-lg w-80">
                                    <h2 className="mb-4 text-xl font-bold">
                                        {selectedType === 'attendance'
                                            ? 'Attendance Punching'
                                            : 'Lunch Punching'}
                                    </h2>
                                    {selectedType === 'attendance' && (
                                        <div className="flex flex-col space-y-4">
                                            <button
                                                onClick={() => handlePunching('inPunch')}
                                                disabled={attendance?.[0]?.inTime || loading}
                                                className="py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                            >
                                                {loading ? 'Processing...' : 'In Punching'}
                                            </button>

                                            <button
                                                onClick={() => handlePunching('outPunch')}
                                                disabled={attendance?.[0]?.outTime || loading}
                                                className="py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                            >
                                                {loading ? 'Processing...' : 'Out Punching'}
                                            </button>
                                        </div>
                                    )}
                                    {selectedType === 'lunch' && (
                                        <div className="flex flex-col space-y-4">
                                            <button
                                                onClick={() => handlePunching('startLunch')}
                                                disabled={attendance?.[0]?.lunchStart || loading}
                                                className="py-2 text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-green-300"
                                            >
                                                {loading ? 'Processing...' : 'Start Lunch Break'}
                                            </button>
                                            <button
                                                onClick={() => handlePunching('endLunch')}
                                                disabled={attendance?.[0].lunchEnd || loading}
                                                className="py-2 text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-green-300"
                                            >
                                                {loading ? 'Processing...' : 'End Lunch Break'}
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={closeModal}
                                        className="w-full py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-6 mt-10 bg-white rounded-lg shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800">Attendance for {monthName} {currentYear}</h3>
                    <div className="h-80">
                        <Line data={attendanceData} options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Monthly Attendance' },
                            },
                            maintainAspectRatio: false,
                            scales: {
                                x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
                                y: { min: 0, max: 1, stepSize: 0.5 },
                            },
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
