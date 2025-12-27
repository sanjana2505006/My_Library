import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const coverUrl = book.coverPath
        ? `http://localhost:3000/uploads/${book.coverPath}`
        : null;

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0, overflow: 'hidden' }}>
            <div style={{
                width: '100%',
                aspectRatio: '2/3',
                backgroundColor: '#334155',
                backgroundImage: coverUrl ? `url(${coverUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '3rem',
                borderBottom: '1px solid var(--border-color)'
            }}>
                {!coverUrl && '📚'}
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{book.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>By {book.author}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)', borderRadius: '4px' }}>
                        {book.genre}
                    </span>
                    <Link to={`/book/${book.id}`} className="btn" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', border: '1px solid var(--text-secondary)' }}>
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
