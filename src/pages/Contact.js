import React, { useState } from 'react';
import axios from 'axios';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../styles/Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/contact', { name, email, message });
      console.log('Response:', response);
      setStatus('Формата беше успешно пратена');
    } catch (error) {
      console.error('Error:', error);
      setStatus('Проблем со хостот');
    }
  };
  return (
    <div className='contact'>
      <div className='leftSide'>
        <h2>Контакт Информации</h2>
        <p><AccessTimeIcon /> Понеделник - Сабота: 08:00 - 20:00, Недела - затворено</p>
        <p><PhoneIcon /> +389 71 219 646</p>
        <p><EmailIcon /> familydentalclinic11@yahoo.com</p>
        <p><LocationOnIcon /> Pano Mudarov 9, Kavadarci</p>
        <iframe
          title="Ординација на Мапа"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.593876391968!2d21.949450416071464!3d41.436565379259246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1356a1db847a6e07%3A0x5bc5a6f9f6a86f5c!2sPano%20Mudarov%209%2C%20Kavadarci!5e0!3m2!1sen!2smk!4v1622872211685!5m2!1sen!2smk"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className='rightSide'>
        <h1>Контактирајте не</h1>
        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Име</label>
          <input 
            name="name" 
            placeholder="Внесете го вашето име" 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Е-маил</label>
          <input 
            name="email" 
            placeholder="Внесете ја вашата е-маил адреса" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="message">Порака</label>
          <textarea 
            rows="6" 
            placeholder="Внесете порака..." 
            name="message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Испрати</button>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
}

export default Contact;