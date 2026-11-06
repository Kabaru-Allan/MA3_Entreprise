const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to Free MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Error:", err));

// 2. Define Booking Schema
const bookingSchema = new mongoose.Schema({
  passengerName: String,
  phone: String,
  route: String,
  seatNumber: String,
  amount: Number,
  status: { type: String, default: 'CONFIRMED' },
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// 3. API Endpoints
app.get('/api/health', (req, res) => res.json({ status: "Ma3 Backend Running Live!" }));

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json({ success: true, count: bookings.length, bookings });
});

// 4. Bind to Dynamic Port (Crucial for Cloud Hosting)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
