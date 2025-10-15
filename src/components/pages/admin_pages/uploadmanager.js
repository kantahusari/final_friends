import React, { useState, useEffect } from "react";
import { adminService } from "../../serviceworker/admin";
import { fileuploadService } from "../../serviceworker/fileuploadService";

export default function UploadManager() {
  const [cdata, setcdata] = useState([]);

  const [errorMessages, seterrorMessages] = useState([]);
  // -------------------------------------------
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const maxSize = 5 * 1024 * 1024; // 5MB
    for (let file of e.target.files) {
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds the 5MB size limit.`);
        return;
      }
    }
    if (e.target.files.length + files.length > 10) {
      alert("You can upload a maximum of 10 files at once.");
      return;
    }
    const selectedFiles = Array.from(e.target.files);
    setFiles(
      selectedFiles.map((file) => ({
        file,
        category: "default",
        progress: 0,
        uploaded: false,
        error: null,
      }))
    );
  };

  const handleCategoryChange = (index, newCategory) => {
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, category: newCategory } : f)));
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  const handleUpload = async (fileObj, index) => {
    if (cdata.length === 0) {
      alert("Please add categories before uploading files.");
      return;
    }
    if (fileObj.category === "default") {
      alert(`Please select a category for ${fileObj.file.name} before and click upload or upload all.`);
      return;
    }
    const formData = new FormData();
    formData.append("file", fileObj.file);
    formData.append("category", fileObj.category);
    try {
      const result = await fileuploadService.uploadFile(formData, {
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, progress: percent } : f)));
        },
      });
      if (result.success === false) {
        seterrorMessages((prev) => prev.map((f, i) => (i === index ? { ...f, error: result.message } : f)));
        console.error("Upload error:", result.message);
        return;
      }

      setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, uploaded: true, error: null } : f)));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleUploadAll = () => {
    files.forEach((f, index) => {
      if (!f.uploaded && !f.error) handleUpload(f, index);
    });
  };
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  function fetchCategories() {
    adminService.get_category().then((res) => {
      setcdata(res);
    });
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="upload_box">
        <h2>Upload Files</h2>
        {/* Single or Multiple Upload */}
        <label htmlFor="imageUpload">Select images to upload (max size 5MB each):</label>
        <br />
        <input type="file" multiple onChange={handleFileChange} style={{ marginBottom: "20px" }} />

        {files.map((f, index) => (
          <div
            className="file-item"
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              border: "1px solid #ddd",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {/* Thumbnail */}
            {f.file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(f.file)}
                alt={f.file.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  marginRight: "10px",
                  borderRadius: "6px",
                }}
              />
            ) : (
              <span style={{ marginRight: "10px" }}>📄</span>
            )}

            {/* File info */}
            <span style={{ flex: 1 }}>
              {f.file.name} ({(f.file.size / 1024).toFixed(1)} KB)
            </span>

            {/* Category dropdown */}
            <select value={f.category} onChange={(e) => handleCategoryChange(index, e.target.value)} style={{ marginRight: "10px" }}>
              <option value={cdata.length === 0 ? "No Categories" : "Uncategorized"}>{cdata.length === 0 ? "No Categories" : "Select Category"}</option>
              {cdata.map((c) => (
                <option key={c.id} value={c.category}>
                  {c.category}
                </option>
              ))}
            </select>

            {/* Remove button */}
            <button
              onClick={() => handleRemove(index)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ❌ Remove
            </button>
            {/* Progress bar */}
            <div style={{ width: "120px", marginRight: "10px" }}>
              <div style={{ height: "8px", background: "#eee", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${f.progress}%`, height: "100%", background: f.uploaded ? "green" : "blue", transition: "width 0.3s ease" }}></div>
              </div>
              <small>{f.progress}%</small>
              {f.error && <small style={{ color: "red" }}>Error: {f.error}</small>}
              {f.uploaded && <small style={{ color: "green" }}>Uploaded</small>}
            </div>
            {/* Upload button for this file */}
            <button
              onClick={() => handleUpload(f, index)}
              disabled={f.uploaded}
              style={{
                background: f.uploaded ? "gray" : "blue",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: f.uploaded ? "not-allowed" : "pointer",
              }}
            >
              {f.uploaded ? "✅ Done" : "⬆ Upload"}
            </button>
          </div>
        ))}

        <button
          onClick={handleUploadAll}
          style={{
            margin: "10px 0",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            background: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          Upload All
        </button>
      </div>
    </div>
  );
}
