import axios from "axios";
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { BaseUrl } from "../../Auth/Url";
const Hr_LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]); // For filtered data
  const [userData, setUserData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Pending"); // Track active filter
  const SECRET_KEY = 'your-secret-key';
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Decrypt User Data
  useEffect(() => {
    const encryptedData = sessionStorage.getItem('userData');
    if (encryptedData) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const parsedData = JSON.parse(decryptedData);
      setUserData(parsedData);
    }
  }, []);

  useEffect(() => {
    fetchLeaveRequests();
  }, [userData, startDate, endDate, activeFilter]);

  useEffect(() => {
    filterRequests(activeFilter);
  }, [leaveRequests, activeFilter]);

  // Fetch leave requests
  const fetchLeaveRequests = async () => {
    if (userData && userData.id) {
      try {
        const response = await axios.get(`${BaseUrl}/api/employee_Leave`, {
          params: {
            status: activeFilter,
            startDate,
            endDate,
          },
        });
        setLeaveRequests(response.data.data);
        setFilteredRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    }
  };

  // Filter leave requests by status
  const filterRequests = (status) => {
    setActiveFilter(status); // Update active filter
    if (status === "All") {
      setFilteredRequests(leaveRequests);
    } else {
      setFilteredRequests(
        leaveRequests.filter((request) => request.status === status)
      );
    }
  };
  const handleStatusChangeApi = async (newStatus) => {
    try {
      const response = await fetch(`${BaseUrl}/api/leave/LeaveStatus_Update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empId: selectedApplication.empId,
          leaveId: selectedApplication._id,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the selectedApplication status locally
        setSelectedApplication(null);
        setSelectedApplication((prev) => ({ ...prev, status: newStatus }));

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Leave status updated to ${newStatus} successfully.`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            // Refresh the page
            window.location.reload();
          }
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to update leave status.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating leave status.',
        confirmButtonText: 'OK',
      });
    }
  };
  return (
    <>
      <div className="p-5">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Leave Approval</h2>


        <div className="flex gap-3 mb-5">
          <div className="flex gap-4 mb-5">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded-md"
            />
            <button
              onClick={fetchLeaveRequests}
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Apply Date Filter
            </button>
          </div>
          <div>
            <select
              value={activeFilter}
              onChange={(e) => filterRequests(e.target.value)}
              className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-indigo-500 hover:text-white"
            >
              {["Approved", "Rejected", "Pending", "Cancel"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

        </div>
        


        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-lg shadow-md">
            <table className="w-full border border-collapse border-gray-300">
              <thead className="text-white bg-indigo-600">
                <tr>
                  <th className="px-6 py-3 text-left border">Employee Name</th>
                  <th className="px-6 py-3 text-left border">Leave Type</th>
                  <th className="px-6 py-3 text-left border">Start Date</th>
                  <th className="px-6 py-3 text-left border">End Date</th>

                  <th className="px-6 py-3 text-left border">Status</th>
                  <th className="px-6 py-3 text-left border">Action</th>
                </tr>
              </thead>
              <tbody className="border">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="border-t">
                      <td className="px-4 py-3 text-gray-700 border">{request.name}</td>
                      <td className="px-4 py-3 text-gray-600 border">{request.leaveType}</td>
                      <td className="px-4 py-3 text-gray-600 border">
                        {new Intl.DateTimeFormat("en-US").format(new Date(request.startDate))}
                      </td>
                      <td className="px-4 py-3 text-gray-600 border">
                        {new Intl.DateTimeFormat("en-US").format(new Date(request.endDate))}
                      </td>

                      <td className="px-4 py-3 text-center border">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${request.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : request.status === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 border">
                        <button
                          className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                          onClick={() => setSelectedApplication(request)}
                        >
                          Details
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-600">
                      No Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="w-3/5 transition-all transform bg-white rounded-lg shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-700">Leave Details</h3>
                <button
                  className="text-2xl text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedApplication(null)}
                >
                  &times;
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-medium text-gray-600">Leave Type</h4>
                    <span className="text-lg font-semibold text-gray-800">
                      {selectedApplication.leaveType}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-medium text-gray-600">Status</h4>
                    <span
                      className={`px-3 py-1 text-sm rounded font-bold ${selectedApplication.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : selectedApplication.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedApplication.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-medium text-gray-600">Start Date</h4>
                    <span className="text-gray-800">
                      {new Date(selectedApplication.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-medium text-gray-600">End Date</h4>
                    <span className="text-gray-800">
                      {new Date(selectedApplication.endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-600">Description</h4>
                  <p className="italic text-gray-700">{selectedApplication.description
                  }</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between p-6 border-t border-gray-200">
                <div>
                  <button
                    className="px-6 py-2 font-medium text-white transition bg-green-500 rounded-lg hover:bg-green-600"
                    onClick={() => handleStatusChangeApi("Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-6 py-2 ml-2 font-medium text-white transition bg-yellow-500 rounded-lg hover:bg-yellow-600"
                    onClick={() => handleStatusChangeApi("Pending")}
                  >
                    Pending
                  </button>
                </div>
                <div>
                  <button
                    className="px-6 py-2 font-medium text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                    onClick={() => handleStatusChangeApi("Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="px-6 py-2 ml-2 font-medium text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
                    onClick={() => handleStatusChangeApi("Cancel")}
                  >
                    Cancel Leave
                  </button>
                  <button
                    className="px-6 py-2 ml-2 font-medium text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={() => setSelectedApplication(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hr_LeaveManagement;
