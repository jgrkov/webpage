import React from 'react';
import '../styles/Ourteam.css';
import { TeamList } from '../pomosen/TeamList1';
import TeamItem from '../components/TeamItem';


const Ourteam = () => {
  return (
    <div className="team">
      <h1 className="teamTitle">Нашиот тим</h1>
      <h6 class="text-block">
      Нашиот тим е составен од врвни професионалци со долгогодишно искуство и посветеност кон здравјето на нашите пациенти. Секој од нашите доктори е специјалист во својата област и секогаш е подготвен да ви пружи највисоко ниво на медицинска нега за вашето орално здравје.
</h6>

      <div className="teamList">
        {TeamList.map((teamMember, key) => {
          return (
            <TeamItem
              key={key}
              image={teamMember.image}
              name={teamMember.name}
              role={teamMember.role}
              facebook={teamMember.facebook}
              instagram={teamMember.instagram}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Ourteam;
