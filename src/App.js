import './App.css';
import Appbar from './components/CommonComponents/Appbar';
import Home from './pages/index'
import Team from './pages/Team';
import Employee from './pages/employee';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeviceAsset from './pages/deviceAsset';
import LaptopAsset from './pages/laptopAsset';
import LoginButton from './components/CommonComponents/login';
import PrivateRoute from './components/CommonComponents/PrivateRoute';
function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginButton></LoginButton>} />
        <Route path='/team' element={<PrivateRoute><Team/></PrivateRoute>} />
        <Route path='/employee' element={<PrivateRoute><Employee /></PrivateRoute>} />
        <Route path='/deviceasset' element={<PrivateRoute><DeviceAsset /></PrivateRoute>} />
        <Route path='/laptopasset' element={<PrivateRoute><LaptopAsset /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;