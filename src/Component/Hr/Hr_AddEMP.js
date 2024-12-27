// import React, { useState } from 'react';

// const Hr_AddEMP = () => {
//     const [employees, setEmployees] = useState([
//         { id: 1, name: 'Alice', department: 'HR' },
//         { id: 2, name: 'Bob', department: 'Engineering' },
//         { id: 3, name: 'Charlie', department: 'Finance' }
//     ]);

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newEmployee, setNewEmployee] = useState({ name: '', department: '' });

//     // Open/Close Modal
//     const toggleModal = () => {
//         setIsModalOpen(!isModalOpen);
//         setNewEmployee({ name: '', department: '' });
//     };

//     // Handle Add Employee
//     const handleAddEmployee = () => {
//         if (newEmployee.name && newEmployee.department) {
//             setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
//             toggleModal();
//         }
//     };

//     return (
//         <div className="p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

//             {/* Employee Table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="border border-gray-300 px-4 py-2">ID</th>
//                             <th className="border border-gray-300 px-4 py-2">Name</th>
//                             <th className="border border-gray-300 px-4 py-2">Department</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {employees.map((employee) => (
//                             <tr key={employee.id} className="hover:bg-gray-50">
//                                 <td className="border border-gray-300 px-4 py-2 text-center">{employee.id}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{employee.department}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Add Employee Button */}
//             <div className="flex justify-end mt-6">
//                 <button
//                     onClick={toggleModal}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                 >
//                     Add Employee
//                 </button>
//             </div>

//             {/* Add Employee Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-md shadow-md w-96">
//                         <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
//                         <input
//                             type="text"
//                             placeholder="Employee Name"
//                             value={newEmployee.name}
//                             onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
//                             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//                         />
//                         <select
//                             value={newEmployee.department}
//                             onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
//                             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//                         >
//                             <option value="" disabled>Select Department</option>
//                             <option value="HR">HR</option>
//                             <option value="Engineering">Engineering</option>
//                             <option value="Finance">Finance</option>
//                         </select>
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 onClick={toggleModal}
//                                 className="text-gray-600 hover:text-gray-800"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAddEmployee}
//                                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Hr_AddEMP;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { BaseUrl } from '../Auth/Url';
import { useNavigate } from 'react-router-dom';

const Hr_AddEMP = () => {
    // const employees = [
    //   { name: 'Gauri Jadhav', department: 'HR', position: 'senior HR', hiredDate: '2020-01-12', email: 'gauri.jadhav@example.com', number: '+1 234 567 890', imageUrl: 'https://via.placeholder.com/150' },
    //   { name: 'Sumit pathak', department: 'Software Engineer', position: 'React.js & node.js Developer', hiredDate: '2024-02-18', email: 'sumit.pathak@example.com', number: '+1 234 567 891', imageUrl: 'https://via.placeholder.com/150' },
    //   { name: 'Harshal', department: 'Intern', position: ' PHP Intern', hiredDate: '2024-07-20', email: 'Harshal.i@example.com', number: '+1 234 567 892', imageUrl: 'https://via.placeholder.com/150' },
    //   { name: 'Ganesh Patil', department: 'Intern', position: 'Software Tester Intern', hiredDate: '2024-06-15', email: 'ganesh.patil@example.com', number: '+1 234 567 893', imageUrl: 'https://via.placeholder.com/150' },
    //   { name: 'Nandkumar Gaikwad', department: 'Intern', position: 'Software Tester Intern', hiredDate: '2024-05-10', email: 'Nandkumar.Gaikwad@example.com', number: '+1 234 567 894', imageUrl: 'https://via.placeholder.com/150' },
    //   { name: 'Nilesh Pathak', department: 'Software Engineer', position: 'flutter developer', hiredDate: '2024-10-10', email: 'nilesh.pathak@example.com', number: '+1 234 567 895', imageUrl: 'https://via.placeholder.com/150' },

    // ];
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
    const [candidateData, setCandidateData] = useState({
        name: '',
        section: '',
        department: '',
        position: '',
        interview_Date: '',
        hiredDate: '',
        email: '',
        number: '',
        // image: null,
        password: '',
        role: 'employee'
    });
    console.log(candidateData, "candidateData")
    const [view, setView] = useState('all');

    // const handleAddDocument = (employee) => {
    //   Swal.fire({
    //     title: `Add Document for ${employee.name}`,
    //     input: "file",
    //     inputAttributes: {
    //       accept: ".pdf,.doc,.docx,.txt",
    //     },
    //     showCancelButton: true,
    //     confirmButtonText: "Upload",
    //   }).then((result) => {
    //     if (result.isConfirmed && result.value) {
    //       const file = result.value;
    //       // Handle file upload logic here, e.g., send it to the server
    //       console.log(`Document uploaded for ${employee.name}:`, file);
    //       Swal.fire("Uploaded!", "Your document has been uploaded.", "success");
    //     }
    //   });
    // };

    const handleAddDocument = (employee) => {
        navigate("/AddDocument", { state: { employee } });
    }


    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/Emp/employees`);
            if (response.data.statusCode === 200) {
                setEmployees(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };
    useEffect(() => {

        fetchEmployees();
    }, []);

    // Filter employees based on the selected view
    const filteredEmployees = view === 'interns'
        ? employees.filter(emp => emp.section === 'Intern') // Show only interns
        : view === 'employees'
            ? employees.filter(emp => emp.section !== 'Intern') // Show only regular employees (non-interns)
            : employees; // Show all employees (interns + regular employees)
    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCandidateData({ ...candidateData, password });
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidateData({ ...candidateData, [name]: value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        setCandidateData({ ...candidateData, image: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            // Create the candidate data object
            const candidateDataToSend = {
                name: candidateData.name,
                email: candidateData.email,
                password: candidateData.password,
                role: candidateData.role,
                section: candidateData.section,
                department: candidateData.department,
                position: candidateData.position,
                interview_Date: candidateData.interview_Date,
                hiredDate: candidateData.hiredDate,
                number: candidateData.number,
                // image: candidateData.image, // You can handle image differently if needed
            };

            // Send the request
            const response = await axios.post(`${BaseUrl}/Auth/api/register`, candidateDataToSend, {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Candidate added successfully!',
                confirmButtonText: 'OK',
            });

            // Close the modal and refresh the employees list
            setIsModalOpen(false);
            fetchEmployees(); // Refresh the employee list


        } catch (error) {
            console.error('Error adding candidate:', error);

            // Extract and display the server error message, if available
            const errorMessage = error.response?.data?.message || 'Failed to add candidate. Please try again.';

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Employee Data</h2>
                <div className="flex items-center gap-4">
                    {/* Search Field */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Employee..."
                            className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            // onChange={(e) => handleSearch(e.target.value)}
                        />
                        
                    </div>

                    {/* Add Candidate Button */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700 transition-all duration-300"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span className="text-xl font-bold">+</span>
                        <span className="text-sm font-medium">Add Candidate</span>
                    </button>
                </div>
            </div>



            {/* Button for filtering employees */}
            {/* <div className="flex mb-6 space-x-4">
                <button
                    onClick={() => { setView('employees'); }}
                    className="px-6 py-3 text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Employees
                </button>
                <button
                    onClick={() => { setView('interns'); }}
                    className="px-6 py-3 text-white transition duration-300 ease-in-out transform bg-green-600 rounded-full hover:bg-green-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Interns
                </button>
                <button
                    onClick={() => { setView('all'); }}
                    className="px-6 py-3 text-white transition duration-300 ease-in-out transform bg-gray-600 rounded-full hover:bg-gray-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    All Employees
                </button>
            </div> */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredEmployees.map((employee, index) => (
                    <div key={index} className="p-6 transition-all bg-white rounded-lg shadow-lg hover:shadow-xl">
                        <div className="flex justify-center mb-4">
                            <img
                                src={employee.imageUrl}
                                alt={`${employee.name}'s Profile`}
                                className="object-cover w-32 h-32 border-4 border-blue-500 rounded-full"
                            />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-center">{employee.name}({employee.empID})</h3>
                        <p className="mb-2 text-sm text-gray-500">Emp ID: <span className="font-medium text-gray-800">{employee.empID}</span></p>
                        <p className="mb-2 text-sm text-gray-500">Department: <span className="font-medium text-gray-800">{employee.department}</span></p>
                        <p className="mb-2 text-sm text-gray-500">Position: <span className="font-medium text-blue-600">{employee.position}</span></p>
                        <p className="mb-2 text-sm text-gray-500">
                            Hired Date: <span className="font-medium text-gray-800">
                                {new Date(employee.hiredDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',

                                })}
                            </span>
                        </p>
                        <div className="flex items-center mb-2 text-sm text-gray-500">
                            <FaEnvelope className="mr-2 text-blue-600" />
                            <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaPhoneAlt className="mr-2 text-green-600" />
                            <span>{employee.number}</span>
                        </div>
                        <button
                            className="w-full px-4 py-2 mt-4 text-white bg-purple-500 rounded hover:bg-purple-600"
                            onClick={() => handleAddDocument(employee)}
                        >
                            Add Document
                        </button>
                    </div>

                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center font-serif bg-gray-800 bg-opacity-50">
                    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg h-[600px] overflow-auto">
                        <h3 className="mb-4 text-xl font-semibold">Add New Candidate</h3>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={candidateData.name}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 border rounded"
                            />
                           
                            <select
                                name="department"
                                value={candidateData.department}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 bg-white border rounded"
                            >
                                <option value="" disabled>Select Department</option>
                                <option value="HR">HR</option>
                                <option value="Accounts">Accounts</option>
                                <option value="Sales & Marketing">Sales & Marketing</option>
                                <option value=".Marketing/D.Marketing">O.Marketing/D.Marketing</option>
                                <option value="Research Analysts">Research Analysts</option>
                                <option value="Business Development Ex/ Manager">Business Development Ex/ Manager</option>
                            </select>
                            <input
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={candidateData.position}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            
                            <p className='font-bold'>Joining Date-</p>
                            <input
                                type="date"
                                name="hiredDate"
                                value={candidateData.hiredDate}
                                onChange={handleChange}
                                className="w-full p-2 mt-2 mb-4 border rounded"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Add Email"
                                value={candidateData.email}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <input
                                type="text"
                                name="number"
                                placeholder="Phone Number"
                                value={candidateData.number}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 border rounded"
                            />
                          
                             <div className="flex items-center">
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    value={candidateData.password}
                                    readOnly
                                    className="w-[270px] p-2 mb-4 border rounded"
                                />
                                <button
                                    type="button"
                                    onClick={generatePassword}
                                    className="px-4 py-2 ml-2 text-sm text-white bg-blue-500 rounded mt-[-10px]"
                                >
                                    Generate Password
                                </button>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-white bg-gray-400 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 text-white bg-green-500 rounded"
                                >
                                    Add Candidate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Hr_AddEMP;
