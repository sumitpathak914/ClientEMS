import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaFileAlt, FaTasks, FaMoneyBillAlt, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import EmployeeDashboard from '../Emp/Emp_Dashboard';
import Emp_Attendance from '../Emp/Emp_Attendace';
import Emp_LeaveManagment from '../Emp/Emp_LeaveManagment';
import Hr_AddEMP from '../Hr/Hr_AddEMP';
import Hr_Attendance_Managment from '../Hr/Hr_Attendance/Hr_Attendance_Managment';
import Hr_Attendance_EMP_List from '../Hr/Hr_Attendance/Hr_Attendance_EMP_List';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard'); // Track active tab
    const navigate = useNavigate();
    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set active tab when clicked
    };

    const HandleLogout = () => {
        navigate('/')
    }
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-[300px] bg-blue-500 text-white p-6">
                <h2 className="mb-8 text-3xl font-semibold text-center">Dashboard</h2>
                <div className="space-y-4">
                    <div
                        onClick={() => handleTabClick('Dashboard')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Dashboard' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </div>
                    <div
                        onClick={() => handleTabClick('Add Employee')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Add Employee' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaTachometerAlt />
                        <span>Add Employee</span>
                    </div>
                    <div
                        onClick={() => handleTabClick('Attendance')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Attendance' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaCalendarAlt />
                        <span>Attendance</span>
                    </div>
                    <div
                        onClick={() => handleTabClick('Hr_Attendance')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Hr_Attendance' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaCalendarAlt />
                        <span>Hr_Attendance</span>
                    </div>
                    <div
                        onClick={() => handleTabClick('Work Report')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Work Report' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaFileAlt />
                        <span>Work Report</span>
                    </div>
                    <div
                        onClick={() => handleTabClick('Leave Management')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Leave Management' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaUser />
                        <span>Leave Management</span>
                    </div>
                    <div
                        onClick={() => handleTabClick('Document')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Document' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaFileAlt />
                        <span>Document</span>
                    </div>
                    
                    <div
                        onClick={() => handleTabClick('Salary Management')}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Salary Management' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaMoneyBillAlt />
                        <span>Salary Management</span>
                    </div>
                    <div
                        onClick={HandleLogout}
                        className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Log out' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                    >
                        <FaSignOutAlt />
                        <span>Log out</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 bg-white rounded-l-lg shadow-lg">
                {/* <h1 className="mb-6 font-serif text-2xl font-semibold">Welcome to Your Dashboard</h1> */}
                <div className="mt-6">
                    {activeTab === 'Dashboard' && <EmployeeDashboard />}
                    {activeTab === 'Add Employee' && <Hr_AddEMP />}
                    {activeTab === 'Attendance' && <Emp_Attendance />}
                    {activeTab === 'Hr_Attendance' && <Hr_Attendance_EMP_List />}
                    {activeTab === 'Work Report' && <div>Content for Work Report</div>}
                    {activeTab === 'Leave Management' && <Emp_LeaveManagment />}
                    {activeTab === 'Document' && <div>Content for Document</div>}
                   
                    {activeTab === 'Salary Management' && <div>Content for Salary Management</div>}
                    {activeTab === 'Log out' && <div>Logging out...</div>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
