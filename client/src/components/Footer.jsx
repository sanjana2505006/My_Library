import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#0f172a',
            color: '#94a3b8',
            padding: '4rem 0 2rem',
            marginTop: 'auto',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>


                <div>
                    <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>📚</span> NovelOcean
                    </h3>
                    <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Discover your next great adventure. A curated collection of novels for every reader.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#" style={{ color: 'white', fontSize: '1.2rem', transition: 'color 0.2s' }}><FaTwitter /></a>
                        <a href="#" style={{ color: 'white', fontSize: '1.2rem', transition: 'color 0.2s' }}><FaGithub /></a>
                        <a href="#" style={{ color: 'white', fontSize: '1.2rem', transition: 'color 0.2s' }}><FaLinkedin /></a>
                    </div>
                </div>


                <div>
                    <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Explore</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <Link to="/" style={{ transition: 'color 0.2s' }}>Home</Link>
                        <Link to="/library" style={{ transition: 'color 0.2s' }}>Library</Link>
                        <Link to="/library?genre=Romance" style={{ transition: 'color 0.2s' }}>Romance</Link>
                        <Link to="/library?genre=Thriller" style={{ transition: 'color 0.2s' }}>Thriller</Link>
                    </div>
                </div>


                <div>
                    <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Company</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <Link to="#" style={{ transition: 'color 0.2s' }}>About Us</Link>
                        <Link to="#" style={{ transition: 'color 0.2s' }}>Contact</Link>
                        <Link to="#" style={{ transition: 'color 0.2s' }}>Privacy Policy</Link>
                        <Link to="#" style={{ transition: 'color 0.2s' }}>Terms of Service</Link>
                    </div>
                </div>
            </div>


            <div className="container" style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '2rem',
                textAlign: 'center',
                fontSize: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                <p>&copy; {new Date().getFullYear()} NovelNook. All rights reserved.</p>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    Made with <FaHeart style={{ color: '#ef4444' }} /> for book lovers.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
