import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import { FaSearch } from 'react-icons/fa';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        }
    };

    const filteredBooks = books.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Library Catalog</h2>
                <div style={{ position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search novels..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '10px 10px 10px 36px',
                            borderRadius: '20px',
                            border: '1px solid var(--text-secondary)',
                            backgroundColor: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            width: '300px'
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
                    <p>No books found. Why not add one?</p>
                </div>
            )}
        </div>
    );
};

export default BookList;
