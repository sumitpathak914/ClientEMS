import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Auth/Login';

import Dashboard from './Component/Auth/Dashbaord';
import Emp_Attendance from './Component/Emp/Emp_Attendace';
import Emp_LeaveManagment from './Component/Emp/Emp_LeaveManagment';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/Dashboard" element={<ProtectedRoute><Emp_Dashboard /></ProtectedRoute>} /> */}
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Attendance" element={<Emp_Attendance />} />
      <Route path="/Leave_Managment" element={<Emp_LeaveManagment />} />
    </Routes>

  );
}

export default App;
