const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/contactDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Backend серверот работи!');
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Сите полиња се задолжителни' });
  }

  try {
    const contactData = new Contact({ name, email, message });
    await contactData.save();
    res.status(200).json({ message: 'Формата беше успешно пратена' });
  } catch (err) {
    res.status(500).json({ error: 'Грешка при зачувување на податоците' });
  }
});

const appointmentSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  doctor: String,
  service: String,
  timestamp: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

app.post('/api/appointment', async (req, res) => {
  const { name, date, time, doctor, service } = req.body;

  if (!name || !date || !time || !doctor || !service) {
    return res.status(400).json({ error: 'Сите полиња се задолжителни' });
  }

  try {
    const appointmentTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');

    const conflictingAppointments = await Appointment.find({
      doctor,
      date,
      time: {
        $gte: appointmentTime.clone().subtract(30, 'minutes').format('HH:mm'),
        $lt: appointmentTime.clone().add(60, 'minutes').format('HH:mm')
      }
    });

    if (conflictingAppointments.length > 0) {
      return res.status(409).json({ error: 'Овој термин е веќе зафатен' });
    }

    const appointmentData = new Appointment({ name, date, time, doctor, service });
    await appointmentData.save();
    res.status(200).json({ message: 'Терминот е успешно резервиран' });
  } catch (err) {
    res.status(500).json({ error: 'Грешка при зачувување на податоците' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Грешка при учитување на контактите' });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Грешка при учитување на термини' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
