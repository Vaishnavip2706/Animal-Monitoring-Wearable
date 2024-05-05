const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/livestock_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const LivestockSchema = new mongoose.Schema({
  animalId: { type: String, required: true },
  temperature: { type: Number, required: true },
  pulseRate: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});
const Livestock = mongoose.model('Livestock', LivestockSchema);


app.post('/api/livestock', async (req, res) => {
  try {
    const { animalId, temperature, pulseRate, heartRate } = req.body;
    const livestock = new Livestock({
      animalId,
      temperature,
      pulseRate,
      heartRate
    });
    await livestock.save();
    res.status(201).json({ message: 'Livestock data received successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
