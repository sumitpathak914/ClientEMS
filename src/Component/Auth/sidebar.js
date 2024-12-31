import React, { useEffect, useState } from 'react';
import { FaTachometerAlt, FaUser, FaFileAlt, FaMoneyBillAlt, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { MdLeaderboard } from "react-icons/md";

const SidebarComponent = ({ activeTab, onTabClick }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [userRole, setUserRole] = useState(null); // Store the role
    const SECRET_KEY = 'your-secret-key'; // Same secret key used during login

    useEffect(() => {
        // Retrieve encrypted token and user data from sessionStorage
        const encryptedToken = sessionStorage.getItem('authToken');
        const encryptedUserData = sessionStorage.getItem('userData');

        if (encryptedToken && encryptedUserData) {
            // Decrypt the token and user data
            const bytes = CryptoJS.AES.decrypt(encryptedUserData, SECRET_KEY);
            const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            setUserData(decryptedUserData);
            setUserRole(decryptedUserData.role); // Assuming `role` is part of user data
        }
    }, []);

    const handleLogout = () => {
        // Clear all session storage data
        sessionStorage.clear();

        // Redirect to login page (or root page)
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="w-[300px] bg-blue-500 text-white p-6">
            <h2 className="mb-8 text-3xl font-semibold text-center">Dashboard</h2>
            <div className="space-y-4">
                {/* Dashboard */}
                <Link
                    to='/Dashboard'
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Dashboard' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </Link>

                {/* Render links based on role */}
                {userRole === 'HR' && (
                    <>
                        {/* Add Employee */}
                        <Link
                            to='/Employee_Details'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Add Employee' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <FaUser />
                            <span>Add Employee</span>
                        </Link>

                        {/* Hr_Attendance */}
                        <Link
                            to='/Employee_Attendance'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Hr_Attendance' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <FaCalendarAlt />
                            <span>Hr_Attendance</span>
                        </Link>

                        {/* Salary Management */}
                        <Link
                            to='/salary_Managment'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Salary Management' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <FaMoneyBillAlt />
                            <span>Salary Management</span>
                        </Link>
                    </>
                )}

                {userRole === 'Employee' && (
                    <>
                        {/* Work Report */}
                       

                        {/* Attendance */}
                        <Link
                            to='/Attendance'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Attendance' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <FaCalendarAlt />
                            <span>Attendance</span>
                        </Link>
                        <Link
                            to='/Work_Report'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Work Report' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <FaFileAlt />
                            <span>Work Report</span>
                        </Link>
                        {/* Leave Management */}
                        <Link
                            to='/Leave_Managment'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Leave Management' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <FaUser />
                            <span>Leave Management</span>
                        </Link>
                        <Link
                            to='/Leave_Managment'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Leave Management' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <FaUser />
                            <span>Client Managment</span>
                        </Link>

                        <Link
                            to='/Leave_Managment'
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Leave Management' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                        >
                            <MdLeaderboard />
                            <span>Leaderboard</span>
                        </Link>
                    </>
                )}

                {/* Common Links for both HR and Employee */}
                <Link
                    to='/Document'
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Document' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                >
                    <FaFileAlt />
                    <span>Document</span>
                </Link>

                {/* Logout */}
                <div
                    onClick={handleLogout}
                    className="flex items-center p-3 space-x-4 rounded-md cursor-pointer hover:bg-blue-600"
                >
                    <FaSignOutAlt />
                    <span>Log out</span>
                </div>
            </div>
        </div>
    );
};

export default SidebarComponent;
