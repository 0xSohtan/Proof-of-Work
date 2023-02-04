import React, { useState, useRef } from "react";

const src = "/assets/audio/Lofi.mp3";

const AudioPlayer = ({ src, nextAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    audioRef.current.currentTime = audioRef.current.currentTime + 10;
  };

  const handleBackward = () => {
    audioRef.current.currentTime = audioRef.current.currentTime - 10;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (nextAudio) {
      setSrc(nextAudio);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
      />
      <button onClick={handleBackward}>Backward</button>
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={handleForward}>Forward</button>
    </div>
  );
};

export default AudioPlayer;
