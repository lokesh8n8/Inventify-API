const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());


require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const cors = require('cors');
app.use(cors());

// Load routes
app.use('/challenge', require('./routes/challengeRoutes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
