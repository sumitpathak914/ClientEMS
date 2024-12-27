// import React from 'react'

// const Emp_LeaveManagment = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Emp_LeaveManagment
import axios from "axios";
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { BaseUrl } from "../Auth/Url";

const Emp_LeaveManagment = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [name, setName] = useState('');
    const [selectedData, setselectedData] = useState({});
    console.log(selectedData, "selectedData")
    const [userData, setUserData] = useState(null);
    const [view, setView] = useState(false);
    console.log(userData)
    // Fetch and decrypt user data from sessionStorage
    useEffect(() => {
        const encryptedData = sessionStorage.getItem('userData');
        if (encryptedData) {
            const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'TechMET@183').toString(CryptoJS.enc.Utf8);
            const parsedData = JSON.parse(decryptedData);
            setUserData(parsedData); // Populate user data
        }
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState("");

    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [description, setDescription] = useState(
        `Respective [Manager's Name],\n\nI would like to formally request leave from [Start Date] to [End Date] for [reason].\n\nThank you for considering my request.\n\nBest regards,\n[Your Name]`
    );
    useEffect(() => {


        fetchLeaveRequests();
    }, [userData]);

    useEffect(() => {
        if (startDate && endDate) {
            // Determine the description based on the type of leave and the number of days
            const isSingleDayLeave = startDate === endDate;
            const leavePeriod = isSingleDayLeave
                ? `on ${startDate}`
                : `from ${startDate} to ${endDate}`;
            const newDescription = `Respective [Manager's Name],\n\nI would like to formally request ${leaveType} ${leavePeriod} for [reason].\n\nThank you for considering my request.\n\nBest regards,\n[Your Name]`;
            setDescription(newDescription);
        }
    }, [leaveType, startDate, endDate]);

    const openModal = (description) => {
        setSelectedDescription(description);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setDescription("Respective [Manager's Name],\n\nI would like to formally request leave from [Start Date] to [End Date] for [reason].\n\nThank you for considering my request.\n\nBest regards,\n[Your Name]")
        setLeaveType('')
        setStartDate('')
        setEndDate('')
        setView(false)
        setIsModalOpen(false);
        setView(false)
        setSelectedDescription("Respective [Manager's Name],\n\nI would like to formally request leave from [Start Date] to [End Date] for [reason].\n\nThank you for considering my request.\n\nBest regards,\n[Your Name]");
    };

    const handleApply = async () => {
        try {
            // Replace with your backend endpoint URL
            const response = await axios.post(`${BaseUrl}/api/leave/apply`, {
                leaveType,
                startDate,
                endDate,
                description,
                name: userData.name,
                empId: userData.empID, // Replace this with the actual employee ID from your app state or context
            });

            if (response.status === 200) {
                // Show success alert with SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Leave application submitted successfully.',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchLeaveRequests()
                        closeModal(); // Close the modal after the user clicks "OK"
                    }
                });

                console.log(response.data.reverse());
                return; // Exit the function after handling success
            }
        } catch (error) {
            console.error('Error submitting leave application:', error);

        }
    };
    const fetchLeaveRequests = async () => {
        if (userData && userData.empID) {
            try {
                const response = await axios.get(`${BaseUrl}/api/leave/employee/${userData.empID}`);
                setLeaveRequests(response.data.data.leaveApplications.reverse());
                setName(response.data.data.name)
            } catch (error) {
                console.error("Error fetching leave requests:", error);

            }
        }
    };

    const HandleOpenandView = (data, action) => {
        setSelectedDescription(data.description)
        setLeaveType(data.leaveType)
        setStartDate(data.startDate)
        setEndDate(data.endDate)
        setView(true)
        setIsModalOpen(true)

        setselectedData(data)
    }
    return (
        <>
            <div className="flex justify-between">
                <h2 className="mb-6 font-serif text-3xl font-bold text-gray-800">
                    Leave Approval
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 py-3 mb-6 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Apply for Leave
                </button>
            </div>
            <div className="flex flex-col items-center py-8">
                <div className="w-full  bg-white rounded-lg shadow-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-indigo-500 text-white">
                                <th className="px-4 py-2 text-left ">
                                    Employee Name
                                </th>
                                <th className="px-4 py-2 text-left ">
                                    Leave Type
                                </th>
                                <th className="px-4 py-2 text-left ">
                                    Start Date
                                </th>
                                <th className="px-4 py-2 text-left ">End Date</th>
                                <th className="px-4 py-2 text-center ">
                                    Description
                                </th>
                                <th className="px-4 py-2 text-center ">Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {leaveRequests.map((request) => (
                                <tr key={request.id} className="border-t">
                                    <td className="px-4 py-3 text-gray-700">
                                        {name}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{request.leaveType}</td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }).format(new Date(request.startDate))}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }).format(new Date(request.endDate))}
                                    </td>

                                    <td className="px-4 py-3 text-center text-gray-600">
                                        <span
                                            className="cursor-pointer hover:underline"
                                            onClick={() => HandleOpenandView(request, "view")}
                                        >
                                            Click Here
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${request.status === "Approved"
                                                    ? "bg-green-100 text-green-600"
                                                    : request.status === "Disapproved"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        leaveRequests.length <= 0 && (
                            <>
                                <p className="text-center text-gray-600 text-[20px] font-bold p-2">No Records Found</p>
                            </>
                        )
                    }
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center font-serif bg-black bg-opacity-50">
                            <div className="w-[500px] p-6 bg-white rounded-lg shadow-lg h-[600px] overflow-auto">
                                <h3 className="mb-4 font-serif text-xl font-semibold text-gray-700">
                                    Apply for Leave
                                </h3>

                                <div className="mb-4">
                                    <label className="block mb-2 text-gray-600">Leave Type</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        disabled={view}
                                    >
                                        <option value="">Select Leave Type</option>
                                        <option value="Sick Leave">Sick Leave</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Vacation Leave">Vacation Leave</option>
                                        <option value="Maternity Leave">Maternity Leave</option>
                                    </select>
                                </div>

                                <div className="flex justify-between mb-2">
                                    <div>
                                        <label className="block mb-2 text-gray-600">Start Date</label>
                                        <input
                                            type="date"
                                            className="w-[200px] px-3 py-2 border rounded-md"
                                            value={startDate.split('T')[0]} // Convert ISO string to YYYY-MM-DD
                                            onChange={(e) => setStartDate(e.target.value)}
                                            disabled={view}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-gray-600">End Date</label>
                                            <input
                                                type="date"
                                                className="w-[200px] px-3 py-2 border rounded-md"
                                                value={endDate.split('T')[0]} // Convert ISO string to YYYY-MM-DD
                                                onChange={(e) => setEndDate(e.target.value)}
                                                disabled={view}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-gray-600">Description</label>
                                    {
                                        view ? <textarea
                                            rows="4"
                                            className="w-full px-3 py-2 border rounded-md h-[300px]"
                                            value={selectedDescription}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Describe your leave request..."
                                            disabled={view}
                                        ></textarea> : <textarea
                                            rows="4"
                                            className="w-full px-3 py-2 border rounded-md h-[300px]"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Describe your leave request..."
                                            disabled={view}
                                        ></textarea>
                                    }

                                </div>
                                {view ? null : (
                                    <button
                                        onClick={handleApply}
                                        className="w-full px-4 py-2 mb-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                        disabled={view}
                                    >
                                        Send Leave Approval
                                    </button>
                                )}

                                <button
                                    onClick={closeModal}
                                    className="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default Emp_LeaveManagment;
