import React from 'react';
import { Link } from 'react-router-dom';
import pozadina from '../sliki/slikaaa1.jpg';
import '../styles/Home.css';

function Home() {
  return (
    <div className='home' style={{ backgroundImage: `url(${pozadina})` }}>
      <div className='headerContainer'>
        <div className='textContainer'>
          <h1>Грижата за оралното здравје е грижа за општото здравје</h1>
        </div>
        <div className='buttonContainer'>
          <Link to="/appointment">
            <button id='zakazi'>Закажи сега</button>
          </Link>
          <a href="tel:+38971219646">
            <button id='call'>Јави се</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
