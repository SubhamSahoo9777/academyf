import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div style={{ maxWidth: "640px", margin: "auto" }}>
      <h2>Video Player</h2>
      <video
        width="100%"
        controls
        preload="metadata"
        style={{ border: "2px solid #ccc", borderRadius: "8px" }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
