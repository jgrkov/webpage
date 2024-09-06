import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const TeamItem = ({ image, name, role, facebook, instagram }) => {
  return (
    <div className="teamItem">
      <img src={image} alt={name} className="teamImage" />
      <h2>{name}</h2>
      <p>{role}</p>
      <div className="socialLinks">
        {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>}
        {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
      </div>
    </div>
  );
}

export default TeamItem;
