const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/auth-demo')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send("API running...");
});

app.listen(8000, () => console.log("Server started"));

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

const auth = require('./middleware/auth');

app.get('/profile', auth, (req, res) => {
  res.json({
    message: "Welcome user",
    userId: req.user.id
  });
});