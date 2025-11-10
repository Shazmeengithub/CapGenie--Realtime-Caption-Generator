# 🎧 CapGenie – Real-Time Caption Generator  
### AI-Powered Accessibility for Audio & Video Content  

**Objective:** Build a **real-time captioning system** that uses **OpenAI Whisper ASR** to instantly convert speech into text, improving accessibility for users — especially individuals with hearing impairments — across education, broadcasting, and media.

---

## 📌 Table of Contents
- <a href="#overview">Overview</a>  
- <a href="#features">Features</a>  
- <a href="#how-it-works">How It Works</a>  
- <a href="#tech-stack">Tech Stack</a>  
- <a href="#usage">Usage</a>  
- <a href="#why-capgenie">Why CapGenie</a>  
- <a href="#future-plans">Future Plans</a>  
- <a href="#requirements">Requirements</a>  
- <a href="#acknowledgements">Acknowledgements</a>  

---

<h2 id="overview">🔍 Overview</h2>

**CapGenie** is an AI-powered application designed to generate **real-time captions** from both **video and audio** sources using the **OpenAI Whisper** speech recognition model.  

It’s built to make online and offline media content more **inclusive**, **accurate**, and **accessible**, allowing users to follow along easily — even in noisy environments or with varying accents.  

The system features:  
- A **React-based frontend** for uploading and viewing content.  
- A **Flask backend** for real-time audio processing and transcription.  
- Integration with **Flask-SocketIO** for live caption streaming.  

---

<h2 id="features">🚀 Features</h2>

| Feature | Description |
|----------|-------------|
| 🗣 **Real-Time Transcription** | Converts speech to text instantly using Whisper ASR |
| 🎨 **Customizable Captions** | Adjust font size, color, style, and background for readability |
| ⚙️ **User-Friendly Interface** | Built with React for simple uploads and real-time display |
| 🎯 **High Accuracy** | Handles various accents and moderate background noise efficiently |
| 🌐 **Multilingual Ready** | Future support for multiple languages and domains |
| 📡 **Live Streaming (Coming Soon)** | Real-time captioning for webinars, lectures, and events |

---

<h2 id="how-it-works">🧠 How It Works</h2>

<p align="center">
  <img width="648" height="325" alt="CapGenie Architecture" src="https://github.com/user-attachments/assets/2f027ef0-59d0-401e-86f7-3305b26482bc" />
</p>

1. **Upload a Video or Audio File**  
   Users upload video/audio content via the React interface.  

2. **Audio Extraction**  
   Using **FFmpeg**, CapGenie extracts the audio from the video and converts it to a mono `.wav` file sampled at **16kHz**.  

3. **Audio Chunking**  
   The backend divides the audio into small chunks for streaming to the Whisper model.  

4. **Speech Recognition**  
   **OpenAI Whisper** performs real-time transcription, converting speech into text with minimal latency.  

5. **Live Caption Streaming**  
   Captions are displayed continuously in the frontend via **SocketIO**, providing smooth real-time updates.  

---

<h2 id="tech-stack">💻 Tech Stack</h2>

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js |
| **Backend** | Flask + Flask-SocketIO |
| **Speech-to-Text Model** | OpenAI Whisper |
| **Audio Processing** | FFmpeg, Librosa |
| **Languages** | Python, JavaScript |
| **Version Control** | Git, GitHub |

---

<h2 id="usage">🧩 Usage</h2>

CapGenie can be used in various real-world scenarios:  

- 🎓 **Education:** Real-time captioning for lectures and webinars.  
- 🎙 **Broadcasting:** Live caption support during TV shows or podcasts.  
- 🧏 **Accessibility:** Helps individuals with hearing impairments follow media content.  
- 🏛 **Public Events:** Provides captions for conferences or government meetings.  
- 🎬 **Media Post-Production:** Adds captions to pre-recorded videos quickly.  

**Workflow Summary:**  
Upload → Audio Extracted → Whisper Transcribes → Captions Stream Live on UI  

<p align="center">
  <img width="506" height="265" alt="CapGenie Workflow 1" src="https://github.com/user-attachments/assets/c464ea4f-712c-433d-821d-529045ef4303" />
</p>

<p align="center">
  <img width="503" height="268" alt="CapGenie Workflow 2" src="https://github.com/user-attachments/assets/a3f27cf4-d737-41c3-b6f7-4fa10fb63f22" />
</p>

---

<h2 id="why-capgenie">💡 Why CapGenie</h2>

CapGenie isn’t just another transcription tool — it’s built for **inclusivity and accessibility**.  

| Benefit | Description |
|----------|-------------|
| 🦻 **Accessibility Focused** | Designed to make media understandable for everyone |
| 🧠 **AI-Powered Accuracy** | Whisper ensures precision even in noisy or fast speech environments |
| 💰 **Cost-Effective** | Open-source implementation with minimal infrastructure costs |
| ⚡ **Low Latency** | Chunk-based streaming ensures near-instant captioning |
| 🖥 **Customizable UI** | Captions can be visually tailored for better readability |

---

<h2 id="future-plans">🔮 Future Plans</h2>

| Planned Feature | Description |
|-----------------|-------------|
| 🌍 **Multilingual Support** | Add captioning and translation in multiple languages |
| 🎥 **Live Streaming Integration** | Enable captions for live events and broadcasts |
| 🩺 **Domain-Specific Vocabulary** | Improve accuracy for legal, medical, and educational content |
| ☁️ **Cloud Deployment** | Host and scale for concurrent users globally |
| 🧾 **Caption Export Options** | Allow downloading captions in `.srt` or `.vtt` format |
| 📊 **Analytics Dashboard** | Monitor caption accuracy, latency, and system performance |

---

<h2 id="requirements">⚙️ Requirements</h2>

| Component | Details |
|------------|----------|
| **Python** | 3.9+ |
| **Node.js** | 16+ |
| **FFmpeg** | Installed and added to system path |
| **Whisper ASR** | Installed via `pip install openai-whisper` |
| **Libraries** | Flask, Flask-SocketIO, Librosa, React, Axios |
| **GPU (Optional)** | For faster real-time transcription |

💡 *CapGenie can run efficiently on most systems. GPU acceleration is optional but improves performance.*

---

<h2 id="acknowledgements">🙏 Acknowledgements</h2>

Thanks to the open-source community and tools that made CapGenie possible:  

- 🧠 [OpenAI Whisper](https://github.com/openai/whisper) – Automatic Speech Recognition Model  
- 🎧 [FFmpeg](https://ffmpeg.org/) – Audio extraction and conversion  
- ⚙️ [Flask](https://flask.palletsprojects.com/) – Backend framework  
- 💻 [React](https://react.dev/) – Frontend library for responsive UI  
- 🔌 [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/) – Real-time communication  

---

⭐ *If you found this project useful, give it a star on GitHub!* 🌟  
