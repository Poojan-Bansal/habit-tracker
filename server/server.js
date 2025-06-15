const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load MONGO_URI, PORT, JWT_SECRET

const app = express();

// ✅ Add CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Mount routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const habitRoutes = require('./routes/habitRoutes');
app.use('/api/habits', habitRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 Habit Buddy backend is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
