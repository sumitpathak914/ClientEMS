import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { FaRegEye } from 'react-icons/fa';
import { BaseUrl } from '../Auth/Url';

import { useParams } from 'react-router-dom';

const Emp_WorkReport = () => {
  const { emp_id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [workReports, setWorkReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const SECRET_KEY = 'your-secret-key';
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
                 
             } catch (error) {
                 console.error("Decryption failed:", error); // Log if decryption fails
             }
         } else {
             console.log("No user data or token found in sessionStorage");
         }
     }, []);

  useEffect(() => {
    if (userData?.empID || emp_id) {
      fetchWorkReports();
    }
  }, [userData]);

  const fetchWorkReports = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/work-reports/getReports`, {
        emp_id: userData?.id
      });
      setWorkReports(response.data.data.reverse());
      setFilteredReports(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching work reports:', err);
      setError('Failed to fetch work reports');
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (fromDate && toDate) {
      const filtered = workReports.filter((report) => {
        const reportDate = new Date(report.todayDate);
        return reportDate >= new Date(fromDate) && reportDate <= new Date(toDate);
      }); 
      setFilteredReports(filtered);
      setCurrentPage(1);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleModalViewOpenClose = () => setIsModalOpenView(!isModalOpenView);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpenView(true);
  };

  const handleSaveReport = () => {
    console.log('Report Content:', reportContent);
    setIsModalOpen(false);
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClearFilter = () => {
    setFromDate('');
    setToDate('');
    fetchWorkReports();
  };

  return (
    <div className="p-6 mt-5">
      <div className="p-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Employee Management - Work Report</h1>
          {userData?.role !== 'hr' && (
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={toggleModal}
            >
              Add New Report
            </button>
          )}
        </div>

        <div className="flex mb-4 space-x-4">
          <input
            type="date"
            className="p-2 border rounded-md"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded-md"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            onClick={handleFilter}
          >
            Filter
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            onClick={handleClearFilter}
          >
            Clear
          </button>
        </div>

        {currentReports.length === 0 ? (
          <p>No reports found for this employee.</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-200">
              <tr className="text-center">
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Project</th>
                <th className="p-3 font-medium">Module</th>
                <th className="p-3 font-medium">Hours Worked</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3">{new Date(report.todayDate).toLocaleDateString()}</td>
                  <td className="p-3">{report.details.map((detail) => detail.projectName).join(', ')}</td>
                  <td className="p-3">{report.details.map((detail) => detail.moduleName).join(', ')}</td>
                  <td className="p-3">{report.details.map((detail) => detail.workingHr).join(', ')}</td>
                  <td className="p-3 text-green-600">{report.details.map((detail) => detail.status).join(', ')}</td>
                  <td
                    className="flex justify-center p-3 cursor-pointer"
                    onClick={() => handleViewReport(report)}
                  >
                    <FaRegEye />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredReports.length / reportsPerPage) }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-md mx-1 ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* <ReportModal isModalOpen={isModalOpen} toggleModal={toggleModal} handleSaveReport={handleSaveReport} />
      <ReportModalDisplay
        isModalOpen={isModalOpenView}
        toggleModal={toggleModalViewOpenClose}
        report={selectedReport}
      /> */}
    </div>
  );
};

export default Emp_WorkReport;
