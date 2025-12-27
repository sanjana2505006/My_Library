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

    const coverUrl = book.coverPath
        ? `http://localhost:3000/uploads/${book.coverPath}`
        : 'https://via.placeholder.com/300x450?text=No+Cover';

    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            color: 'white',
            overflow: 'hidden',
            backgroundColor: '#0f172a' // Fallback dark background for white text
        }}>
            {/* Dynamic blurred background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${coverUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(30px) brightness(0.4)',
                transform: 'scale(1.1)', // Prevent white edges from blur
                zIndex: -1
            }}></div>

            {/* Content Overlay */}
            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '2rem' }}>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', display: 'inline-block', textDecoration: 'none' }}>
                    &larr; Back to Library
                </Link>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(250px, 300px) 1fr',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Cover Image */}
                    <div style={{
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        aspectRatio: '2/3',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    }}>
                        <img
                            src={coverUrl}
                            alt={book.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                            {book.title}
                        </h1>
                        <h3 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', fontWeight: 400 }}>
                            by {book.author}
                        </h3>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', backdropFilter: 'blur(5px)' }}>
                                {book.genre}
                            </span>
                            {book.publishedYear && (
                                <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', backdropFilter: 'blur(5px)' }}>
                                    {book.publishedYear}
                                </span>
                            )}
                        </div>

                        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '700px', color: 'rgba(255,255,255,0.9)', marginBottom: '3rem' }}>
                            {book.description || "No description available for this novel."}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to={`/read/${book.id}`} className="btn" style={{
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                backgroundColor: 'white',
                                color: '#0f172a',
                                fontWeight: 'bold',
                                border: 'none'
                            }}>
                                <FaBookReader /> Start Reading
                            </Link>

                            {book.filePath && (
                                <a
                                    href={`http://localhost:3000/api/books/${book.id}/download`}
                                    className="btn"
                                    style={{
                                        padding: '15px 30px',
                                        fontSize: '1.1rem',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Download
                                </a>
                            )}
                        </div>

                        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                            <Link to={`/edit/${book.id}`} style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                <FaEdit /> Edit Details
                            </Link>
                            <button onClick={handleDelete} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontFamily: 'inherit' }}>
                                <FaTrash /> Delete Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
