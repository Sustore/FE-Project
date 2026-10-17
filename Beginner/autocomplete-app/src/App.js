import {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {

  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [cache, setCache] = useState({});
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const searchData = async () => {
    try{
      setLoading(true);
    const data = await fetch("https://dummyjson.com/products/search?q="+input);
    
    const confgData = await data.json();
    setResult(confgData.products);
    setCache({...cache, [input]: confgData.products});
    }
    catch(error){
      throw new Error("Fetch failed")
    }
    finally{setLoading(false)};
  };

  const onSelect = (selectedResult) => {
    setInput(selectedResult);
    setShowSuggestion(false);
  }

  const highlightMatch = (text, id) => {
    const index = text.toLowerCase().indexOf(input.toLowerCase());
    const limit = index+input.length;

    const textValue = index > -1 ? <> {text.substring(0,index)}
      <b>{text.substring(index,limit)}</b>
      {text.substring(limit)}</> : text;

    return <span className="suggestion" key={id} onClick={()=>onSelect(text)}>
     {textValue}
      </span>
  }

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (!inputRef.current?.contains(event.target)) {
        setShowSuggestion(false);
      }
    };

    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  //implementing debouncing to ease the load on server
  useEffect(()=>{
    if(cache[input]){
      setResult(cache[input]);
      return;
    }
    const delayTime = setTimeout(searchData, 300);

    return ()=>{
      clearTimeout(delayTime);
    }

  },[input]);

  return (
    <div className="App">
      <div className="header">
          Autocomplete React App
      </div>
      <input ref={inputRef} className="search-bar" type="text" placeholder="Search your product..."
      value={input}
      onChange={(event)=>setInput(event.target.value)}
      onFocus={()=>setShowSuggestion(true)}
      />
      {loading && showSuggestion && <p style={{color: 'whitesmoke'}}>Loading ...</p>}
      {showSuggestion && result.length>0 && !loading  && <div className='suggestion-container' >
        {
          result?.map((res)=>highlightMatch(res.title, res.id))
        }
      </div>}
    </div>
  );
}

export default App;
