import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Appointment.css';

const Appointment = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [doctor, setDoctor] = useState('');
    const [service, setService] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/appointment', {
                date,
                time,
                name,
                doctor,
                service
            });
            console.log('Response:', response);
            const confirmationMessage = `
                <h2>Успешно закажавте</h2>
                <p><strong>Име и презиме:</strong> ${name}</p>
                <p><strong>Датум:</strong> ${date}</p>
                <p><strong>Време:</strong> ${time}</p>
                <p><strong>Доктор:</strong> ${doctor}</p>
                <p><strong>Услуга:</strong> ${service}</p>
            `;
            setConfirmation(confirmationMessage);
        } catch (error) {
            console.error('Error:', error);
            setConfirmation('Веќе е закажан тој термин, одберете друг!');
        }

        setDate('');
        setTime('');
        setName('');
        setDoctor('');
        setService('');
    };

    return (
        <div className="appointment-container">
            <div className="text-section">
                <h1>Добредојдовте во нашиот систем за закажување термини</h1>
                <p>Овде можете лесно и брзо да го резервирате вашиот термин за посета на нашата клиника. Одберете ја датумот, времето и докторот, и ние ќе се погрижиме да бидете примени во најдобрите можни услови.</p>
                <p>Пополнете ја формата на десната страна со вашите податоци и одберете ја услугата која ви е потребна. Ако имате било какви прашања или потреба од дополнителна помош, слободно контактирајте не.</p>
                <p>Ве очекуваме со нетрпение!</p>
                <div className="reviews-section">
                    <h2>Рецензии од нашите клиенти</h2>
                    <div className="review">
                        <p><strong>Мартина Јовановска:</strong> "Одлична услуга и професионален тим. Секогаш сум задоволна со посетите."</p>
                    </div>
                    <div className="review">
                        <p><strong>Никола Петров:</strong> "Клиниката е прекрасно уредена и грижата е на највисоко ниво. Ги препорачувам со целото срце!"</p>
                    </div>
                    <div className="review">
                        <p><strong>Иван Стојанов:</strong> "Прекрасно искуство! Тимот е многу пријателски настроен и професионален."</p>
                    </div>
                    {}
                    <div className="review">
                        <p><strong>Светлана Трајковска:</strong> "Професионален сервис и љубезен персонал. Услугата беше надмоќна!"</p>
                    </div>
                    <div className="review">
                        <p><strong>Александар Панов:</strong> "Внимателен третман и одлична комуникација. Препораки за секого!"</p>
                    </div>
                </div>
            </div>
            <div className="form-section">
                <h1>Закажи термин</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Име и презиме: </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="date">Одберете датум: </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <label htmlFor="time">Одберете време: </label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <label htmlFor="doctor">Одбери достапен доктор: </label>
                    <select
                        id="doctor"
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        required
                    >
                        <option value="">Одберете доктор</option>
                        <option value="Др. Ана Марија Гркова">Др. Ана Марија Гркова</option>
                        <option value="Др. Магдалена Гркова">Др. Магдалена Гркова</option>
                        <option value="Др. Даниела Марковска Гркова">Др. Даниела Марковска Гркова</option>
                    </select>
                    <label htmlFor="service">Изберете услуга: </label>
                    <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    >
                        <option value="">Изберете услуга</option>
                        <option value="Чистење на заби">Белење на заби</option>
                        <option value="Исправка на заби">Чистење на забен камен</option>
                        <option value="Вадење на заб">Вадење на заб</option>
                        <option value="Вадење на заб">Рутински канал</option>
                        <option value="Вадење на заб">Имплантологија</option>
                        <option value="Вадење на заб">Нанокомпозитни фасети</option>
                    </select>
                    <button type="submit">Закажи</button>
                </form>
                <div
                    id="confirmation"
                    dangerouslySetInnerHTML={{ __html: confirmation }}
                    style={{ marginTop: '20px' }}
                ></div>
            </div>
        </div>
    );
};

export default Appointment;
