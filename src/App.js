
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; 
import Footer from './components/Footer'; 
import Home from './pages/Home'; 
import Uslugi from './pages/Uslugi'; 
import About from './pages/About'; 
import Contact from './pages/Contact'; 
import Appointment from './pages/Appointment';
import Ourteam from './pages/Ourteam'; 
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uslugi" element={<Uslugi />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
