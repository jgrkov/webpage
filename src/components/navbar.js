import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../sliki/Screenshot 2024-04-22 151442-modified (5).png';
import "../styles/Navbar.css";
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '123') {
      window.location.href = '/adminpanel';
    } else {
      setError('Невалидна лозинка');
    }
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={logo} alt="Logo" />
        <div className="rabotnovreme">
          {}
        </div>
        <div className="hiddenLinks">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Почетна</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>За нас</Link>
          <Link to="/ourteam" className={location.pathname === '/ourteam' ? 'active' : ''}>Нашиот тим</Link>
          <Link to="/uslugi" className={location.pathname === '/uslugi' ? 'active' : ''}>Услуги</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Контакт</Link>
          <Link to="/appointment" className={location.pathname === '/appointment' ? 'active' : ''}>Закажи</Link>
          <div className="adminLink">
            <button onClick={() => setShowPasswordForm(!showPasswordForm)}>Админ Панел</button>
            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} className="passwordForm">
                <input
                  type="password"
                  placeholder="Внесете лозинка"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Влези</button>
                {error && <p className="error">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Почетна</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>За нас</Link>
        <Link to="/ourteam" className={location.pathname === '/ourteam' ? 'active' : ''}>Нашиот тим</Link>
        <Link to="/uslugi" className={location.pathname === '/uslugi' ? 'active' : ''}>Услуги</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Контакт</Link>
        <Link to="/appointment" className={location.pathname === '/appointment' ? 'active' : ''}>Закажи</Link>
        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Админ Панел</Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
