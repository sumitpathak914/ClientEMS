import React from 'react';
import { FaTachometerAlt, FaUser, FaFileAlt, FaMoneyBillAlt, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const SidebarComponent = ({ activeTab, onTabClick }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="w-[300px] bg-blue-500 text-white p-6">
            <h2 className="mb-8 text-3xl font-semibold text-center">Dashboard</h2>
            <div className="space-y-4">
                {/* Dashboard */}
                <Link
                    to='/Dashboard'
                    // onClick={() => onTabClick('Dashboard')}
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Dashboard' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </Link>

                {/* Add Employee */}
                <Link
                    // onClick={() => onTabClick('Add Employee')}
                    to='/Employee_Details'
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Add Employee' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaUser />
                    <span>Add Employee</span>
                </Link>

                {/* Attendance */}
                <Link
                    // onClick={() => onTabClick('Attendance')}
                    to='/Attendance'
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Attendance' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaCalendarAlt />
                    <span>Attendance</span>
                </Link>

                {/* Hr_Attendance */}
                <Link
                    to='/Employee_Attendance'
                    // onClick={() => onTabClick('Hr_Attendance')}
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Hr_Attendance' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaCalendarAlt />
                    <span>Hr_Attendance</span>
                </Link>

                {/* Work Report */}
                <Link
                    to='/Work_Report'
                    // onClick={() => onTabClick('Work Report')}
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Work Report' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaFileAlt />
                    <span>Work Report</span>
                </Link>

                {/* Leave Management */}
                <Link
                    to='/Leave_Managment'
                    // onClick={() => onTabClick('Leave Management')}
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Leave Management' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaUser />
                    <span>Leave Management</span>
                </Link>

                {/* Document */}
                <Link
                    to='/Document'
                    // onClick={() => onTabClick('Document')}
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Document' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaFileAlt />
                    <span>Document</span>
                </Link>

                {/* Salary Management */}
                <Link
                    to='/salary_Managment'
                    // onClick={() => onTabClick('Salary Management')}
                    className={`flex items-center space-x-4 cursor-pointer p-3 rounded-md ${activeTab === 'Salary Management' ? 'bg-blue-700' : 'hover:bg-blue-600'
                        }`}
                >
                    <FaMoneyBillAlt />
                    <span>Salary Management</span>
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
