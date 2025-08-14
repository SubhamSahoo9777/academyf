import React, { useState, useEffect } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  // Fetch videos from API
  useEffect(() => {
    fetch("https://myachademy.onrender.com/api/v1/tutorial")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle video upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.file) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("video", form.file);

    try {
      const res = await fetch("https://myachademy.onrender.com/api/v1/tutorial", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Video uploaded successfully!");
        const newVideo = await res.json();
        setVideos((prev) => [...prev, newVideo]);
        setForm({ title: "", description: "", category: "", file: null });
      } else {
        alert("Failed to upload video");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  // Open video in new tab
  const openVideo = (videoUrl) => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head><title>Video Player</title></head>
        <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:black;">
          <video controls autoplay style="max-width:100%;max-height:100%;">
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
        🎥 Video Upload & Library
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{
            padding: "10px",
            height: "60px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="file"
          name="file"
          accept="video/*"
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#27ae60",
            color: "white",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#219150")}
          onMouseOut={(e) => (e.target.style.background = "#27ae60")}
        >
          Upload Video
        </button>
      </form>

      {/* Video List */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ textAlign: "center", color: "#34495e" }}>📂 Video Library</h2>
        {videos.length === 0 ? (
          <p style={{ textAlign: "center" }}>No videos available</p>
        ) : (
          <div
            style={{
              display: "flex",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              padding: "20px",
            }}
          >
            {videos.map((video, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  width:"30%"
                }}
                onClick={() =>
                  openVideo(`https://myachademy.onrender.com/${video.videoUrl}`)
                }
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <video
                  src={`https://myachademy.onrender.com/${video.videoUrl}`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                  muted
                />
                <h3 style={{ margin: "5px 0", color: "#2c3e50" }}>
                  {video.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#7f8c8d" }}>
                  {video.description}
                </p>
                <span
                  style={{
                    fontSize: "12px",
                    background: "#ecf0f1",
                    padding: "4px 8px",
                    borderRadius: "5px",
                    color: "#34495e",
                  }}
                >
                  {video.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
