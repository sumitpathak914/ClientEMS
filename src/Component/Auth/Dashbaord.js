import React, { useState } from 'react';

import Emp_Attendance from '../Emp/Emp_Attendace';
import EmployeeDashboard from '../Emp/Emp_Dashboard';
import Emp_LeaveManagment from '../Emp/Emp_LeaveManagment';
import Hr_AddEMP from '../Hr/Hr_AddEMP';
import Hr_Attendance_EMP_List from '../Hr/Hr_Attendance/Hr_Attendance_EMP_List';
import SidebarComponent from './sidebar';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <SidebarComponent activeTab={activeTab} onTabClick={handleTabClick} />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-white rounded-l-lg shadow-lg">
                <div className="mt-6">
                    {/* {activeTab === 'Dashboard' && <EmployeeDashboard />} */}
                    {/* {activeTab === 'Add Employee' && <Hr_AddEMP />} */}
                    {/* {activeTab === 'Attendance' && <Emp_Attendance />} */}
                    {/* {activeTab === 'Hr_Attendance' && <Hr_Attendance_EMP_List />} */}
                    {/* {activeTab === 'Work Report' && <div>Content for Work Report</div>} */}
                    {/* {activeTab === 'Leave Management' && <Emp_LeaveManagment />} */}
                    {/* {activeTab === 'Document' && <div>Content for Document</div>} */}
                    {/* {activeTab === 'Salary Management' && <div>Content for Salary Management</div>} */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
