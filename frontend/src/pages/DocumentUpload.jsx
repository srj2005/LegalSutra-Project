import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [encryptPassword, setEncryptPassword] = useState("");
  const [decryptPassword, setDecryptPassword] = useState("");
  const [filename, setFilename] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      event.target.value = null;
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleEncrypt = async () => {
    if (!file || !encryptPassword) {
      alert("Please select a file and enter a password.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", encryptPassword);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      alert(response.data.message);
      setFilename(response.data.filename);
    } catch (error) {
      alert("Error encrypting file.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EEDC] via-[#f9f5ef] to-white p-6">
      <div className="w-full max-w-md shadow-2xl rounded-2xl p-8 border border-[#e0d9c8] bg-transparent">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Secure File Upload
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Choose PDF File
            </label>
            <input 
              type="file" 
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5F99AE] focus:border-[#5F99AE]" 
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Set Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setEncryptPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F99AE] focus:border-[#5F99AE]"
            />
          </div>

          <button 
            onClick={handleEncrypt} 
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Encrypt & Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
