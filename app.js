const express = require('express');

const app = express();

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.log('Erreur MongoDB :', err));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/books', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Livre ajouté !'
  });
});

app.get('/api/books', (req, res, next) => {
  const books = [
    {
      userId: 'user123',
      title: 'Le Seigneur des Anneaux',
      author: 'J.R.R. Tolkien',
      imageUrl: 'https://example.com/lotr.jpg',
      year: 1954,
      genre: 'Fantasy',
      ratings: [
        { userId: 'user456', grade: 5 },
        { userId: 'user789', grade: 4 }
      ],
      averageRating: 4.5
    },
    {
      userId: 'user456',
      title: '1984',
      author: 'George Orwell',
      imageUrl: 'https://example.com/1984.jpg',
      year: 1949,
      genre: 'Dystopie',
      ratings: [
        { userId: 'user123', grade: 5 }
      ],
      averageRating: 5
    }
  ];

  res.status(200).json(books);
});

module.exports = app;