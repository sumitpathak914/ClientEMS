import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { BaseUrl } from "../Auth/Url";
import CryptoJS from 'crypto-js';
import { useLocation } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
const Emp_WorkReport = () => {
  const [reports, setReports] = useState([]);
  console.log(reports, "reports")
  const location = useLocation();
  const { id, name } = location.state || {};
  console.log(id ,name)
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const SECRET_KEY = 'your-secret-key';
  const [newReport, setNewReport] = useState({
    date: '',
    task: '',
    manager: '',
    empID: '',
  });

  // Filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeeMore = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Load user data from sessionStorage
  useEffect(() => {
    const encryptedToken = sessionStorage.getItem('authToken');
    const encryptedUserData = sessionStorage.getItem('userData');

    if (encryptedToken && encryptedUserData) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUserData, SECRET_KEY);
        const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setUserData(decryptedUserData);
        setNewReport((prevReport) => ({
          ...prevReport,
          empID: decryptedUserData.id, // Set empID after decryption
        }));
      } catch (error) {
        console.error("Decryption failed:", error);
      }
    } else {
      console.log("No user data or token found in sessionStorage");
    }
  }, []);

  // Fetch reports with filters
  useEffect(() => {
    FetchAllWorkReport()
  }, [userData, id, currentPage, startDate, endDate]);
 // Dependency array
  const FetchAllWorkReport = () => {
    if (userData || id) {
      // Reset reports only when filters are applied or pagination changes
      setReports([]); // Clears previous data before making API call

      const filterData = {
        empID: id || userData?.id, // Use 'id' if present, otherwise fallback to 'userData.id'
        page: currentPage,
        limit: 10,
        startDate,
        endDate,
      };

      axios
        .post(`${BaseUrl}/api/get-reports`, filterData)
        .then((response) => {
          // Update reports with the response data, ensure it's an empty array if no reports found
          setReports(response.data.reports || []);
          setTotalPages(response.data.totalPages || 1); // Assuming your API returns the total pages for pagination
        })
        .catch((error) => {
          console.error("Error fetching reports:", error);
          setReports([]); // Ensure reports state is reset in case of error
        });
    }
}



  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/api/add-work-report`, newReport);
      alert(response.data.message || 'Work report added successfully');
      setShowForm(false);
      setNewReport({ date: '', task: '', manager: '' }); // Reset form
      
    } catch (error) {
      console.error('Failed to add work report:', error.response?.data || error.message);
      alert('Failed to add work report. Please try again.');
    }
  };

  // Filter function
  const handleFilter = () => {
    setCurrentPage(1); // Reset to first page when applying filters
  };

  // Clear filters function
  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setCurrentPage(1); // Reset to first page when clearing filters
  };
  const handleDelete = async (reportID, empID) => {
    debugger
    try {
      await axios.delete(`${BaseUrl}/api/work-reports/delete`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { empID, reportID }, // DELETE requests can send a body like this
      });

    
      FetchAllWorkReport()
    } catch (error) {
      console.error('Error deleting work report:', error);
      alert('Failed to delete work report');
    }
  };

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-6xl p-8 mx-auto bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-700">Employee Management {name && `${name}`} - Work Report</h1>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            onClick={handleFilter}
            className="px-6 py-2 font-semibold text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 font-semibold text-white transition bg-gray-400 rounded-lg shadow-md hover:bg-gray-500"
          >
            Clear
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 font-semibold text-white transition bg-green-500 rounded-lg shadow-md hover:bg-green-600"
          >
            Add New Report
          </button>
        </div>

        {/* Reports Table */}
        {reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
              <thead>
                <tr className="text-sm font-semibold text-white uppercase bg-indigo-700">
                  <th className="px-6 py-4 border">Date</th>
                  <th className="px-6 py-4 border">Task</th>
                  <th className="px-6 py-4 border">Reporting Manager</th>
                  {userData?.role === "HR" && (
                    <th className="px-6 py-3 text-left border">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                    <td className="px-6 py-4 text-center border">
                      {new Date(report.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-center border">
                      {report.task.length > 100 ? (
                        <>
                          <span>{report.task.slice(0, 30)}...</span>
                          <button
                            className="ml-2 text-blue-500"
                            onClick={() => handleSeeMore(report.task)}
                          >
                            See More
                          </button>
                        </>
                      ) : (
                        <span>{report.task}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center border">{report.manager}</td>

{userData?.role === "HR" && (
                      <td className="gap-2 px-6 py-4 text-center border">
                       
                                                
                        <button className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(report.id, report.empID)}
                        >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
 {/* Don't show anything if reports are empty */}

        {reports.length === 0 && (
          <p className="text-center text-gray-500">No reports found.</p>
        )}

        {/* Add Report Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-30">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[700px]">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">Add Work Report</h2>
              <form onSubmit={handleFormSubmit}>
                {/* Date Field */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-gray-600">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newReport.date}
                    onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                    required
                  />
                </div>

                {/* Task Field */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-gray-600">Task</label>
                  <div className="border border-gray-300 rounded-lg">
                    <JoditEditor
                      value={newReport.task || ""}
                      onBlur={(newContent) =>
                        setNewReport({ ...newReport, task: newContent || "" })
                      }
                      config={{
                        placeholder: "Start typing your task...",
                        toolbarSticky: true,
                        height: 300,
                      }}
                    />
                  </div>
                </div>

                {/* Reporting Manager Field */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-gray-600">Reporting Manager</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newReport.manager}
                    onChange={(e) => setNewReport({ ...newReport, manager: e.target.value })}
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 text-white transition bg-gray-400 rounded-lg shadow-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition bg-green-500 rounded-lg shadow-md hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="w-1/2 p-6 bg-white rounded-lg h-[400px] overflow-auto">
              <div className="flex justify-between">
                <h3 className="mb-4 text-lg font-semibold">Task Details</h3>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Close
                </button>
                </div>
             
              <div
                dangerouslySetInnerHTML={{ __html: selectedTask }} // Task content with HTML
              />
              
            </div>
          </div>
        )}

        {
          reports.length > 10 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-white transition duration-200 bg-indigo-500 rounded-l hover:bg-indigo-600 disabled:opacity-50">
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'} transition duration-200`}>
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-white transition duration-200 bg-indigo-500 rounded-r hover:bg-indigo-600 disabled:opacity-50">
                Next
              </button>
            </div>
          )
        }
        

      </div>
    </div>
  );
};

export default Emp_WorkReport;
