const Book = require('../models/Book');
const fs = require('fs');
const sharp = require('sharp');

exports.createBook = async (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const filename = `image_${Date.now()}.webp`;

    await sharp(req.file.buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(`images/${filename}`);

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${filename}`
    });

    await book.save();

    res.status(201).json({ message: 'Livre enregistré !' });

  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifyBook = async (req, res, next) => {
  try {
    let bookObject;

    if (req.file) {
      const filename = `image_${Date.now()}.webp`;

      await sharp(req.file.buffer)
        .resize({ width: 800 })
        .webp({ quality: 80 })
        .toFile(`images/${filename}`);

      bookObject = {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${filename}`
      };
    } else {
      bookObject = { ...req.body };
    }

    delete bookObject._userId;

    const book = await Book.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    if (book.userId.toString() !== req.auth.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    if (req.file) {
      const oldFilename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${oldFilename}`, () => {});
    }

    await Book.updateOne(
      { _id: req.params.id },
      { ...bookObject, _id: req.params.id }
    );

    res.status(200).json({ message: 'Livre modifié !' });

  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: 'Non autorisé' });
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: 'Livre supprimé !' });
            })
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};