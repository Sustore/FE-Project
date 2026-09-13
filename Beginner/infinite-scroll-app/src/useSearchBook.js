import {useState, useEffect} from 'react';
import axios from 'axios';

const useSearchBook = (query, pageNo) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const[loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setBooks([]);
  }, [query])

  useEffect(()=>{
    if(!query) return;
    let cancel;
    setLoading(true);
    setError(false);
    axios({
        url: 'https://openlibrary.org/search.json',
        method: 'GET',
        params: {q: query, page: pageNo},
        cancelToken: new axios.CancelToken(c=>cancel=c)
    }).then((res=>{
        setLoading(false);
        setBooks((prvBooks)=>[...new Set([...prvBooks, ...res.data.docs.map(book => book.title)])]);
        setLoadMore(res.data.docs.length>0);
    })).catch((err)=>{
        if(axios.isCancel(err))return;
        setError(false);
        setBooks([]);
    });
    return ()=> cancel();

  },[query, pageNo])


  return {books, loading, loadMore, error};
}

export default useSearchBook;