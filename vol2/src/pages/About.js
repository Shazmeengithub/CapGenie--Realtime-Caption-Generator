import React from "react";
import "../style/About.css";

export const About = () => {
  return (
    <div className="p-4">
      <h1 className="about-title">About</h1>
      <p className="about-para">
        We are working on a real-time audio captioning system that listens to
        audio and generates captions instantly. The goal is to create something
        that provides live subtitles or transcriptions, which could be
        beneficial for people who are hearing impaired or for real-time content
        analysis.
        <br /> Initially, we were using DeepSpeech, a speech-to-text engine, but
        now we’re looking to replace it with a similar package. We’re
        considering alternatives like Whisper from OpenAI or Wav2Vec2 from
        Facebook AI, which also convert spoken language into text. The main
        challenge in our project is making it real-time.
        <br /> Our system needs to generate captions as the audio is playing,
        with no noticeable delay.This requires an efficient setup that can
        process the audio stream and convert it into text on the fly. For the
        web interface, we’re building a platform where users can upload audio or
        video files.
        <br /> The captions are displayed on the screen, synced with the media
        content. We’ve set it up so that captions only appear after the video
        starts playing, and they are tied to the video source to ensure
        everything stays in sync. This way, captions don’t show up too early or
        go out of sync with the video
      </p>
    </div>
  );
};
