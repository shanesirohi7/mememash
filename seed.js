const mongoose = require('mongoose');
const Meme = require('./models/meme');

mongoose.connect('mongodb+srv://sushensirohi2:sushensirohi2@cluster0.nilpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const memes = [
  { videoUrl: 'memes/meme1.mp4' },
  { videoUrl: 'memes/meme2.mp4' },
  { videoUrl: 'memes/meme3.mp4' },
  { videoUrl: 'memes/meme4.mp4' }
];

Meme.insertMany(memes)
  .then(() => {
    console.log('Meme data seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding meme data:', err);
    mongoose.connection.close();
  });
