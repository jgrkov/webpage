import React from 'react';
import { MenuList } from '../pomosen/MenuList';
import MenuItem from '../components/MenuItem';
import '../styles/Uslugi.css';

function Uslugi() {
  return (
    <div className='uslugi'>
      <h1 className='naslov'>Услуги кои ги нудиме</h1>
      <p className='tekst'>Во прилог подоле, може да ги видите услугите кои ги нуди нашата ординација</p>
      <div className='menuList'>
        {MenuList.map((menuItem, key) => (
          <MenuItem
            key={key}
            image={menuItem.image}
            name={menuItem.name}
            price={menuItem.price}
            details={menuItem.details}
          />
        ))}
      </div>
    </div>
  );
}

export default Uslugi;
