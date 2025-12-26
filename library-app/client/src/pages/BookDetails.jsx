import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteBook, getBookById } from '../services/api';
import { FaTrash, FaEdit, FaBookReader } from 'react-icons/fa';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        loadBook();
    }, [id]);

    const loadBook = async () => {
        try {
            const data = await getBookById(id);
            setBook(data);
        } catch (error) {
            console.error("Failed to load book details", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await deleteBook(id);
            navigate('/');
        }
    };

    if (!book) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <Link to="/" style={{ color: 'var(--text-secondary)', marginBottom: '1rem', display: 'inline-block' }}>&larr; Back to Library</Link>

            <div className="card" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{book.title}</h1>
                    <h3 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}>{book.author}</h3>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                            {book.genre}
                        </span>
                        {book.publishedYear && (
                            <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                                Year: {book.publishedYear}
                            </span>
                        )}
                    </div>

                    <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        {book.description || "No description available for this novel."}
                    </p>

                    <div style={{ marginTop: '3rem' }}>
                        <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
                            <FaBookReader /> Start Reading
                        </button>
                    </div>
                </div>

                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link to={`/edit/${book.id}`} className="btn" style={{ backgroundColor: '#e2e8f0', color: '#1e293b', justifyContent: 'center' }}>
                        <FaEdit /> Edit Details
                    </Link>
                    <button onClick={handleDelete} className="btn btn-danger" style={{ justifyContent: 'center' }}>
                        <FaTrash /> Delete Book
                    </button>

                    <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Stats</h4>
                        <p style={{ fontSize: '0.9rem' }}>Reads: 0</p>
                        <p style={{ fontSize: '0.9rem' }}>Bookmarks: 0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
