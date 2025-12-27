import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import BookForm from './pages/BookForm';
import BookReader from './pages/BookReader';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
          <Route path="/read/:id" element={<BookReader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
