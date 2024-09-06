import React, { useState } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === '123') {
      setAuthenticated(true);
    } else {
      alert('Невалиден пасворд');
    }
  };

  const handleBackendRedirect = () => {
    window.location.href = 'http://localhost:5001/';
  };

  if (authenticated) {
    return (
      <div className="fullscreen-container">
        <div className="admin-panel">
          <h1>Добредојдовте</h1>
          <p>Овде можете да управувате со термини и контакти.</p>
          <button className="backend-button" onClick={handleBackendRedirect}>Отвори</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fullscreen-container">
      <div className="login-container">
        <h1>Администрациски панел</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Внесете пасворд"
          className="password-input"
        />
        <button onClick={handleLogin} className="login-button">Логирај се</button>
      </div>
    </div>
  );
};

export default AdminPanel;
