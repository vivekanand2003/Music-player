# 🎵 Music Player (React + Vite)

A modern, responsive web-based music player built with **React** and **Vite**. The app includes **user authentication (signup/login)** — users must sign in before playing songs. It integrates music APIs to stream tracks with a clean UI and essential playback controls.

---

## 🚀 Features

* 🔐 User authentication (Signup / Login required before playback)
* 🎵 Stream songs from music APIs (Audius / Jamendo)
* ▶️ Play / Pause audio
* ⏭️ Next / Previous track
* ❤️ Like songs
* 📚 Liked songs library
* 🎚️ Progress bar with seek control
* 🔊 Volume control
* 📱 Responsive design (desktop & mobile)
* ⚡ Fast performance with Vite

---

## 🛠️ Tech Stack

* **React** – UI library
* **Vite** – Frontend build tool
* **JavaScript (ES6+)**
* **CSS** – Styling

---

## 📂 Project Structure

```
Music-player-main/
│
├── public/                # Static assets
├── src/
│   ├── components/        # UI components (player, cards, layout)
│   ├── pages/             # App pages (Home, Login, Signup, LikedSongs, etc.)
│   ├── context/           # Auth & Music global state
│   ├── services/          # Music API integrations (Audius, Jamendo)
│   ├── assets/            # Images/icons
│   ├── App.jsx            # App routing & layout
│   └── main.jsx           # Entry point
│
├── package.json
├── vite.config.js
└── index.html
```

````

---

## ▶️ Run Locally

Clone the project:

```bash
git clone https://github.com/vivekanand2003/Music-player.git
cd Music-player
````

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## 🔐 Authentication & Login Storage

This app uses client-side authentication. Users must sign up or log in before accessing the music player.

Where login data is stored:

Browser localStorage (persistent login)

React AuthContext state (active session)

No external database or backend authentication service is used. User credentials are stored locally in the browser for demo purposes only.

Auth Flow:
Signup/Login → Save user in localStorage → Load into AuthContext → Allow player access

## 🌐 Deployment
* Netlify - https://rccmusic.netlify.app/

---

## 📸 Screenshots

<img width="1366" height="768" alt="Screenshot (176)" src="https://github.com/user-attachments/assets/e345b8ff-f7f3-44f4-8b6d-d94e7bf044cc" />
<img width="1366" height="768" alt="Screenshot (177)" src="https://github.com/user-attachments/assets/c3be65e2-753c-4fb8-833c-a2329b3f24cb" />
<img width="1366" height="768" alt="Screenshot (178)" src="https://github.com/user-attachments/assets/5fa288ae-b234-42cb-845f-1363c13b8f46" />
<img width="1366" height="768" alt="Screenshot (179)" src="https://github.com/user-attachments/assets/272df0f5-2203-41f6-ac32-40847cad7a35" />


---

## ✨ Future Improvements

* Playlist support
* Shuffle & repeat modes
* Dark / light theme
* Online streaming support

---

## 👥 Team Contributions

- Viveka Nand Kumar  – Frontend
- Shantanu Acharya  - Player Logic & Support 
- Shreya Sen        – Authentication  
- Pankaj Kumar      – Music API Integration  
- Usha Das          – UI/UX & Styling  
- Subhajit Bera     – Documentation 
