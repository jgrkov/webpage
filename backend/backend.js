const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/contactDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const appointmentSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  doctor: String,
  service: String,
  timestamp: { type: Date, default: Date.now },
  accepted: { type: Boolean, default: false },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Contact = mongoose.model('Contact', contactSchema);

app.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.send(`
      <!DOCTYPE html>
      <html lang="mk">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointments</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
          }
          table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
          tr:hover {
            background-color: #f1f1f1;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #45a049;
          }
          button.delete-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button.delete-btn:hover {
            background-color: #c0392b;
          }
          button.delete-btn:active {
            background-color: #a93226;
          }
          button.accept-btn {
            background-color: #f39c12;
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button.accept-btn:hover {
            background-color: #e67e22;
          }
          button.accept-btn:active {
            background-color: #d35400;
          }
          .accepted {
            background-color: #d4edda; 
          }
          .rejected {
            background-color: #f8d7da;
          }
        </style>
        <script>
          async function deleteAppointment(id) {
            if (confirm('Дали сте сигурни дека сакате да го избришете овој термин?')) {
              try {
                const response = await fetch(\`/api/appointments/\${id}\`, {
                  method: 'DELETE'
                });
                if (response.ok) {
                  alert('Терминот е успешно избришан');
                  window.location.reload();
                } else {
                  alert('Неуспешно бришење');
                }
              } catch (err) {
                alert('Грешка при бришењето');
              }
            }
          }

          async function acceptAppointment(id) {
            try {
              const response = await fetch(\`/api/appointments/\${id}\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accepted: true })
              });
              if (response.ok) {
                alert('Терминот е успешно прифатен');
                window.location.reload();
              } else {
                alert('Неуспешно прифаќање');
              }
            } catch (err) {
              alert('Грешка при прифаќањето');
            }
          }
        </script>
      </head>
      <body>
        <h1 style="text-align: center;">Закажани термини</h1>
        <table>
          <thead>
            <tr>
              <th>Име</th>
              <th>Датум</th>
              <th>Време</th>
              <th>Доктор</th>
              <th>Услуга</th>
              <th>Закажано</th>
              <th>Прифати</th>
              <th>Избриши</th>
            </tr>
          </thead>
          <tbody>
            ${appointments.map(appointment => `
              <tr class="${appointment.accepted ? 'accepted' : 'rejected'}">
                <td>${appointment.name}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.service}</td>
                <td>${new Date(appointment.timestamp).toLocaleString()}</td>
                <td><button class="accept-btn" onclick="acceptAppointment('${appointment._id}')">Прифати</button></td>
                <td><button class="delete-btn" onclick="deleteAppointment('${appointment._id}')">Избриши</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="text-align: center;">
          <a href="/contacts" class="button">Контакти</a>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error fetching appointments');
  }
});

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.send(`
      <!DOCTYPE html>
      <html lang="mk">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contacts</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
          }
          table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
          tr:hover {
            background-color: #f1f1f1;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #45a049;
          }
          button.delete-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button.delete-btn:hover {
            background-color: #c0392b;
          }
          button.delete-btn:active {
            background-color: #a93226;
          }
        </style>
        <script>
          async function deleteContact(id) {
            if (confirm('Дали сте сигурни дека сакате да го избришете овој контакт?')) {
              try {
                const response = await fetch(\`/api/contacts/\${id}\`, {
                  method: 'DELETE'
                });
                if (response.ok) {
                  alert('Контактот е успешно избришан');
                  window.location.reload();
                } else {
                  alert('Неуспешно бришење');
                }
              } catch (err) {
                alert('Грешка при бришењето');
              }
            }
          }
        </script>
      </head>
      <body>
        <h1 style="text-align: center;">Контакти</h1>
        <table>
          <thead>
            <tr>
              <th>Име</th>
              <th>Емаил</th>
              <th>Порака</th>
              <th>Поднесено</th>
              <th>Избриши</th>
            </tr>
          </thead>
          <tbody>
            ${contacts.map(contact => `
              <tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.message}</td>
                <td>${new Date(contact.timestamp).toLocaleString()}</td>
                <td><button class="delete-btn" onclick="deleteContact('${contact._id}')">Delete</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="text-align: center;">
          <a href="/" class="button">Назад</a>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error fetching contacts');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const contactData = new Contact({ name, email, message });
    await contactData.save();
    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { accepted: req.body.accepted }, { new: true });
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
