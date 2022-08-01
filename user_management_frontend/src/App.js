import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './login/login';
import Settings from './Settings/settings';
import Welcome from './welcome/welcome';
import TwoFactAuth from './TwoFactAuth/TwoFactAuth';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/settings'} element={<Settings />} />
        <Route path={'/welcome'} element={<Welcome />} />
        <Route path={'/2fa'} element={<TwoFactAuth />} />
        <Route path={'/'} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
