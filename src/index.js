import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import Mainpage from './pages/Mainpage';
import Profile from './mainPageComponents/Profile';
import Donate from './mainPageComponents/Donate'
import Scholarship from './mainPageComponents/Scholarship';
import Bookmarked from './mainPageComponents/Bookmarked';
import Help from './mainPageComponents/Help';
import Settings from './mainPageComponents/Settings';
import Homepage from './mainPageComponents/Homepage';
import ChatBox from './mainPageComponents/ChatBox';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/mainpage" element={<Mainpage />}>
        <Route index element={<Homepage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="donate" element={<Donate />} />
        <Route path="scholarship" element={<Scholarship />} />
        <Route path="bookmarked" element={<Bookmarked />} />
        <Route path="chatbox" element={<ChatBox />} />
        <Route path="help" element={<Help />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </Router>
);





