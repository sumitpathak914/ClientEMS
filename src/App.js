import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import SidebarComponent from './Component/Auth/sidebar';
import ProtectedRoute from './Component/Auth/protectedRoute';
import Layout from './Component/Auth/Layout';
import Emp_ClientManagment from './Component/Emp/Emp_ClientManagment';
import Emp_Leaderbord from './Component/Emp/Emp_Leaderbord';
import HR_EMPDocument from './Component/Hr/HR_EMPDocumentSection/HR_EMPDocument';

function App() {
  const [token, setToken] = useState(null);

  // Check for token in sessionStorage when the component mounts
  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    setToken(storedToken); // Set the token to state
  }, []); 

  return (
    <div className="flex h-screen">
     
      {/* {token && <SidebarComponent />} */}
      <Layout />
   
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Routes>
        
          <Route path="/" element={<Login />} />
          {/* Employee Routes */}
          <Route path="/Dashboard" element={ <ProtectedRoute>
            <EmployeeDashboard />
                    </ProtectedRoute>} />
          <Route path="/Attendance" element={<ProtectedRoute>
            <Emp_Attendance />
                    </ProtectedRoute>} />
          <Route path="/Leave_Managment" element={<ProtectedRoute>
            <Emp_LeaveManagment />
                    </ProtectedRoute>} />
          <Route path="/viewAttendance/:id" element={<ProtectedRoute>
            <Hr_Attendance_Managment />
                    </ProtectedRoute>} />
          <Route path="/Work_Report" element={<ProtectedRoute>
            <Emp_WorkReport />
                    </ProtectedRoute>} />
          <Route path="/Document" element={<ProtectedRoute>
            <Emp_Document />
                    </ProtectedRoute>} />
          <Route path="/salary_Managment" element={<ProtectedRoute>
            <Emp_salary />
                    </ProtectedRoute>} />

                    <Route path="/Emp_ClientManagment" element={<ProtectedRoute>
            < Emp_ClientManagment/>
                    </ProtectedRoute>} />

                    <Route path="Emp_Leaderbord/" element={<ProtectedRoute>
            <Emp_Leaderbord/>
                    </ProtectedRoute>} />



          {/* HR Routes */}
          <Route path="/Employee_Attendance" element={<Hr_Attendance_EMP_List />} />
          <Route path="/Employee_Details" element={<Hr_AddEMP />} />
          <Route path="/HR_EMPDocument" element={<HR_EMPDocument />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
