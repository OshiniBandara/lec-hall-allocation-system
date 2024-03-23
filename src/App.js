import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Help from './components/pages/Help';
import SignUp from './components/pages/SignUp';
import PST_TT from './components/pages/PST_TT';
import FST_TT from './components/pages/FST_TT';
import NR_TT from './components/pages/NR_TT';
import SportTT from './components/pages/Sport_TT';
import AdminLoginIn from './components/pages/AdminLoginIn';
import LecturerLoginIn from './components/pages/LecturerLoginIn';
import StudentLoginIn from './components/pages/StudentLoginIn';
import AdminSign from './components/pages/AdminSign';
import LecturerSign from './components/pages/LecturerSign';
import StudentSign from './components/pages/StudentSign';
import AdminHome from './components/pages/AdminHome';
import AddHall from './components/pages/AddHall';
import LecturerAdd from './components/pages/LecturerAdd';
import UpdateHall from './components/pages/UpdateHall';
import LecturerUpdate from './components/pages/LecturerUpdate';






function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/PST_TT" element={<PST_TT />} />
        <Route path="/FST_TT" element={<FST_TT />} />
        <Route path="/NR_TT" element={<NR_TT />} />
        <Route path="/SportTT" element={<SportTT />} />
        <Route path="/AdminLoginIn" element={<AdminLoginIn />} />
        <Route path="/LecturerLoginIn" element={<LecturerLoginIn />} />
        <Route path="/StudentLoginIn" element={<StudentLoginIn />} />
        <Route path="/AdminSign" element={<AdminSign />} />
        <Route path="/LecturerSign" element={<LecturerSign />} />
        <Route path="/StudentSign" element={<StudentSign />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AddHall" element={<AddHall />} />
        <Route path="/LecturerAdd" element={<LecturerAdd />} />
        <Route path="/UpdateHall" element={<UpdateHall />} />
        <Route path="/LecturerUpdate" element={<LecturerUpdate />} />
       
      </Routes>
    </Router>
  );
}

export default App;
