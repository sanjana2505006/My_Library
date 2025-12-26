import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaPlus } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav style={{
            backgroundColor: 'var(--card-bg)',
            padding: '1rem 2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
                    <FaBookOpen />
                    <span>Local Library</span>
                </Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/" style={{ padding: '0.5rem 1rem', color: 'var(--text-primary)' }}>Home</Link>
                    <Link to="/add" className="btn btn-primary">
                        <FaPlus /> Add Book
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
