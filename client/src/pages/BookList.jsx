import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import { useSearchParams } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchParams] = useSearchParams();
    const genreFilter = searchParams.get('genre');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error("Failed to load books", error);
        }
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = genreFilter
            ? (book.genre && book.genre.toLowerCase() === genreFilter.toLowerCase())
            : true;
        return matchesSearch && matchesGenre;
    });

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {genreFilter ? `${genreFilter} Novels` : 'Library Collection'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '25px',
                        border: '1px solid var(--text-secondary)',
                        backgroundColor: 'var(--card-bg)',
                        color: 'var(--text-primary)',
                        width: '300px'
                    }}
                />
            </div>

            {filteredBooks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    <h3>No books found.</h3>
                    {genreFilter && <p>Try browsing all books or adding one.</p>}
                </div>
            ) : (
                <div className="animate-fade-in" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '2rem',
                    paddingBottom: '2rem'
                }}>
                    {filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookList;
