import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EmployeeDashboard = () => {
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-11 (0 = January, 11 = December)
    const [selectedType, setSelectedType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Employee Info Card */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full text-white flex items-center justify-center text-xl font-bold">
                                {employeeData.name[0]}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{employeeData.name}</h2>
                                <p className="text-sm text-gray-500">{employeeData.role}</p>
                                <p className="text-sm text-gray-500">{employeeData.department}</p>
                            </div>
                        </div>
                    </div>

                    {/* Leave Data Card */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave Data for {monthName} {currentYear}</h3>
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
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        {/* Dropdown for Selecting Punching Type */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance/Lunch Punching </h3>
                        <div className=" mb-4 mt-10 w-full">
                            {/* Attendance Punching */}
                            <p
                                className="cursor-pointer text-blue-500 hover:text-blue-700 font-medium"
                                onClick={() => handleTypeClick('attendance')}
                            >
                                Attendance Punching
                            </p>

                            {/* Lunch Punching */}
                            <p
                                className="cursor-pointer text-blue-500 hover:text-blue-700 font-medium mt-10"
                                onClick={() => handleTypeClick('lunch')}
                            >
                                Lunch Punching
                            </p>
                        </div>

                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                    <h2 className="text-xl font-bold mb-4">
                                        {selectedType === 'attendance'
                                            ? 'Attendance Punching'
                                            : 'Lunch Punching'}
                                    </h2>
                                    {selectedType === 'attendance' && (
                                        <div className="flex flex-col space-y-4">
                                            <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                                                In Punching
                                            </button>
                                            <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                                                Out Punching
                                            </button>
                                        </div>
                                    )}
                                    {selectedType === 'lunch' && (
                                        <div className="flex flex-col space-y-4">
                                            <button className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                                                Start Lunch Break
                                            </button>
                                            <button className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                                                End Lunch Break
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={closeModal}
                                        className="mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 w-full"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance for {monthName} {currentYear}</h3>
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
