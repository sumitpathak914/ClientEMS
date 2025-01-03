import React, { useState, useEffect } from 'react';

// Example function to simulate fetching data from an API
const fetchDocuments = async () => {
  return [
    { id: 1, type: 'Salary Slip', month: 'January', year: '2025', url: 'path/to/salary-january.pdf' },
    { id: 2, type: 'Salary Slip', month: 'February', year: '2025', url: 'path/to/salary-february.pdf' },
    { id: 3, type: 'Contract', month: '', year: '', url: 'path/to/contract.pdf' },
    { id: 4, type: 'Leave Request', month: '', year: '', url: 'path/to/leave-request.pdf' },
    { id: 5, type: 'Tax Form', month: '', year: '', url: 'path/to/tax-form.pdf' },
    // Add other document types here
  ];
};

const Emp_Document = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedType, setSelectedType] = useState('All');

  // Fetch all documents on component mount
  useEffect(() => {
    const loadDocuments = async () => {
      const allDocuments = await fetchDocuments();
      setDocuments(allDocuments);
    };

    loadDocuments();
  }, []);

  // Filter documents by type
  const filterDocuments = (type) => {
    if (type === 'All') return documents;
    return documents.filter(doc => doc.type === type);
  };

  return (
    <div>
      <h2>Employee Documents</h2>

      {/* Dropdown for selecting document type */}
      <select
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
        className="mb-4 p-2 border rounded"
      >
        <option value="All">All Documents</option>
        <option value="Salary Slip">Salary Slip</option>
        <option value="Contract">Contract</option>
        <option value="Leave Request">Leave Request</option>
        <option value="Tax Form">Tax Form</option>
        {/* Add more document types here */}
      </select>

      {/* Display filtered documents */}
      <div className="documents-list">
        {filterDocuments(selectedType).length > 0 ? (
          filterDocuments(selectedType).map(doc => (
            <div key={doc.id} className="document-item mb-4">
              <h3>{doc.type} {doc.month && doc.year && `- ${doc.month} ${doc.year}`}</h3>
              <div>
                {/* View Document Link */}
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-4">
                  View Document
                </a>
                {/* Download Document Link */}
                <a
                  href={doc.url}
                  download
                  className="text-blue-500"
                >
                  Download PDF
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No documents available for this type.</p>
        )}
      </div>
    </div>
  );
};

export default Emp_Document;
