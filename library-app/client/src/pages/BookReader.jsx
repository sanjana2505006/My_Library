import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookContent, getBookById } from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';

const BookReader = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [bookData, contentData] = await Promise.all([
                getBookById(id),
                getBookContent(id)
            ]);
            setBook(bookData);
            setContent(contentData.content);
        } catch (err) {
            console.error("Error loading book:", err);
            setError("Could not load book content. Make sure a file was uploaded.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container">Loading book...</div>;

    return (
        <div style={{
            backgroundColor: '#f8fafc',
            color: '#1e293b',
            minHeight: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100
        }}>
            {/* Minimal Reader Header */}
            <div style={{
                padding: '1rem 2rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'white',
                position: 'sticky',
                top: 0
            }}>
                <Link to={`/book/${id}`} style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaArrowLeft /> Back
                </Link>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
                    {book ? book.title : 'Reader'}
                </h3>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem', fontSize: '1.2rem', lineHeight: '1.8' }}>
                {error ? (
                    <div style={{ color: 'red', textAlign: 'center' }}>
                        <p>{error}</p>
                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>This book might not have a text file attached yet.</p>
                    </div>
                ) : (
                    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif' }}>
                        {content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookReader;
