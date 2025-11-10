import { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { io } from "socket.io-client";
import "../style/Video.css";

const socket = io("http://localhost:5000");

export const Video = () => {
  const savedVideoSrc = localStorage.getItem("videoSrc");
  const savedFontSize = localStorage.getItem("font-size");
  const savedCaptions = JSON.parse(localStorage.getItem("captions")) || [];

  const [videoSrc, setVideoSrc] = useState(savedVideoSrc || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [captions, setCaptions] = useState(savedCaptions);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(savedFontSize || "16px");
  const [fontStyle, setFontStyle] = useState(
    localStorage.getItem("font-style") || "Arial"
  );
  const [backgroundOpacity, setBackgroundOpacity] = useState(
    localStorage.getItem("background-opacity") || 1
  );

  // Save video state to localStorage whenever it changes
  useEffect(() => {
    if (videoSrc) {
      localStorage.setItem("videoSrc", videoSrc);
    }
  }, [videoSrc]);

  useEffect(() => {
    if (captions.length > 0) {
      localStorage.setItem("captions", JSON.stringify(captions));
    }
  }, [captions]);

  useEffect(() => {
    if (fontSize) {
      localStorage.setItem("font-size", fontSize);
    }
  }, [fontSize]);

  useEffect(() => {
    if (backgroundOpacity) {
      localStorage.setItem("background-opacity", backgroundOpacity);
    }
  }, [backgroundOpacity]);

  // Handle video file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoSrc(URL.createObjectURL(file));
      setSelectedFile(file);
      setCaptions([]);
    } else {
      alert("Please select a valid video file.");
    }
  };

  // Handle video upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a video file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await fetch("http://localhost:5000/upload-video", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  // Listen for new captions from the server
  useEffect(() => {
    socket.on("caption", (caption) => {
      setCaptions((prevCaptions) => {
        const updatedCaptions = [...prevCaptions, caption];
        localStorage.setItem("captions", JSON.stringify(updatedCaptions));
        return updatedCaptions;
      });
    });

    return () => {
      socket.off("caption");
    };
  }, []);

  return (
    <div>
      <div>
        <button className="option">
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            id="file-input"
          />
          <label htmlFor="file-input">Choose a Video</label>
        </button>
        <button onClick={handleUpload} disabled={loading} className="option">
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
      {videoSrc && (
        <div className="video-wrapper">
          <VideoPlayer
            src={videoSrc}
            captions={captions}
            fontSize={fontSize}
            fontStyle={fontStyle}
            backgroundOpacity={backgroundOpacity}
          />
        </div>
      )}
    </div>
  );
};
