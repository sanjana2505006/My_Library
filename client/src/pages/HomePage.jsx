import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaSearch, FaBook, FaGhost, FaMagic } from 'react-icons/fa';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGenreClick = (genre) => {
        navigate(`/library?genre=${genre}`);
    };

    const categories = [
        { name: 'Romance', icon: <FaHeart />, color: '#e11d48', desc: 'Love, passion, and emotional journeys.' },
        { name: 'Thriller', icon: <FaGhost />, color: '#7c3aed', desc: 'Suspense, mystery, and edge-of-your-seat action.' },
        { name: 'Fiction', icon: <FaBook />, color: '#2563eb', desc: 'Imaginative storytelling and compelling narratives.' },
        { name: 'Fantasy', icon: <FaMagic />, color: '#059669', desc: 'Magic, mythical creatures, and epic adventures.' },
    ];

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div className="animate-fade-in" style={{
                textAlign: 'center',
                padding: '6rem 2rem',
                background: 'var(--hero-bg)',
                borderRadius: '0 0 50px 50px',
                marginBottom: '4rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Find Your Next Adventure
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    Explore our curated collection of novels. Read online, download for later, or upload your own favorites.
                </p>
                <button onClick={() => navigate('/library')} className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '30px' }}>
                    Browse All Books
                </button>
            </div>

            {/* Genre Section */}
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Choose a Genre</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {categories.map((cat, index) => (
                        <div
                            key={cat.name}
                            onClick={() => handleGenreClick(cat.name)}
                            className={`animate-fade-in delay-${index + 1}`}
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                padding: '2rem',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = `0 10px 20px ${cat.color}30`;
                                e.currentTarget.style.borderColor = cat.color;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                color: cat.color,
                                marginBottom: '1.5rem',
                                backgroundColor: `${cat.color}20`,
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {cat.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{cat.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
