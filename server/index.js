const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, '../data/books.json');
const USERS_FILE = path.join(__dirname, '../data/users.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const JWT_SECRET = 'your-secret-key-change-in-production';

// Ensure uploads dir exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Serve uploaded files statically so images can be displayed
app.use('/uploads', express.static(UPLOADS_DIR));

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

const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
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

const writeUsers = (data) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing file:", err);
    }
};

// --- AUTH ROUTES ---

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

    const users = readUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

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

// GET /api/books/:id/content - Read book content
app.get('/api/books/:id/content', (req, res) => {
    const books = readData();
    const book = books.find(b => b.id === req.params.id);
    if (book && book.filePath) {
        const fullPath = path.join(UPLOADS_DIR, book.filePath);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            res.json({ content });
        } else {
            res.status(404).json({ message: 'File not found on server' });
        }
    } else {
        res.status(404).json({ message: 'Book or file path not found' });
    }
});

// GET /api/books/:id/download - Download book file
app.get('/api/books/:id/download', (req, res) => {
    const books = readData();
    const book = books.find(b => b.id === req.params.id);
    if (book && book.filePath) {
        const fullPath = path.join(UPLOADS_DIR, book.filePath);
        if (fs.existsSync(fullPath)) {
            res.download(fullPath, book.title + path.extname(book.filePath));
        } else {
            res.status(404).json({ message: 'File not found on server' });
        }
    } else {
        res.status(404).json({ message: 'Book or file path not found' });
    }
});


// POST /api/books - Create new book with optional files
const uploadFields = upload.fields([{ name: 'bookFile', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]);

app.post('/api/books', uploadFields, (req, res) => {
    const { title, author, genre, publishedYear, description } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and Author are required' });
    }

    const books = readData();
    const newBook = {
        id: Date.now().toString(),
        title,
        author,
        genre: genre || 'Unknown',
        publishedYear: publishedYear || null,
        description: description || '',
        filePath: req.files && req.files['bookFile'] ? req.files['bookFile'][0].filename : null,
        coverPath: req.files && req.files['coverImage'] ? req.files['coverImage'][0].filename : null,
        bookmarks: 0
    };

    books.push(newBook);
    writeData(books);
    res.status(201).json(newBook);
});

// PUT /api/books/:id - Update book
app.put('/api/books/:id', uploadFields, (req, res) => {
    const { title, author, genre, publishedYear, description } = req.body;
    let books = readData();
    const index = books.findIndex(b => b.id === req.params.id);

    if (index !== -1) {
        const updatedBook = {
            ...books[index],
            title: title || books[index].title,
            author: author || books[index].author,
            genre: genre || books[index].genre,
            publishedYear: publishedYear || books[index].publishedYear,
            description: description || books[index].description
        };

        // Update files if provided
        if (req.files && req.files['bookFile']) {
            updatedBook.filePath = req.files['bookFile'][0].filename;
        }
        if (req.files && req.files['coverImage']) {
            updatedBook.coverPath = req.files['coverImage'][0].filename;
        }

        books[index] = updatedBook;
        writeData(books);
        res.json(books[index]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// DELETE /api/books/:id - Delete book
app.delete('/api/books/:id', (req, res) => {
    let books = readData();
    const index = books.findIndex(b => b.id === req.params.id);

    if (index !== -1) {
        const bookToDelete = books[index];
        // Optionally delete the file too
        if (bookToDelete.filePath) {
            const fullPath = path.join(UPLOADS_DIR, bookToDelete.filePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        books = books.filter(b => b.id !== req.params.id);
        writeData(books);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
