# CapGenie--Realtime-Caption-Generator
CapGenie is a real-time caption generator that extracts audio from video content and generates accurate captions using advanced ASR (Automatic Speech Recognition) models such as Whisper. Designed for accessibility and inclusivity, it enables individuals with hearing impairments, educators, broadcasters, and event organizers to make multimedia content more accessible.

**✨ Features**

🎙 Real-Time Transcription – Accurate, low-latency captions powered by Whisper ASR.

🎨 Customizable Captions – Adjust font size, color, style, and background for readability.

🖥 User-Friendly Interface – React-based design with smooth uploads and settings.

**💡 Why CapGenie?**

Inclusive – Built to support individuals with hearing impairments.

Cost-Effective – Leverages open-source ASR tools like Whisper to reduce licensing costs.

Lightweight – Runs efficiently on mid-range hardware.

Accurate – Performs well across accents and moderate background noise.

**Proposed Algorithm:**

<img width="656" height="323" alt="image" src="https://github.com/user-attachments/assets/f8837990-6a7a-4fbc-bf15-118ec78341d8" />

**Step 1: Audio Preprocessing**

Convert input audio (from video/raw) into mono.

Resample to 16kHz.

Save as .wav for Whisper compatibility.

**Step 2: Video to Audio Extraction**

Use FFmpeg to extract audio track.

Save as .wav.

Ensure Whisper’s format requirements.

**Step 3: Real-Time Streaming Transcription**

Split audio into small chunks.

Stream chunks to Whisper for transcription.

Update captions continuously with minimal latency.

**Step 4: ASR Model Setup**

Initialize Whisper ASR (openai-whisper).

Configure language & transcription mode.

Optimize with GPU acceleration if available.

**Tech Stack**

Frontend: React, Tailwind CSS

Backend: Flask, Flask-SocketIO

ASR Engine: OpenAI Whisper

Audio Tools: ffmpeg

Infrastructure: GPU support for performance (optional)
