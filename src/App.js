import './App.css';
import Appbar from './components/Appbar'
import Team from './pages/Team';
import Employee from './pages/employee';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import DeviceAsset from './pages/deviceAsset';
import LaptopAsset from './pages/laptopAsset';
function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/team' element={<Team />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/deviceasset' element={<DeviceAsset />} />
        <Route path='/laptopasset' element={<LaptopAsset />} />
      </Routes>
    </Router>
  );
}

export default App;