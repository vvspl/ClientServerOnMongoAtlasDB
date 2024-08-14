const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Local connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/authapp', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// Atlas MongoDB online connection
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.r7ukknz.mongodb.net/first?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import Routes
const routes = require('./routes/routes');

// Use Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
