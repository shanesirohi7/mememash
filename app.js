const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sushensirohi2:sushensirohi2@cluster0.nilpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const Meme = require('./models/meme');

// Home route
app.get('/', async (req, res) => {
  res.render('homepage');
});
app.get('/vote', async (req, res) => {
  const memes = await Meme.find();
  const randomMemes = memes.sort(() => 0.5 - Math.random()).slice(0, 2);
  res.render('index', { memes: randomMemes });
});
app.post('/vote', async (req, res) => {
  const { memeId } = req.body;
  await Meme.findByIdAndUpdate(memeId, { $inc: { votes: 1 } });
  res.redirect('/vote');
});

// Leaderboard route
app.get('/leaderboard', async (req, res) => {
  const memes = await Meme.find().sort({ votes: -1 });
  res.render('leaderboard', { memes });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
