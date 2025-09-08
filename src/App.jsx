import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SongDetail from './pages/SongDetail';
import LikedSongs from './pages/LikedSongs';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
            <Header />
          <div className="app">
          
            <main className="main-content">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/song/:id" element={<SongDetail />} />
                  <Route path="/liked" element={<LikedSongs />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </main>
            <AudioPlayer />
            <Footer />
          </div>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;