import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Auth/Login';

import Emp_Attendance from './Component/Emp/Emp_Attendace';
import Emp_LeaveManagment from './Component/Emp/Emp_LeaveManagment';
import Hr_Attendance_Managment from './Component/Hr/Hr_Attendance/Hr_Attendance_Managment';
import Dashboard from './Component/Auth/Dashbaord';
import Hr_AddEMP from './Component/Hr/Hr_AddEMP';
import Hr_Attendance_EMP_List from './Component/Hr/Hr_Attendance/Hr_Attendance_EMP_List';
import Emp_WorkReport from './Component/Emp/Emp_WorkReport';
import Emp_Document from './Component/Emp/Emp_Document';
import Emp_salary from './Component/Emp/Emp_salary';
import EmployeeDashboard from './Component/Emp/Emp_Dashboard';
import Layout from './Component/Auth/Layout';


function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes with Layout */}
      <Route element={<Layout />}>
        {/* emproute */}
        <Route path="/Dashboard" element={<EmployeeDashboard />} />
        <Route path="/Attendance" element={<Emp_Attendance />} />
        <Route path="/Leave_Managment" element={<Emp_LeaveManagment />} />
        <Route path="/viewAttendance/:id" element={<Hr_Attendance_Managment />} />
        <Route path="/Work_Report" element={<Emp_WorkReport />} />
        <Route path="/Document" element={<Emp_Document />} />
        <Route path="/salary_Managment" element={<Emp_salary />} />

        {/* hrroute */}
        <Route path="/Employee_Attendance" element={<Hr_Attendance_EMP_List />} />
        <Route path="/Employee_Details" element={<Hr_AddEMP />} />
      </Route>
    </Routes>
  );
}

export default App;
