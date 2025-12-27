import axios from 'axios';

const API_URL = 'http://localhost:3000/api/books';

export const getBooks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getBookById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Modified: Accepts FormData or JSON. If FormData, header is set automatically by Axios usually, or we can force it.
export const createBook = async (bookData) => {
    const response = await axios.post(API_URL, bookData);
    return response.data;
};

export const updateBook = async (id, bookData) => {
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
};

export const deleteBook = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const getBookContent = async (id) => {
    const response = await axios.get(`${API_URL}/${id}/content`);
    return response.data;
};
