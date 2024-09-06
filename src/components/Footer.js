import React from 'react';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import LocationOn from '@mui/icons-material/LocationOn';
import Phone from '@mui/icons-material/Phone';
import Mail from '@mui/icons-material/Mail';
import '../styles/Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="quickLinks">
          <h3>Линкови:</h3>
          <a href="/" className="link">Почетна</a>
          <a href="/about" className="link">За нас</a>
          <a href="/uslugi" className="link">Услуги</a>
          <a href="/contact" className="link">Контакт</a>
        </div>
        <div className="socialMedia">
          <div className="icons">
            <a href="https://www.instagram.com/familydentalclinic_implant/" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a href="https://www.facebook.com/daniela.dent.mk" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
          </div>
          <p>&copy; 2024 Family Dental Clinic.</p>
    
        </div>
        <div className="contactInfo">
          <h3>Информации</h3>
          <p><LocationOn />Pano Mudarov 9, Kavadarci</p>
          <p><Phone />+389 71 219 646</p>
          <p><Mail />familydentalclinic11@yahoo.com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
