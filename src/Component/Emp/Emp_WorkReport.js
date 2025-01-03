import React, { useState } from "react";
import JoditEditor from "jodit-react";

const Emp_WorkReport = () => {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newReport, setNewReport] = useState({
    date: "",
    task: "",
    manager: "",
  });

  const handleFilter = () => {
    console.log("Filter applied");
  };

  const handleClear = () => {
    console.log("Filters cleared");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setReports([...reports, newReport]);
    setNewReport({ date: "", task: "", manager: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Employee Management - Work Report
        </h1>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start Date"
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="End Date"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-500 transition"
          >
            Clear
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add New Report
          </button>
        </div>

        {/* Reports Table */}
        {reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-gray-700 uppercase text-sm font-semibold">
                  <th className="px-6 py-4 border ">Date</th>
                  <th className="px-6 py-4 border ">Task</th>
                  <th className="px-6 py-4 border ">Reporting Manager</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50`}
                  >
                    <td className="px-6 py-4 border text-center">{report.date}</td>
                    <td className="px-6 py-4 border text-center">{report.task}</td>
                    <td className="px-6 py-4 border text-center">{report.manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No reports found.</p>
        )}

        {/* Add Report Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center overflow-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[700px]">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Add Work Report
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newReport.date}
                    onChange={(e) =>
                      setNewReport({ ...newReport, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Task
                  </label>
                  <div className="border border-gray-300 rounded-lg ">
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
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Reporting Manager
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newReport.manager}
                    onChange={(e) =>
                      setNewReport({ ...newReport, manager: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emp_WorkReport;
