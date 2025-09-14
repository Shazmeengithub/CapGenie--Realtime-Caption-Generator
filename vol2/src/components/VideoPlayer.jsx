import { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import "../style/Video.css";

const VideoPlayer = ({
  src,
  captions,
  fontSize,
  fontStyle,
  backgroundOpacity,
}) => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const [currentCaption, setCurrentCaption] = useState("");
  const [isCaptionUpdated, setIsCaptionUpdated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [useNativeControls, setUseNativeControls] = useState(
    window.innerWidth < 767
  );

  const [isPlayButtonHighlighted, setIsPlayButtonHighlighted] = useState(false);
  const [highlightTriggered, setHighlightTriggered] = useState(false);

  useEffect(() => {
    setHighlightTriggered(false);
    setIsPlayButtonHighlighted(false);
  }, [src]);

  useEffect(() => {
    if (captions && captions.length > 0 && !highlightTriggered) {
      setIsPlayButtonHighlighted(true);
      setHighlightTriggered(true);
      setTimeout(() => {
        setIsPlayButtonHighlighted(false);
      }, 1000);
    }
  }, [captions, highlightTriggered]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration || 1;

        setProgress((currentTime / duration) * 100);

        const newCaption = captions.find(
          (caption) =>
            currentTime >= caption.start_time && currentTime <= caption.end_time
        );

        if (newCaption?.text !== currentCaption) {
          setCurrentCaption(newCaption ? newCaption.text : "");
          setIsCaptionUpdated(true);

          setTimeout(() => setIsCaptionUpdated(false), 1000);
        }
      }
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
      setProgress(0);
      stopProgressLoop();
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("ended", handleVideoEnd);
      stopProgressLoop();
    };
  }, [captions, currentCaption]);

  useEffect(() => {
    const handleFullScreenChange = () =>
      setIsFullScreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const startProgressLoop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(updateProgress, 1000);
  };

  const stopProgressLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        stopProgressLoop();
      } else {
        videoRef.current.play();
        startProgressLoop();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      stopProgressLoop();
    }
  };

  const handleSeek = (event) => {
    if (videoRef.current) {
      const seekTo = (event.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTo;
      setProgress(event.target.value);
    }
  };

  const toggleMute = () => {
    const isCurrentlyMuted = videoRef.current.volume === 0;
    videoRef.current.volume = isCurrentlyMuted ? volume : 0;
    setIsMuted(!isCurrentlyMuted);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      videoRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullScreen(!isFullScreen);
  };

  const renderCustomControls = () => (
    <div className="controls">
      <button
        onClick={togglePlayPause}
        className={isPlayButtonHighlighted ? "highlight-glow" : ""}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={stopVideo}>
        <FaStop />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
      />
      <button onClick={toggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={handleVolumeChange}
      />
      <button onClick={toggleFullScreen}>
        {isFullScreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={src}
        className="video-player"
        controls={useNativeControls}
        onClick={togglePlayPause}
      />
      {!useNativeControls && renderCustomControls()}
      {currentCaption && (
        <div
          className="captions"
          style={{
            fontFamily: fontStyle,
            fontSize,
            backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
          }}
        >
          {currentCaption}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
