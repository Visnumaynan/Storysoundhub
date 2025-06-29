import React, { useState } from 'react';
import './ebooks.css';

const Ebooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setBooks([]);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=20`);
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error('Search error:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const showBookDetails = async (book) => {
    setSelectedBook(book);
    setModalOpen(true);
    setDetailsLoading(true);

    try {
      let description = 'No description available.';
      if (book.key) {
        try {
          const workResponse = await fetch(`https://openlibrary.org${book.key}.json`);
          const workData = await workResponse.json();
          if (workData.description) {
            description = typeof workData.description === 'string'
              ? workData.description
              : workData.description.value || 'No description available.';
          }
        } catch (e) {
          console.log('Could not fetch work details');
        }
      }
      setBookDetails({ ...book, description });
    } catch (error) {
      console.error('Error loading book details:', error);
      setBookDetails({ ...book, description: 'Error loading description.' });
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
    setBookDetails(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 BookFinder</h1>
        <p>Discover, Read, and Download Books from Around the World</p>
      </header>

      <div className="search-container">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for books, authors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={performSearch} disabled={loading}>
            {loading ? 'Searching...' : '🔍 Search'}
          </button>
        </div>
      </div>

      <div className="content-container">
        {loading && <div className="loader">Searching for books...</div>}

        {!loading && books.length > 0 && (
          <div className="book-grid">
            {books.map((book, index) => (
              <div className="book-card" key={index} onClick={() => showBookDetails(book)}>
                <img
                  src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '/fallback.svg'}
                  alt={book.title || 'Unknown Title'}
                />
                <h3>{book.title || 'Unknown Title'}</h3>
                <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                <span>{book.first_publish_year || 'Unknown Year'}</span>
              </div>
            ))}
          </div>
        )}

        {!loading && books.length === 0 && searchQuery && (
          <div className="no-results">
            <h3>No Books Found</h3>
            <p>Try different keywords or check your spelling.</p>
          </div>
        )}
      </div>

      {modalOpen && selectedBook && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <div className="modal-details">
              <img
                src={selectedBook.cover_i ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg` : '/fallback.svg'}
                alt={selectedBook.title || 'Unknown Title'}
              />
              <h2>{selectedBook.title}</h2>
              <p><strong>Author:</strong> {selectedBook.author_name ? selectedBook.author_name.join(', ') : 'Unknown Author'}</p>
              <p><strong>Year:</strong> {selectedBook.first_publish_year || 'Unknown Year'}</p>
              <p><strong>Publisher:</strong> {selectedBook.publisher ? selectedBook.publisher.join(', ') : 'Unknown Publisher'}</p>
              <p><strong>ISBN:</strong> {selectedBook.isbn ? selectedBook.isbn[0] : 'N/A'}</p>
              <p><strong>Description:</strong> {detailsLoading ? 'Loading...' : (bookDetails?.description || 'No description available.')}</p>

              <div className="button-container">
                <a
                  href={`https://openlibrary.org${selectedBook.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  🔗 View on Open Library
                </a>
                <a
                  href={selectedBook.ia ? `https://archive.org/details/${selectedBook.ia[0]}` : `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(selectedBook.title + ' ' + (selectedBook.author_name ? selectedBook.author_name[0] : ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                >
                  📚 Read Online
                </a>
                <a
                  href={selectedBook.ia ? `https://archive.org/details/${selectedBook.ia[0]}/download` : `https://openlibrary.org${selectedBook.key}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-download"
                >
                  💾 Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ebooks;