import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout, isLoggedIn } = useAuth();

    return (
        <nav className="navbar" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-color)', transition: 'background-color 0.3s ease' }}>

            {/* Left Side: Brand + Main Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>NovelOcean</Link>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <Link to="/library" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Library</Link>
                </div>
            </div>

            {/* Right Side: Theme + User Actions */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)'
                    }}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>

                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

                {isLoggedIn ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                            <FaUserCircle size={20} /> <span style={{ textTransform: 'capitalize' }}>{user?.name}</span>
                        </span>
                        <button
                            onClick={logout}
                            className="btn"
                            style={{
                                padding: '8px 16px',
                                border: '1px solid var(--danger-color)',
                                color: 'var(--danger-color)',
                                background: 'transparent',
                                fontSize: '0.9rem'
                            }}
                        >
                            Logout
                        </button>
                        <Link to="/add" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', padding: '8px 20px' }}>Add Book</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '10px', fontWeight: 500 }}>Login</Link>
                        <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white' }}>Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
