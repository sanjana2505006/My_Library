import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBookById, updateBook } from '../services/api';

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        publishedYear: '',
        description: ''
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (isEditing) {
            loadBook();
        }
    }, [id]);

    const loadBook = async () => {
        try {
            const book = await getBookById(id);
            setFormData({
                title: book.title,
                author: book.author,
                genre: book.genre,
                publishedYear: book.publishedYear || '',
                description: book.description || ''
            });
        } catch (error) {
            console.error("Failed to load book", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads
        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('genre', formData.genre);
        data.append('publishedYear', formData.publishedYear);
        data.append('description', formData.description);

        if (file) {
            data.append('bookFile', file);
        }

        try {
            if (isEditing) {
                await updateBook(id, data);
            } else {
                await createBook(data);
            }
            navigate('/');
        } catch (error) {
            console.error("Failed to save book", error);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--text-secondary)',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-primary)',
        marginTop: '8px',
        marginBottom: '16px'
    };

    const labelStyle = {
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '2rem' }}>{isEditing ? 'Edit Book' : 'Add New Novel'}</h2>
            <form onSubmit={handleSubmit} className="card" encType="multipart/form-data">
                <div>
                    <label style={labelStyle}>Title *</label>
                    <input
                        type="text" name="title" required
                        value={formData.title} onChange={handleChange}
                        style={inputStyle}
                        placeholder="e.g. The Great Gatsby"
                    />
                </div>

                <div>
                    <label style={labelStyle}>Author *</label>
                    <input
                        type="text" name="author" required
                        value={formData.author} onChange={handleChange}
                        style={inputStyle}
                        placeholder="e.g. F. Scott Fitzgerald"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Genre</label>
                        <input
                            type="text" name="genre"
                            value={formData.genre} onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g. Fiction"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Published Year</label>
                        <input
                            type="number" name="publishedYear"
                            value={formData.publishedYear} onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g. 1925"
                        />
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Description / Synopsis</label>
                    <textarea
                        name="description"
                        value={formData.description} onChange={handleChange}
                        style={{ ...inputStyle, minHeight: '100px' }}
                        placeholder="Short summary of the novel..."
                    ></textarea>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Upload Book File (.txt recommended)</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ ...inputStyle, padding: '8px' }}
                        accept=".txt,.md"
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        {isEditing ? 'Update Novel' : 'Add to Library'}
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="btn" style={{ backgroundColor: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-primary)' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
