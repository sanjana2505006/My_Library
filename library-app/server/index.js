const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, '../data/books.json');

app.use(cors());
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Library API is running');
});

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading file:", err);
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing file:", err);
    }
};

// GET /api/books - List all books
app.get('/api/books', (req, res) => {
    const books = readData();
    res.json(books);
});

// GET /api/books/:id - Get specific book
app.get('/api/books/:id', (req, res) => {
    const books = readData();
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// POST /api/books - Create new book
app.post('/api/books', (req, res) => {
    const { title, author, genre, publishedYear, description } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and Author are required' });
    }

    const books = readData();
    const newBook = {
        id: Date.now().toString(), // Simple ID generation
        title,
        author,
        genre: genre || 'Unknown',
        publishedYear: publishedYear || null,
        description: description || ''
    };

    books.push(newBook);
    writeData(books);
    res.status(201).json(newBook);
});

// PUT /api/books/:id - Update book
app.put('/api/books/:id', (req, res) => {
    const { title, author, genre, publishedYear, description } = req.body;
    let books = readData();
    const index = books.findIndex(b => b.id === req.params.id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title: title || books[index].title,
            author: author || books[index].author,
            genre: genre || books[index].genre,
            publishedYear: publishedYear || books[index].publishedYear,
            description: description || books[index].description
        };
        writeData(books);
        res.json(books[index]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// DELETE /api/books/:id - Delete book
app.delete('/api/books/:id', (req, res) => {
    let books = readData();
    const newBooks = books.filter(b => b.id !== req.params.id);

    if (books.length !== newBooks.length) {
        writeData(newBooks);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
