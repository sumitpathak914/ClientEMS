import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Swal from 'sweetalert2';

function Hr_viewApplication() {
  const { empId } = useParams(); // Get the employee ID from the URL
  const [applications, setApplications] = useState([]);
  const [name, setName] = useState("");
   const BaseUrl ="https://ems-backend-uat.vercel.app"
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);
console.log(selectedApplication,"selectedApplication")
  // Filter applications by employee ID and status
  const filteredApplications = applications.filter(
    (app) => statusFilter === "All" || app.status === statusFilter
  );

  // Handle status change
  const handleStatusChange = async (status) => {
    if (selectedApplication) {
      try {
        // Update the status in the backend
        await axios.patch(`${BaseUrl}/api/leave/${selectedApplication._id}`, {
          status,
        });

        // Update the status in the local state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApplication._id ? { ...app, status } : app
          )
        );

        setSelectedApplication(null); // Close the modal
      } catch (error) {
        console.error("Error updating leave status:", error);
      }
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
        empId: empId,
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

  useEffect(() => {
    fetchLeaveRequests();
  }, [empId]);

  const fetchLeaveRequests = async () => {
    if (empId) {
      try {
        const response = await axios.get(`${BaseUrl}/api/leave/employee/${empId}`);
        setApplications(response.data.data.leaveApplications.reverse());
        setName(response.data.data.name);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    }
  };

  // Format Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="p-8 bg-gray-100">
     <div className="p-8 bg-gray-100">
      <h2 className="mb-6 text-2xl font-semibold">
        Leave Applications for Employee: {name}
      </h2>

      {/* Status Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Applications Table */}
      {filteredApplications.length > 0 ? (
        <table className="w-full bg-white border rounded shadow-md">
          <thead className="text-white bg-blue-500">
            <tr>
              <th className="p-2 text-left">Leave Type</th>
              <th className="p-2 text-left">Start Date</th>
              <th className="p-2 text-left">End Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id} className="transition border-b hover:bg-gray-100">
                <td className="p-2">{app.leaveType}</td>
                <td className="p-2">{formatDate(app.startDate)}</td>
                <td className="p-2">{formatDate(app.endDate)}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      app.status === "Approved"
                        ? "bg-green-200 text-green-700"
                        : app.status === "Rejected"
                        ? "bg-red-200 text-red-700"
                        : app.status === "Cancelled"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                    onClick={() => setSelectedApplication(app)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-center text-gray-600">No applications found.</p>
      )}
    </div>

  {/* Modal for Leave Details */}
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
      </div>
</div>)}

     {/* Modal for Leave Details */}
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
              className={`px-3 py-1 text-sm rounded font-bold ${
                selectedApplication.status === "Approved"
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
      {new Date(selectedApplication.leaveApplyDate).toLocaleDateString('en-US', {
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
          <h4 className="text-lg font-medium text-gray-600">Reason</h4>
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
</div> )
}




export default Hr_viewApplication;