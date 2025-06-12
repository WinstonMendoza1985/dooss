const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const MONGO_URI = "mongodb+srv://winstonmendoza1985:ujcnIg2YLp6iycoc@cluster0.pmyo8cl.mongodb.net/dental_clinic";
const PORT_URI = 3007;

// Set up rate limiter: maximum of 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const app = express();
app.use(cors());
app.use(express.json());

// Apply the rate limiter to all requests
app.use(limiter);

//mongoose.connect(process.env.MONGO_URI,
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/users');
const dentistRoutes = require('./routes/dentists');
const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

//const PORT = process.env.PORT || 5000;
const PORT = PORT_URI || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
