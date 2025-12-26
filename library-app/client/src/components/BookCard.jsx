import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{book.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>By {book.author}</p>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)', borderRadius: '4px' }}>
                    {book.genre}
                </span>
                <Link to={`/book/${book.id}`} className="btn" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', border: '1px solid var(--text-secondary)' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default BookCard;
