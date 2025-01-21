import React, { useState } from "react";
import axios from "axios";

const MediaUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("media", file); // Append the file to the form data

    setUploading(true);
    try {
      // Use your local or production backend URL
      const response = await axios.post(
        "http://localhost:5000/api/auth/upload", // Change to your local or deployed URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFileUrl(response.data.fileUrl); // Set the uploaded file URL
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg"
        onSubmit={handleUpload}
      >
        <h2 className="text-2xl font-bold text-center">Media Upload</h2>
        <input type="file" onChange={handleFileChange} />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {fileUrl && (
          <p className="text-center text-green-500">
            File uploaded:{" "}
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default MediaUpload;
