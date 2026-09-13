import { useState, useRef, useCallback } from 'react';
import './App.css';
import useSearchBook from './useSearchBook';

function App() {
  const [query, setQuery] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const observer = useRef();

  const updateQuery = (event) => {
    setQuery(event.target.value);
    setPageNo(1);
  };
  const { books, loading, loadMore, error } =
    useSearchBook(query, pageNo);

  const fetchMoreRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && loadMore) {
        setPageNo(prvPage => prvPage + 1);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [loadMore, loading]);

  return (
    <div className="App">  
      <h1>Book Search</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for books..." />
      <ul>
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return <li ref={fetchMoreRef} key={book}>{book}</li>
          }
          return <li key={book}>{book}</li>;
        }
        )}
      </ul>
      <div>{loading && <p>Loading...</p>}</div>
      <div style={{ color: 'red', fontWeight: 'bold' }}>{!loadMore && !loading && books.length > 0 && <p>No more results</p>}</div>
      <div style={{ color: 'grey', fontWeight: 'bold' }}>{!loadMore && !loading && books.length === 0 && query.length>0 && <p>No results found</p>}</div>
    </div>
  );
}

export default App;
