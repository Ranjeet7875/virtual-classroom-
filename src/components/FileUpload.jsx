import React, { useState } from 'react';

export default function FileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...fileArray]);
  };

  return (
    <div className="file-upload-container">
      <h3>Upload Documents</h3>
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        accept="image/*,application/pdf,.docx,.pptx" 
      />
      
      <div className="uploaded-files">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="file-item">
            <p>{file.name}</p>
            {file.name.endsWith('.pdf') ? (
              <iframe
                src={file.url}
                width="100%"
                height="300px"
                title={file.name}
              />
            ) : (
              <img src={file.url} alt={file.name} width="100%" height="300px" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
